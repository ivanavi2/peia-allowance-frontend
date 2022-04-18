import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";

import AuthService from "../service/AuthService";
import UserService from "../service/UserService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userId = localStorage.getItem("userId");

    const { isLoading } = useQuery(["user", userId], () => UserService.getUserById(userId), {
        enabled: !!userId,
        onSuccess: ({ user }) => {
            setUser(user);
        },
    });

    const signIn = async (login, password) => {
        try {
            const {
                data: { token, user },
            } = await AuthService.login({ login, password });
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user._id);
            setUser(user);
            navigate(from, { replace: true });
        } catch (error) {
            if (error.response) {
                setError({
                    message: "Unable to login",
                    detail: error.response.data?.message,
                });
            } else {
                setError({
                    message: "Something went wrong",
                    detail: "Please try again later",
                });
            }
        }
    };

    let value = { user, signIn, error, isLoading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
