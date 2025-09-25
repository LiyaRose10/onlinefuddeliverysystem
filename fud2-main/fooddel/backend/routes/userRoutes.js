/*const express = require('express'); const { getUsers } = require('../controllers/userController'); const router = express.Router(); router.get('/users', getUsers); module.exports = router;*/
/*const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);  // GET all users
router.post('/', userController.createUser); // CREATE new user

module.exports = router;*/
const express = require("express");
const router = express.Router();
const { createUser, getUsers, loginUser } = require("../controllers/userController");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/", getUsers);

module.exports = router;
