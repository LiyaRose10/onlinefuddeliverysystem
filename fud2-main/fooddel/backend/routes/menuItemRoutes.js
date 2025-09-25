// backend/routes/menuItemRoutes.js
const express = require('express');
const {
  getMenuItems,
  createMenuItem,
} = require('../controllers/menuItemController');
const router = express.Router();

router.get('/menu-items', getMenuItems);
router.post('/menu-items', createMenuItem);

module.exports = router;
