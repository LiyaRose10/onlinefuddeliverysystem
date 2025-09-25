// backend/controllers/restaurantController.js
// backend/controllers/restaurantController.js
const connection = require('../config/db');

// GET all restaurants
exports.getRestaurants = (req, res) => {
  const query = 'SELECT * FROM restaurants';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching restaurants:', err.stack);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};

// CREATE a new restaurant
exports.createRestaurant = (req, res) => {
  const { name, location, rating } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ message: 'Restaurant name is required' });
  }

  const query = 'INSERT INTO restaurants (name, location, rating) VALUES (?, ?, ?)';
  connection.query(query, [name, location || null, rating || 0.0], (err, result) => {
    if (err) {
      console.error('❌ Error creating restaurant:', err.stack);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: {
        restaurant_id: result.insertId,
        name,
        location: location || null,
        rating: rating || 0.0,
      },
    });
  });
};
