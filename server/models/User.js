const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    photoURL: { type: String },
    phoneNumber: { type: String },
    location: { type: String },
    cart: [
        {
            productId: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            selectedWeight: { type: String }
        }
    ],
    favorites: [{ type: Number }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function() {
    this.updatedAt = Date.now();
});

module.exports = mongoose.model('User', userSchema);
