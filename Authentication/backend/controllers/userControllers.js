const user = require("../models/User.js");


const viewAllUsers = async function(req, res) {

	const allUsers = await user.find().select("-password").lean();
	if (!allUsers.length)
		res.status(400).json({ "message": "no users found" });

	res.json(allUsers);

}

const deleteUser = async function(req, res) {
	const { id } = req.query;

	if (!id) {
		return res.status(400).json({ "message": "User ID is required" });
	}

	try {
		const deletedUser = await user.findByIdAndDelete(id);
		if (!deletedUser) {
			return res.status(404).json({ "message": "User not found" });
		}
		res.json({ "message": "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ "message": "Error deleting user", error: error.message });
	}
}


module.exports = { viewAllUsers, deleteUser };
