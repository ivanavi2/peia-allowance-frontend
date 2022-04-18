import React from "react";

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ErrorImage } from "../assets/images/Error.svg";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex justify-content-center align-items-center flex-column p-4">
            <div className="text-center" style={{ height: "50vh" }}>
                <h5>Oops! You must be at the wrong place</h5>
                <ErrorImage />
                <Button
                    className="m-3"
                    label="Go Back"
                    onClick={() => {
                        navigate(-1, { replace: true });
                    }}
                />
            </div>
        </div>
    );
};

export default React.memo(Error);
