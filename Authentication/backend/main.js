require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const mongoose = require('mongoose');
const cockieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
connectDB();

app.use(cors(corsOptions));
app.use(cockieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));


// app.all(RegExp("/*"), (req, res) => {
// 	res.status(404);
// 	if (req.accepts("html"))
// 		res.sendFile(path.join(__dirname, "views", "404.html"));
// 	else if (req.accepts("json"))
// 		res.json({ message: "This Page Does Not Exist" });
// 	else
// 		res.type("text").send("This Page Does Not Exist");
// 	res.end();
// });



mongoose.connection.once('open', () => {
	console.log('MongoDB connection established');
	app.listen(process.env.PORT, () => {

		console.log('Server is running on port 5000');
	}
	);

});
mongoose.connection.on('error', (err) => {
	console.error('MongoDB connection error:', err);
});







