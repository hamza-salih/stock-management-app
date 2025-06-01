const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, stockController.getStockLevels);
router.post('/update', authMiddleware, stockController.updateStock);
router.get('/history/:productId', authMiddleware, stockController.getStockHistory);

module.exports = router;