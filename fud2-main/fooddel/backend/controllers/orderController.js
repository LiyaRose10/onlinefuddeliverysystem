// backend/controllers/orderController.js
const connection = require('../config/db');

// GET orders for a specific user
exports.getOrdersByUser = (req, res) => {
  const { user_id } = req.params;
  const query = `
    SELECT 
      o.order_id,
      m.name AS item,
      o.quantity,
      m.price,
      o.address,
      o.payment_method AS payment,
      o.status,
      o.user_id
    FROM orders o
    JOIN menuitems m ON o.item_id = m.item_id
    WHERE o.user_id = ?
    ORDER BY o.order_date DESC
  `;
  connection.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('❌ Error fetching orders:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};

// CREATE a new order
exports.createOrder = (req, res) => {
  const { user_id, item_id, quantity, address, payment_method } = req.body;

  if (!user_id || !item_id || !quantity) {
    return res.status(400).json({ message: 'user_id, item_id, and quantity are required' });
  }
  console.log("Order details: ", user_id, item_id, quantity);

  // Just insert directly (no total column anymore)
  const insertQuery = `
    INSERT INTO orders (user_id, item_id, quantity, address, payment_method, status)
    VALUES (?, ?, ?, ?, ?, 'Pending')
  `;

  connection.query(
    insertQuery,
    [user_id, item_id, quantity, address || null, payment_method || null],
    (err, result) => {
      if (err) {
        console.error('❌ Error creating order:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // Fetch the newly created order with item details
      const selectQuery = `
        SELECT 
          o.order_id,
          m.name AS item,
          o.quantity,
          m.price,
          o.address,
          o.payment_method AS payment,
          o.status,
          o.user_id
        FROM orders o
        JOIN menuitems m ON o.item_id = m.item_id
        WHERE o.order_id = ?
      `;

      connection.query(selectQuery, [result.insertId], (err2, rows) => {
        if (err2) {
          console.error('❌ Error fetching new order:', err2);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Order created successfully', order: rows[0] });
      });
    }
  );
};


// UPDATE order (address, payment, status)
exports.updateOrder = (req, res) => {
  const { order_id } = req.params;
  const { address, payment_method, status } = req.body;

  const query = `
    UPDATE orders
    SET address = ?, payment_method = ?, status = ?
    WHERE order_id = ?
  `;

  connection.query(query, [address, payment_method, status, order_id], (err) => {
    if (err) return res.status(500).json({ message: 'Internal Server Error' });
    res.json({ message: 'Order updated successfully' });
  });
};
