import { Navigate } from 'react-router-dom';
import {useState, ReactNode, useContext} from 'react';
import AuthContext from "../components/Context/AuthProvider";

const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
    let { user } = useContext((AuthContext))

    return !user ? <Navigate to="/login" /> : <>{children}</>;
}

export default PrivateRoute;
