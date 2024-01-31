
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {

		console.log("Navbar");

	}, [store.token]);

	const handleClick = () => {

		!store.token && navigate("/login");
		actions.logOut();
	};

	return (

		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				{store.token && (
					<Link to="/private">
						<span className="navbar-brand mb-0 h1">Dashboard</span>
					</Link>
				)}
				<div className="ml-auto">
					<Link to="/Login">
						{store.token ? "Logout" : "Login"}
					</Link>
					<Link to="/Register">
						{store.token ? "Logout" : "Register"}
					</Link>
				</div>
			</div>
		</nav>
	);
};
