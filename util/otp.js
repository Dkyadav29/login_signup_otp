const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
//Math.floor(1000 + Math.random() * 9000).toString(); this 4 dig otp verify
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to the provided number using Twilio
const sendOTP = async (number, otp) => {
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhone,
      to: number,
    });
    console.log(`OTP sent to ${number}`);
  } catch (error) {
    throw new Error(`Error sending OTP: ${error.message}`);
  }
};

module.exports = { generateOTP, sendOTP };
