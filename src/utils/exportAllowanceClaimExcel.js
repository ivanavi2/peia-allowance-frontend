import { utils as xlsxUtils, write as xlsxWrite } from "xlsx";
import { saveAs } from "file-saver";

const exportAllowanceClaimExcel = (data, fileName) => {
    try {
        const worksheet = xlsxUtils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer = xlsxWrite(workbook, { bookType: "xlsx", type: "array" });
        saveAsExcelFile(excelBuffer, fileName);
        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
            summary: "Something went wrong when trying to generate the excel file!",
            detail: "Please try again later",
        };
    }
};

const saveAsExcelFile = (buffer, fileName) => {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data = new Blob([buffer], {
        type: EXCEL_TYPE,
    });

    saveAs(data, fileName + EXCEL_EXTENSION);
};

export default exportAllowanceClaimExcel;
