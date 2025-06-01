const Stock = require('../models/Stock');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

exports.getStockLevels = async (req, res) => {
    try {
        const stockLevels = await Stock.find().populate('product');
        res.json(stockLevels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { productId, quantity, location, type } = req.body;

        // Find or create stock record
        let stock = await Stock.findOne({ product: productId });

        if (!stock) {
            stock = new Stock({
                product: productId,
                quantity: 0,
                location: location || 'default'
            });
        }

        // Update quantity based on movement type
        if (type === 'in') {
            stock.quantity += quantity;
        } else if (type === 'out') {
            if (stock.quantity < quantity) {
                return res.status(400).json({ message: 'Insufficient stock' });
            }
            stock.quantity -= quantity;
        }

        stock.lastUpdated = new Date();
        await stock.save();

        // Record movement
        const movement = new StockMovement({
            product: productId,
            type,
            quantity,
            user: req.user.id,
            reference: req.body.reference,
            notes: req.body.notes
        });
        await movement.save();

        res.json({
            stock,
            movement
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getStockHistory = async (req, res) => {
    try {
        const history = await StockMovement.find({ product: req.params.productId })
            .populate('product user')
            .sort({ date: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};