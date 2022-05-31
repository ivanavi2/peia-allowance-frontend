import React from "react";
import { Button } from "primereact/button";

const TableExportHeader = ({ onExportExcel, onExportPDF }) => {
    return (
        <div className="flex align-items-center export-buttons">
            <Button type="button" icon="fa-regular fa-file-excel" onClick={onExportExcel} className="mr-2 p-button-lg" data-pr-tooltip="XLS" />
            <Button type="button" icon="fa-regular fa-file-pdf" onClick={onExportPDF} className=" mr-2 p-button-lg" data-pr-tooltip="PDF" />
        </div>
    );
};

export default TableExportHeader;
