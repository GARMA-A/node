const allowOrigins = require('./allowedOrigins');
const corsOtions = {
	origins: (origin, cb) => {
		if (allowOrigins.indexOf(origin) !== -1 || !origin) {
			cb(null, true); // Allow the origin
		} else {
			cb(new Error('Not allowed by CORS')); // Reject the origin

		}
	},
	Credential: true,
	optionsSuccessStatus: 200, // For legacy browser support

};

module.exports = corsOtions;
