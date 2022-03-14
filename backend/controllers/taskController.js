const User = require("../models/user");
module.exports.addTask = (req, res) => {
	try {
		const title = req.body.title;
		console.log(title);
		const newTask = { title: title };
		User.findOneAndUpdate(
			{ email: req.session.user.email },
			{ $push: { tasks: newTask } },
			{ new: true },
			(error, data) => {
				if (error) {
					console.log(error);
					return res.status(400).json({
						message: "Error in adding new data",
						error: error.message,
					});
				} else {
					console.log("New task added");
					const { email, username, requested, tasks } = data;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					return res.status(200).json({
						message: "New task added",
						data: session,
					});
				}
			}
		);
	} catch (error) {
		console.log("Error in addTask", error.message);
		return res.status(400).json({
			message: "Error in adding task",
			error: error.message,
		});
	}
};

module.exports.deleteTask = (req, res) => {
	try {
		const id = req.params.id;
		console.log(req.params);
		User.findOneAndUpdate(
			{ email: req.session.user.email },
			{ $pull: { tasks: { _id: id } } },
			{ safe: true, multi: false, new: true },
			(error, data) => {
				if (error) {
					console.log(error);
					return res.status(400).json({
						message: "Erorr in deleting task",
						error: error,
					});
				} else {
					console.log("task deleted");
					const { email, username, requested, tasks } = data;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					return res.status(200).json({
						message: "Task deleted",
						data: session,
					});
				}
			}
		);
	} catch (error) {
		console.log("Error in delete Task", error.message);
		return res.status(400).json({
			message: "Error in deleting task",
			error: error.message,
		});
	}
};

module.exports.shareTask = (req, res) => {
	try {
		const { shareTo, title } = req.body;
		const newTask = { title, shared_by: req.session.user.email };

		// TODO: Don't send any info about the shareTo user. Remove all details from response
		User.findOneAndUpdate(
			{ email: shareTo },
			{ $push: { requested: newTask } },
			{ new: true },
			(error, data) => {
				if (error) {
					console.log(error);
					return res.status(400).json({
						message: "Erorr in sharing task",
						error: error,
					});
				} else {
					console.log("task shared");
					if (!data) {
						return res.status(400).json({
							message: "No user found with given email",
							error: "No user found with given email"
						})
					}
					const { email, username, requested, tasks } = data;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					
					return res.status(200).json({
						message: "Task shared",
						data:session,
					});
				}
			}
		);
	} catch (error) {
		console.log("Error in sharing Task", error.message);
		return res.status(400).json({
			message: "Error in deleting task",
			error: error.message,
		});
	}
};

module.exports.acceptTask = (req, res) => {
	try {
		const id = req.params.id;
		let requestedTaskToAdd = {};
		req.session.user.requested.forEach((item) => {
			if (item._id === id) {
				requestedTaskToAdd = item;
				return;
			}
		});
		if (!requestedTaskToAdd.title) {
			console.log("Error in if condition");
			return res.status(400).json({
				message: "Unable to find the requested task",
				error: "Unable to find the requested task",
			});
		}
		// TODO: Don't send any info about the shareTo user. Remove all details from response
		User.findOneAndUpdate(
			{ email: req.session.user.email },
			{
				$push: { tasks: requestedTaskToAdd },
				$pull: { requested: { _id: id } },
			},
			{ new: true },
			(error, data) => {
				if (error) {
					console.log(error);
					return res.status(400).json({
						message: "Erorr in accepting task",
						error: error,
					});
				} else {
					console.log("task accepted");
					const { email, username, requested, tasks } = data;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					return res.status(200).json({
						message: "Task accepted",
						data : session,
					});
				}
			}
		);
	} catch (error) {
		console.log("Error in accepting Task", error.message);
		return res.status(400).json({
			message: "Error in accepting task",
			error: error.message,
		});
	}
};

module.exports.rejectTask = (req, res) => {
	try {
		const id = req.params.id;
		// TODO: Don't send any info about the shareTo user. Remove all details from response
		User.findOneAndUpdate(
			{ email: req.session.user.email },
			{
				$pull: { requested: { _id: id } },
			},
			{ new: true },
			(error, data) => {
				if (error) {
					console.log(error);
					return res.status(400).json({
						message: "Erorr in rejecting task",
						error: error,
					});
				} else {
					console.log("task rejected");
					const { email, username, requested, tasks } = data;
					const session = { email, username, requested, tasks };
					req.session.user = session;
					return res.status(200).json({
						message: "Task rejected",
						data: session,
					});
				}
			}
		);
	} catch (error) {
		console.log("Error in rejecting Task", error.message);
		return res.status(400).json({
			message: "Error in rejecting task",
			error: error.message,
		});
	}
};
