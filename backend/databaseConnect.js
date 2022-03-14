require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DB_URI;

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB connected");
		module.exports = mongoose.connection;
	})
	.catch((err) => console.log(err));
