// backend/controllers/userController.js

// backend/controllers/userController.js

const connection = require('../config/db');
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Server error" });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ send back user_id and details
    res.json({
      success: true,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
// GET all users
exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching users:', err.stack);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
};
// POST /users/login
/*exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];
    delete user.password_hash; // remove password from response
    res.json({ success: true, user });
  });
};*/
// loginController.js
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Server error" });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ send back user_id and details
    res.json({
      success: true,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
// CREATE a new user
const bcrypt = require("bcrypt"); // at the top of the file

exports.createUser = async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (name, address, phone, email, password_hash)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [name, address || null, phone || null, email, password_hash],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
          }
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        res.status(201).json({
          message: 'User created successfully',
          user: {
            user_id: result.insertId,
            name,
            address: address || null,
            phone: phone || null,
            email,
          },
        });
      }
    );
  } catch (err) {
    console.error('❌ Error hashing password:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};
