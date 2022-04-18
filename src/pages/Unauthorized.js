import React from "react";

import { ReactComponent as UnauthorizedImage } from "../assets/images/Unauthorized.svg";

const Unauthorized = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card flex justify-content-center align-items-center flex-column p-5" style={{ height: "84vh" }}>
                    <h4>You are not authorized to view this page</h4>
                    <UnauthorizedImage />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Unauthorized);
