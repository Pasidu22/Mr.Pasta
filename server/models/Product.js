const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    reviewCount: { type: Number, default: 1 },
    time: { type: String, default: '2-4 Days' },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
