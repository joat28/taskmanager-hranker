require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const cors = require("cors");
const app = express();
const route = require("./routes/index");
const db = require("./databaseConnect");

const oneDay = 1000 * 60 * 60 * 24;


app.use(express.json());
app.use(
	sessions({
		cookie: { secure: false },
		secret: process.env.EXPRESS_SESSION_SECRET,
		saveUninitialized: true,
		resave: false,
	})
);
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);

app.use("/api", route);

app.get("/", (req, res) => {
	res.send("Hi from backend");
});

app.listen(process.env.PORT || 8000, () => {
	console.log("Server running in port " + process.env.PORT);
});
