const mongoose = require('mongoose');
require('dotenv').config({ path: '../server/.env' });
const Product = require('../server/models/Product');

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

const seed = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mr_pasta';
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        await Product.insertMany(initialProducts);
        console.log('Successfully seeded 16 products');
        
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
};

seed();
