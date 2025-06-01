const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    costPrice: { type: Number, required: true, min: 0 },
    barcode: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);