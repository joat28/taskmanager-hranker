const User = require("../models/user");

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	if (email && password) {
		const user = await User.findOne({ email: email });
		//USER FOUND
        if (user) {
			user.comparePasswords(password, function (error, isMatch) {
				//ERROR IN COMPARING
				if (error) {
					return res.status(401).json({
						message: "Invalid email or password!",
					});
				}
				// PASSWORD DID NOT MATCH
				else if (!isMatch) {
					return res.status(401).json({
						message: "Invalid email or password!, wrong password",
					});
				} else {
					const { email, username, requested, tasks } = user;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					// console.log("inside login controller", req.session.user);
					return res.status(200).json({
						message: "user is authenticated!",
						user : session,
					});
				}
			});
		} else {
			return res.status(401).json({
				error: "User not found with given email",
				message: "User not found with given email",
			});
		}
	} else {
		return res.status(400).json({
			message: "Please fill all required fields",
			error: "Bad request",
		});
	}
};
module.exports.register = async (req, res) => {
	const givenUsername = req.body.username;
	const givenPassword = req.body.password;
	const givenEmail = req.body.email;
	try {
		user = await User.create({ email: givenEmail,username: givenUsername, password: givenPassword });
		const { email, username, requested, tasks } = user;
		const session = { email, username, requested, tasks };
		req.session.user = session;
		return res.status(200).json({
			message: "Successfully Signed Up and Logged in",
			user : session,
		});
	} catch (error) {
		return res.status(400).json({
			message: "Erorr in creating new user with given credentials",
			error: error.message,
		});
	}
};

module.exports.logout = (req, res) => {
	req.session.destroy();
	return res.status(200).json({
		message: "Session deleted, and user logged out",
	});
};
