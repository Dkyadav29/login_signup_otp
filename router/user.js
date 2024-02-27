const express = require("express");
const router = express.Router();

const controller = require('../controller/user')
router.post("/signup", controller.usersignUp);

// login router 
router.post('/login',controller.userLogin )

// Route: /api/verify-otp
router.post("/verify-otp",controller.verifyOTP);


// export router modules
module.exports = router;