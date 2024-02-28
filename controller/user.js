const User = require("../model/user");
const { generateOTP, sendOTP } = require("../util/otp");

const usersignUp = async (req, res) => {
  try {
    const { name, number, email, photo } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ number });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Send OTP
    await sendOTP(number, otp);

    // Save user profile with pending OTP
    const newUser = new User({
      name,
      number,
      email,
      photo,
      otp: { code: otp },
    });
    await newUser.save();

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ success: false, message: "Failed to sign up" });
  }
};

// send otp
// Add this endpoint definition to your existing code
const sendOtp = async (req, res) => {
  const { number } = req.body;

  // Check if the user exists
  const user = await User.findOne({ number });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const otp = generateOTP();

  await user.save();

  // Send OTP
  await sendOTP(number, otp);
};

// userLogin  controller

const userLogin = async (req, res) => {
  // first check in user db in incoming with client  req number
  const { number, otp } = req.body;

  //  search user according to number and check the OTP
  const user = await User.findOne({ number });
  if (!user || user.otp.code !== otp || user.otp.expiresAt < new Date()) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid OTP or OTP expired" });
  }

  // Clear the OTP after successful login
  user.otp = { code: "", expiresAt: null };
  await user.save();

  res.json({ success: true, message: "Login successful", user });
};

const userProfile = async (req, res) => {
  const { number } = req.body;

  try {
    // Fetch the user by phone number
    const user = await User.findOne({ number });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user profile
    const userProfile = {
      id: user._id,
      number: user.number,
      // Include other user profile fields as needed
    };

    res.json({ success: true, user: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// // Route for sending push notification
const whatsappPushNotification = async (req, res) => {
  const { number, message } = req.body;

  try {
    // Send push notification via WhatsApp using Twilio
    await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: `whatsapp:${number}`,
    });

    res.json({ success: true, message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    res
      .status(500)
      .json({ success: false, message: "Error sending WhatsApp notification" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { number, otp } = req.body;

    // Find user by number
    const user = await User.findOne({ number });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if OTP matches
    if (user.otp.code !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    await user.save();

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

module.exports = {
  usersignUp,
  userLogin,
  sendOtp,
  verifyOTP,
  userProfile,
  whatsappPushNotification,
};
