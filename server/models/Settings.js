const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    deliveryFee: { type: Number, default: 250 },
    deliveryChargesEnabled: { type: Boolean, default: true },
    whatsappNumber: { type: String, default: '94729280262' },
    bankDetails: { type: String, default: '' },
    contactPhone: { type: String, default: '+94 72 928 0262' },
    contactEmail: { type: String, default: 'info@mrpasta.lk' },
    address: { type: String, default: 'Colombo, Sri Lanka' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Settings', settingsSchema);
