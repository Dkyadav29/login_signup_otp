const express = require("express");
const router = express.Router();

const controller = require('../controller/user')
router.post("/signup", controller.usersignUp);
// send otp for verify
router.post("/send-otp", controller.sendOtp)
// login router 
router.post('/login',controller.userLogin )

// Route: /api/verify-otp
router.post("/verify-otp",controller.verifyOTP);
router.push("/send-notification" , controller.whatsappPushNotification)
// USER PROFILE 
router.get("login-profile", controller.userProfile)
// export router modules
module.exports = router;