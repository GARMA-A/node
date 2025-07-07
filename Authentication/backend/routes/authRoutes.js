const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");


router.route("/register").post(authControllers.register);

router.route("/login").post(authControllers.login);




module.exports = router;
