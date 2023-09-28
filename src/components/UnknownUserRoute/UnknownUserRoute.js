import React from 'react';
import { Navigate } from "react-router-dom";

const UnknownUserRoute = ({ element: Component, ...props }) => {
    return (
        props.isLoggedIn ? <Navigate to="/" replace={true} /> : <Component {...props} />
    )
};

export default UnknownUserRoute;