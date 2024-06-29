const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/user.controller");

router.post("/register", userRegistration);

module.exports = router;
