
// backend/controllers/menuItemController.js
const connection = require('../config/db');

// GET all menu items
exports.getMenuItems = (req, res) => {
  const query = 'SELECT * FROM menuitems'; // Correct table name
  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching menu items:', err.stack);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};
exports.createMenuItem = (req, res) => {
  const { restaurant_id, name, price } = req.body;

  if (!restaurant_id || !name || price == null) {
    return res.status(400).json({ message: 'restaurant_id, name, and price are required' });
  }

  const query = 'INSERT INTO menuitems (restaurant_id, name, price) VALUES (?, ?, ?)';
  connection.query(query, [restaurant_id, name, price], (err, result) => {
    if (err) {
      console.error('❌ Error creating menu item:', err.stack);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(201).json({
      message: 'Menu item created successfully',
      menuItem: {
        item_id: result.insertId,
        restaurant_id,
        name,
        price,
      },
    });
  });
};

// CREATE a new menu item
