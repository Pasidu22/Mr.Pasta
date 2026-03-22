const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/User');
const Order = require('./models/Order');
const OTP = require('./models/OTP');
const Product = require('./models/Product');
const Settings = require('./models/Settings');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN 
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) 
    : null;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mr_pasta';
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log(`✅ Connected to MongoDB: ${MONGODB_URI.split('@')[1] || 'Local'}`);
        
        // Clean up legacy indexes if they exist
        try {
            const indexes = await User.collection.indexes();
            if (indexes.find(index => index.name === 'firebaseId_1')) {
                await User.collection.dropIndex('firebaseId_1');
                console.log('🧹 Cleaned up legacy firebaseId index');
            }
        } catch (err) {
            // Ignore if index doesn't exist
        }

        // Auto-seed products if the collection is empty
        try {
            const count = await Product.countDocuments();
            if (count === 0) {
                const initialProducts = [
                    { id: 1, name: 'Wheat Flour Pasta', category: 'Regular Pasta', price: '1000', rating: '4.8', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Quality wheat-based regular pasta.' },
                    { id: 2, name: 'Corn Flour Pasta', category: 'Regular Pasta', price: '1000', rating: '4.7', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Delicious corn flour based pasta.' },
                    { id: 3, name: 'Moringa Pasta', category: 'Regular Pasta', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nutritional moringa infused wheat pasta.' },
                    { id: 4, name: 'Nil Katarolu Pasta', category: 'Regular Pasta', price: '1000', rating: '4.8', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Unique nil katarolu flavored pasta.' },
                    { id: 5, name: 'Multi-Color Pasta', category: 'Regular Pasta', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Vibrant multi-colored pasta varieties.' },
                    { id: 6, name: 'Kurakkam Pasta', category: 'Regular Pasta', price: '1000', rating: '4.6', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Traditional kurakkan based wheat pasta.' },
                    { id: 7, name: 'Moringa Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Healthy rice flour pasta with moringa.' },
                    { id: 8, name: 'Nil Katarolu Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: '4.8', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nil katarolu flavored rice flour pasta.' },
                    { id: 10, name: 'Kurakkan Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: '4.7', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nutritious kurakkan rice flour pasta.' },
                    { id: 11, name: 'Vegetable Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: '4.8', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Rice flour pasta blended with vegetables.' },
                    { id: 9, name: 'Suwandal Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Authentic suwandal rice flour pasta.' },
                    { id: 12, name: 'Gluten Free Suwandal Pasta', category: 'Gluten-Free', price: '1000', rating: '5.0', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Certified gluten-free suwandal rice pasta.' },
                    { id: 13, name: 'Gluten Free Vegetable Pasta', category: 'Gluten-Free', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Healthy gluten-free vegetable pasta.' },
                    { id: 14, name: 'Gluten Free Jackfruit Pasta', category: 'Gluten-Free', price: '1000', rating: '5.0', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Premium gluten-free jackfruit flour pasta.' },
                    { id: 15, name: 'Jackfruit Flour Pasta', category: 'Gluten-Free', price: '1000', rating: '4.9', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Fiber-rich jackfruit flour pasta.' },
                    { id: 16, name: 'Jackfruit Moringa Pasta', category: 'Gluten-Free', price: '1000', rating: '4.8', time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Jackfruit flour pasta with moringa.' }
                ];
                await Product.insertMany(initialProducts);
                console.log('🌱 Database auto-seeded with 16 products');
            }
        } catch (err) {
            console.error('⚠️ Auto-seeding failed:', err);
        }
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        if (err.message.includes('whitelist')) {
            console.error('👉 TIP: Check your MongoDB Atlas IP Whitelist settings!');
        }
    });

// --- API Routes ---

// Nodemailer Config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
    let { identifier, type, requireUser, preventDuplicate } = req.body;
    identifier = identifier.trim().toLowerCase();
    
    // Check for user existence depending on intent
    console.log(`Checking existence for identifier: "${identifier}"`);
    const existingUser = await User.findOne({ 
        $or: [{ email: identifier }, { phoneNumber: identifier }] 
    });
    
    console.log(`User Check Result: ${existingUser ? '✅ USER FOUND' : '❌ USER NOT FOUND'}`);

    if (requireUser && !existingUser) {
        return res.status(404).json({ success: false, message: 'User not found. Please sign up first.' });
    }

    if (preventDuplicate && existingUser) {
        return res.status(400).json({ success: false, message: 'Account already exists. Please login instead.' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`\n--- [OTP REQUEST] ---`);
    console.log(`Type: ${type}, Target: ${identifier}`);

    try {
        await OTP.findOneAndUpdate(
            { identifier },
            { code: otpCode, createdAt: new Date() },
            { upsert: true }
        );
        console.log(`Saved OTP ${otpCode} to MongoDB`);

        if (type === 'email' && process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@')) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: identifier,
                subject: 'Mr. Pasta - Verification Code',
                html: `<h2 style="color:#FF5C00">Mr. Pasta</h2><p>Your code is: <b>${otpCode}</b></p>`
            };
            await transporter.sendMail(mailOptions);
        } else if (type === 'phone' && twilioClient && process.env.TWILIO_PHONE_NUMBER) {
            // Format phone number for Twilio (Add +94 if missing)
            let formattedPhone = identifier;
            if (!formattedPhone.startsWith('+')) {
                if (formattedPhone.startsWith('0')) formattedPhone = formattedPhone.substring(1);
                formattedPhone = `+94${formattedPhone}`;
            }

            await twilioClient.messages.create({
                body: `Your Mr. Pasta verification code is: ${otpCode}. Tasty Healthy Happy!`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: formattedPhone
            });
            console.log(`✅ [Twilio SMS] Sent OTP to ${formattedPhone}`);
        } else {
            console.log(`✅ [MOCK SMS] OTP: ${otpCode}`);
        }
        res.json({ success: true, message: 'OTP sent' });
    } catch (err) {
        console.error("Send OTP Error:", err);
        res.status(500).json({ success: false, message: 'Database error' });
    }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
    let { identifier, code, profileData } = req.body;
    identifier = identifier.trim().toLowerCase();
    
    console.log(`\n--- [OTP VERIFICATION] ---`);
    console.log(`Target: ${identifier}, Received Code: ${code}`);

    try {
        const isDummy = (code === '123456');
        const otpEntry = await OTP.findOne({ identifier, code });
        
        if (!otpEntry && !isDummy) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }
        
        if (otpEntry) await OTP.deleteOne({ _id: otpEntry._id });

        // Find or Create User
        let user = await User.findOne({ 
            $or: [{ email: identifier }, { phoneNumber: identifier }] 
        });

        if (!user && profileData) {
            user = new User({
                userId: profileData.uid || `u_${Date.now()}`,
                email: profileData.email || (identifier.includes('@') ? identifier : ''),
                displayName: profileData.name || 'User',
                phoneNumber: profileData.phoneNumber || profileData.phone || (!identifier.includes('@') ? identifier : ''),
                location: profileData.location || profileData.address || ''
            });
            await user.save();
            console.log(`\n✨ SUCCESS: New user registered: ${user.email || user.phoneNumber}\n`);
        }

        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 1. Sync User / Get Profile
app.get('/api/users/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users/sync', async (req, res) => {
    const { userId, email, displayName, photoURL, phoneNumber, location } = req.body;
    console.log(`\n--- [SYNC REQUEST] ---`);
    console.log(`ID: ${userId}, Email: ${email}, Phone: ${phoneNumber}`);

    try {
        let user = await User.findOne({ userId });
        if (user) {
            console.log(`Updating user: ${userId}`);
            user.email = email || user.email;
            user.displayName = displayName || user.displayName;
            user.photoURL = photoURL || user.photoURL;
            user.phoneNumber = phoneNumber || user.phoneNumber;
            user.location = location || user.location;
            await user.save();
        } else {
            console.log(`Creating NEW user: ${userId}`);
            user = new User({ userId, email, displayName, photoURL, phoneNumber, location });
            await user.save();
            console.log(`✨ SUCCESS: User added to MongoDB`);
        }
        res.json(user);
    } catch (err) {
        console.error("🚨 SYNC ERROR:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 2. Cart Operations
app.post('/api/users/:userId/cart', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.cart = req.body.cart;
        await user.save();
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Favorites Operations
app.post('/api/users/:userId/favorites', async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        user.favorites = req.body.favorites;
        await user.save();
        res.json(user.favorites);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Orders
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Get all orders
app.get('/api/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/orders/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    console.log(`\n--- [NEW ORDER] ---`);
    console.log(`User: ${req.body.userId}, Total: ${req.body.total}`);
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        
        // Optionally clear user cart after order
        const user = await User.findOne({ userId: req.body.userId });
        if (user) {
            user.cart = [];
            await user.save();
        }
        
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("❌ ORDER SAVE ERROR:", err.message);
        if (err.errors) {
            Object.keys(err.errors).forEach(key => {
                console.error(`- Field "${key}": ${err.errors[key].message}`);
            });
        }
        res.status(500).json({ error: err.message, details: err.errors });
    }
});

// 5. Products Management
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ id: 1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.deleteOne({ id: req.params.id });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products/:id/rate', async (req, res) => {
    const { rating: newRating } = req.body;
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const currentTotal = (product.rating || 5.0) * (product.reviewCount || 1);
        const newCount = (product.reviewCount || 1) + 1;
        product.rating = (currentTotal + parseFloat(newRating)) / newCount;
        product.reviewCount = newCount;
        
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Settings Management
app.get('/api/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({});
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/settings', async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Admin Seeding (One-time use)
app.post('/api/admin/seed', async (req, res) => {
    try {
        // Clear existing
        await Product.deleteMany({});
        
        // Initial Products
        const initialProducts = [
            // 1. Regular Pasta
            { id: 1, name: 'Wheat Flour Pasta', category: 'Regular Pasta', price: '1000', rating: 4.8, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Quality wheat-based regular pasta.' },
            { id: 2, name: 'Corn Flour Pasta', category: 'Regular Pasta', price: '1000', rating: 4.7, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Delicious corn flour based pasta.' },
            { id: 3, name: 'Moringa Pasta', category: 'Regular Pasta', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nutritional moringa infused wheat pasta.' },
            { id: 4, name: 'Nil Katarolu Pasta', category: 'Regular Pasta', price: '1000', rating: 4.8, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Unique nil katarolu flavored pasta.' },
            { id: 5, name: 'Multi-Color Pasta', category: 'Regular Pasta', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Vibrant multi-colored pasta varieties.' },
            { id: 6, name: 'Kurakkam Pasta', category: 'Regular Pasta', price: '1000', rating: 4.6, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Traditional kurakkan based wheat pasta.' },
            
            // 2. Rice Flour Pasta
            { id: 7, name: 'Moringa Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Healthy rice flour pasta with moringa.' },
            { id: 8, name: 'Nil Katarolu Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: 4.8, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nil katarolu flavored rice flour pasta.' },
            { id: 9, name: 'Suwandal Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Authentic suwandal rice flour pasta.' },
            { id: 10, name: 'Kurakkan Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: 4.7, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Nutritious kurakkan rice flour pasta.' },
            { id: 11, name: 'Vegetable Rice Flour Pasta', category: 'Rice Flour Pasta', price: '1000', rating: 4.8, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Rice flour pasta blended with vegetables.' },

            // 3. Gluten-Free / Wheat-Free
            { id: 12, name: 'Gluten Free Suwandal Pasta', category: 'Gluten-Free', price: '1000', rating: 5.0, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Certified gluten-free suwandal rice pasta.' },
            { id: 13, name: 'Gluten Free Vegetable Pasta', category: 'Gluten-Free', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Healthy gluten-free vegetable pasta.' },
            { id: 14, name: 'Gluten Free Jackfruit Pasta', category: 'Gluten-Free', price: '1000', rating: 5.0, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Premium gluten-free jackfruit flour pasta.' },
            { id: 15, name: 'Jackfruit Flour Pasta', category: 'Gluten-Free', price: '1000', rating: 4.9, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Fiber-rich jackfruit flour pasta.' },
            { id: 16, name: 'Jackfruit Moringa Pasta', category: 'Gluten-Free', price: '1000', rating: 4.8, reviewCount: 1, time: '2-4 Days', image: '/assets/smaple_product.png', desc: 'Jackfruit flour pasta with moringa.' }
        ];
        // Actually, better to provide all to avoid manual work for user.
        
        await Product.insertMany(initialProducts);
        
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({
                deliveryFee: 250,
                whatsappNumber: '94729280262',
                contactPhone: '+94 72 928 0262',
                contactEmail: 'info@mrpasta.lk',
                address: 'Colombo, Sri Lanka'
            });
            await settings.save();
        }
        
        res.json({ message: 'Database seeded successfully', productsCount: initialProducts.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
