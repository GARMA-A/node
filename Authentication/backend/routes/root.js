const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (_, res) => {

	res.sendFile(path.join(__dirname, "..", "views", "index.html"));

	// Uncomment the line below to send a JSON response instead of serving an HTML file
	// This is useful if you want to return a simple message or data in JSON format
	// res.status(200).json({ message: "Welcome to the API" });
});





module.exports = router;



