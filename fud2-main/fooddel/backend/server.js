const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
//const menuRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/users", userRoutes);
//app.use("/menu", menuItemRoutes);
app.use("/orders", orderRoutes);
app.use("/contact", contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
