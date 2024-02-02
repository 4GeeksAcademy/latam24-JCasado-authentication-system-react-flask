import React, { useContext } from "react";
import { Context } from "../store/appContext";
import jcasadoImageUrl from "../../img/jcasado-icon.jpg";
import "../../styles/home.css";


export const Home = () => {

	const { store, actions } = useContext(Context);

	return (
		
		<div className="text-center mt-5">
			<h1>Welcome</h1>
			<p>
				<img src={jcasadoImageUrl} style={{ width: "300px", height: "auto"}}/>	
			</p>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)"}
			</div>
			<p>
				To receive further information contact the service provider here:{" "}
				<a href="https://www.linkedin.com/in/giorgiocasado/">
				</a>
			</p>
		</div>
	);
};
