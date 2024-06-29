const dotenv = require("dotenv");
const sequelize = require("../config/database");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");

const secret = process.env.SECRET;

const generateVerificationToken = (email) => {
  const payload = { email };
  const expiryTime = { expiresIn: "5m" };

  return jwt.sign(payload, secret, expiryTime);
};

const userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const verificationToken = generateVerificationToken(email);

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    console.log("Registration successful", user);

    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;

    sendVerificationEmail(email, verificationLink);
    res.json({
      message: "Registration successful, and Verification link send",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendVerificationEmail = (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Complete your registration",
    text: `To complete your registration, click this link ${verificationLink}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error sending verification link");
    } else {
      console.log("Verification Link successfully sent", info.response);
    }
  });
};

module.exports = { userRegistration };
