import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter using Gmail with your updated email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // will be sreenandhrock@gmail.com
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration (for testing)
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

export const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your OTP Code",
    html: `<h2>Your OTP Code is: ${otp}</h2><p>This code will expire in 10 minutes.</p>`,
  };

  return transporter.sendMail(mailOptions);
};
