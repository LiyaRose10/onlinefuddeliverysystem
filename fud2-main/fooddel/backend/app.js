// backend/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');
//const restaurantRoutes = require('./routes/restaurantRoutes');
//const menuItemRoutes = require('./routes/menuItemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', contactRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', menuItemRoutes);

module.exports = app;
