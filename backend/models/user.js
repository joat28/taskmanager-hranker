const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		requested: [
			{
				title: {
					type: String,
					required: true,
				},
				shared_by: {
					type: String,
					required: true,
				},
			},
		],
		tasks: [
			{
				title: {
					type: String,
					required: true,
				},
				shared_by: {
					type: String,
				}
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});
userSchema.methods.comparePasswords = function (userPassword, callback) {
	bcrypt.compare(userPassword, this.password, function (error, isMatch) {
		if (error) return callback(error);
		return callback(null, isMatch);
	});
};

const User = mongoose.model("User", userSchema);

module.exports = User;
