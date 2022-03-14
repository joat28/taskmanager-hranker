import React, { useState } from "react";
import Auth from "../Auth";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	};
	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const onLoginClick = (event) => {
		event.preventDefault();
		if (!email.includes("@") || password.length < 6) {
			return alert("Invalid Combinations");
		} else {
			Auth.login({ email, password }, () => {
				props.history.push("/home");
			});
		}
	};
	

	return (
		<React.Fragment>
			<Nav />
			<div className="flex flex-col justify-center items-center h-screen ">
				<h1 className="text-3xl font-bold mt-0 mb-6">Login with Email</h1>
				<form className="bg-gray-200 shadow-md rounded px-10 pt-8 pb-10 mb-6 ">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							for="email"
						>
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="Enter your Email"
							onChange={onEmailChange}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							for="password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="Enter password"
							onChange={onPasswordChange}
						/>
						<p className="text-red-500 text-xs italic">
							Please choose a password.
						</p>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
							onClick={onLoginClick}
						>
							Sign In
						</button>
					</div>
				</form>
			</div>

			<Footer />
		</React.Fragment>
	);
};

export default Login;
