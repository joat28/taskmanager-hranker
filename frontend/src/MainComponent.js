import React from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";


const MainComponent = () => {
	return (
		<div >
			<BrowserRouter>
				<Switch>
					<Route exact path="/auth/login" component={Login} />
					<Route exact path="/auth/register" component={Register} />
					<ProtectedRoute exact path="/home" component={Home} />
					<Route path="/"> <Redirect to="/home" /></Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default MainComponent;
