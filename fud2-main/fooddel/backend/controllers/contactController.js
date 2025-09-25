const connection = require("../config/db");

// Submit contact message
exports.submitContact = (req, res) => {
  const { user_id, name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: "Name, email, and message required" });

  const query = "INSERT INTO contacts (user_id, name, email, message) VALUES (?, ?, ?, ?)";
  connection.query(query, [user_id || null, name, email, message], (err, result) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    res.status(201).json({ message: "Contact message submitted", contact_id: result.insertId });
  });
};
