const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {registerUser, loginUser, getUserProfile} = require('../controllers/authController')

const router = express.Router(); 

router.post("/register", registerUser);  // Register User
router.post('/login', loginUser)        // Login User
router.get("/profile", getUserProfile); // Get User Profile

module.exports = router;