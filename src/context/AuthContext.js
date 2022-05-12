import React, { createContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";

import AuthService from "../service/AuthService";
import UserService from "../service/UserService";
import TeacherService from "../service/TeacherService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userId = localStorage.getItem("userId");

    const { isLoading: isLoadingUser } = useQuery(["user", userId], () => UserService.getUserById(userId), {
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
        onSuccess: ({ user }) => setUser(user),
    });

    const { isLoading: isLoadingTeacher } = useQuery(["teacherByUser", userId], () => TeacherService.getTeacherByUser(userId), {
        enabled: !!userId && !!user && user.userGroup === "Teacher",
        staleTime: 5 * 60 * 1000,
        onSuccess: ({ teacher }) => setUser({ ...user, ...teacher }),
    });

    let isLoading = isLoadingTeacher || isLoadingUser;

    const signIn = async (login, password) => {
        try {
            const {
                data: { token, user },
            } = await AuthService.login({ login, password });

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user._id);

            if (user.userGroup === "Teacher") {
                const { teacher } = await TeacherService.getTeacherByUser(user._id);
                setUser({ ...user, ...teacher });
            } else {
                setUser(user);
            }

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

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
        setError(null);
        navigate("/login", { state: { from: location }, replace: true });
    };

    const redirectLogin = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
        setError({
            message: "Please login again!",
            detail: "Session expired or something went wrong",
        });
        navigate("/login", { state: { from: location }, replace: true });
    };

    let value = { user, signIn, signOut, error, isLoading, redirectLogin };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
