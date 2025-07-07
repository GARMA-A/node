const mongoose = require('mongoose');

async function connectDB() {
	try {
		await mongoose.connect(process.env.LOCAL_MONOG);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed:', error);
		process.exit(1); // Exit the process with failure
	}

}

module.exports = connectDB;
