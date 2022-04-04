import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "./spinner.scss";

const Spinner = () => {
    return (
        <div className="flex">
            <ProgressSpinner className="custom-spinner" />
        </div>
    );
};

export default Spinner;
