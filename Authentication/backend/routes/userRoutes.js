const express = require('express');
const userControllers = require("../controllers/userControllers.js");
const router = express.Router();
const verifyToken = require("../middlwares/verifyToken.js");



router.use(verifyToken);

router.route("/view").get(userControllers.viewAllUsers);

router.route("/delete").delete(userControllers.deleteUser);



module.exports = router;





