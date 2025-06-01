const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
    lowStockThreshold: { type: Number, default: 10 }
});

module.exports = mongoose.model('Stock', stockSchema);