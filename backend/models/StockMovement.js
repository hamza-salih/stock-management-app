const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reference: { type: String },
    notes: { type: String }
});

module.exports = mongoose.model('StockMovement', movementSchema);