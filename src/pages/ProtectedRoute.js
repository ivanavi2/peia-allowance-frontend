import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children, roles }) => {
    const { user, isLoading } = useAuth();
    console.log({ user });
    let location = useLocation();

    if (isLoading) {
        return (
            <div className="flex justify-content-center align-items-center h-screen">
                <Spinner />
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.includes(user.userGroup)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
