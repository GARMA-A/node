const mongose = require('mongoose');

async function connectDB() {
	try {
		await mongose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection failed:', error);
		process.exit(1); // Exit the process with failure
	}

}

module.exports = connectDB;
