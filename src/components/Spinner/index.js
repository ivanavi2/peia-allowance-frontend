import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import "./spinner.scss";

const Spinner = ({ height, width }) => {
    const spinnerStyle = { height: height ? height : "100px", width: width ? width : "100px" };
    return (
        <div className="flex">
            <ProgressSpinner className="custom-spinner" style={spinnerStyle} />
        </div>
    );
};

export default Spinner;
