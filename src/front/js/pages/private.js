
// Confirmar el token para saber si existe, de lo contrario enviar al Login:

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
 

export const Private = () => {

    const { store } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {

        const token = sessionStorage.getItem("token")

        if (!token) {

            alert("Please login or create an account")
            navigate("/home")
        }
    }, [navigate])

    const token = sessionStorage.getItem("token");

    return (
        <div>
            {token ? (<h2>Private Route</h2>) : (<h2>Go back to Register or Login</h2>)}
        </div>
    )
};

export default Private


