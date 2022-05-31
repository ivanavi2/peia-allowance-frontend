import React from "react";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import AllowanceClaimDocumentPDF from "../components/AllowanceClaimDocumentPDF";

const generateAllowanceClaimDocumentPDF = async (allowanceClaim, invigilator, fileName) => {
    try {
        const blob = await pdf(<AllowanceClaimDocumentPDF allowanceClaim={allowanceClaim} invigilator={invigilator} />).toBlob();
        saveAs(blob, fileName);
        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
            summary: "Something went wrong when trying to generate the PDF!",
            detail: "Please try again later",
        };
    }
};
export default generateAllowanceClaimDocumentPDF;
