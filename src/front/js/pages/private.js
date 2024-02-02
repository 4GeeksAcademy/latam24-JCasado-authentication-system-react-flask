
// Confirmar el token para saber si existe, de lo contrario enviar al Login:

import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener el token del estado global
        const token = store.token;

        // Verificar si hay un token
        if (!token) {
            alert("Please login or create an account");
            navigate("/");
        }
    }, [store.token, navigate]);

    return (
        <div>
            {store.token ? (
                <h2>Private Route</h2>
            ) : (
                <h2>Go back to Register or Login</h2>
            )}
        </div>
    );
};

export default Private;


