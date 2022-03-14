import React from "react";
import { Route, Redirect } from "react-router-dom";

import Auth from "./Auth.js";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (Auth.isAuthenticated === "true") return <Component {...props} />;
				else {
					console.log("false");
					return (
						<Redirect
							to={{
								pathname: "/auth/login",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
