const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");


router.route("/register").post(authControllers.register);




module.exports = router;
