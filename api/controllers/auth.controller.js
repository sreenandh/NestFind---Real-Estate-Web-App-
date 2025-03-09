import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { sendOTPEmail } from "../utils/email.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if a user with the provided email already exists
    const existingUserByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Check if a user with the provided username already exists
    const existingUserByUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "User with this username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate a 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiry time (10 minutes from now)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update the new user with OTP and expiry
    await prisma.user.update({
      where: { id: newUser.id },
      data: { otp, otpExpiry },
    });

    // Send OTP email (make sure your EMAIL_USER and EMAIL_PASS are set correctly)
    await sendOTPEmail(email, otp);

    res.status(201).json({ message: "User created successfully, OTP sent to email" });
  } catch (err) {
    console.error("Error during registration:", err);
    if (err.code === "P2002") {
      return res.status(400).json({ message: "A user with this email or username already exists" });
    }
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Set isAdmin flag if username matches default admin ("SreenandhM")
    const isAdmin = username === "SreenandhM";

    // Generate JWT token with admin flag
    
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    const token = jwt.sign(
      { id: user.id, isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ ...userInfo, isAdmin });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Failed to login", error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Verify OTP and check expiration
    if (user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP verified; clear OTP fields
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpiry: null },
    });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Error during OTP verification:", err);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};
