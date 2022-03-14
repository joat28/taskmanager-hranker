const axios = require("axios");
const { BASE_URI } = require("./config");
const backendUri = BASE_URI;
class Auth {
	constructor() {
		this.isAuthenticated = localStorage.getItem("isAuthenticated");
	}
	register(payload, cb) {
		console.log("playload in frontend", payload);
		const registerUrl = `${backendUri}/api/auth/register`;
		axios
			.post(registerUrl, payload)
			.then((res) => {
				console.log(res);
				this.isAuthenticated = "true";
				localStorage.setItem("isAuthenticated", "true");
				cb();
				return;
			})
			.catch((error) => {
				console.log(error.response);
				return alert("Invalid combinations or Wrong inputs given");
			});
	}
	login(payload, cb) {
		const loginUrl = `${backendUri}/api/auth/login`;
		axios
			.post(loginUrl, payload)
			.then((res) => {
				console.log(res);
				this.isAuthenticated = "true";
				localStorage.setItem("isAuthenticated", "true");
				cb();
				return;
			})
			.catch((error) => {
				console.log(error);
				return alert("Invalid combinations/ User not found");
			});
	}
	logout(cb) {
		const logoutUrl = `${backendUri}/api/auth/logout`;
		axios
			.post(logoutUrl)
			.then((res) => {
				console.log(res);
				this.isAuthenticated = "false";
				localStorage.setItem("isAuthenticated", "false");
				cb();
			})
			.catch((error) => console.log(error.response));
	}
	isAuthenticated() {
		return this.isAuthenticated;
	}
}

export default new Auth();
