import React from "react";
import { Card } from "primereact/card";

import { ReactComponent as LoginHeader } from "../assets/images/LoginHeader.svg";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
    return (
        <div className="w-screen h-screen flex justify-content-center align-items-center flex-column">
            <Card style={{ width: "70vw" }}>
                <div className="grid">
                    <div className="hidden sm:block col-6">
                        <LoginHeader />
                    </div>
                    <div className="col-12 sm:col-6">
                        <LoginForm />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Login;
