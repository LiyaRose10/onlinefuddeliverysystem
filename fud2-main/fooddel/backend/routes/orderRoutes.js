const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/user/:user_id', orderController.getOrdersByUser);
router.post('/', orderController.createOrder);
router.put('/:order_id', orderController.updateOrder);

module.exports = router; // Make sure this is router, not controller
