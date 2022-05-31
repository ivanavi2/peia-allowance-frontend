const adminCols = [
    { field: "Invigilator Name", header: "Invigilator Name" },
    { field: "Invigilator IC", header: "Invigilator IC" },
    { field: "Total Allowance Claimed (MYR)", header: "Total Allowance Claimed (MYR)" },
    { field: "Allowance Type", header: "Allowance Type" },
    { field: "Status", header: "Status" },
    { field: "Last Updated At", header: "Last Updated At" },
    { field: "Created At", header: "Created At" },
    { field: "Examination Name", header: "Examination Name" },
    { field: "Examination Session", header: "Examination Session" },
    { field: "Examination Year", header: "Examination Year" },
];

const invigilatorCols = [
    { field: "Total Allowance Claimed (MYR)", header: "Total Allowance Claimed (MYR)" },
    { field: "Allowance Type", header: "Allowance Type" },
    { field: "Status", header: "Status" },
    { field: "Last Updated At", header: "Last Updated At" },
    { field: "Created At", header: "Created At" },
    { field: "Examination Name", header: "Examination Name" },
    { field: "Examination Session", header: "Examination Session" },
    { field: "Examination Year", header: "Examination Year" },
];

const exportAdminColumns = adminCols.map((col) => ({ title: col.header, dataKey: col.field }));
const exportInvigilatorColumns = invigilatorCols.map((col) => ({ title: col.header, dataKey: col.field }));

const exportAdminAllowanceClaimPDF = (allowanceClaims, fileName) => {
    try {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable({ columns: exportAdminColumns, body: allowanceClaims, margin: 10 });
                // doc.autoTable(exportColumns, allowanceClaims);
                doc.save(`${fileName}.pdf`);
            });
        });
        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
            summary: "Something went wrong when trying to generate the PDF file!",
            detail: "Please try again later",
        };
    }
};

const exportInvigilatorAllowanceClaimPDF = (allowanceClaims, fileName) => {
    try {
        import("jspdf").then((jsPDF) => {
            import("jspdf-autotable").then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable({ columns: exportInvigilatorColumns, body: allowanceClaims, margin: 10 });
                // doc.autoTable(exportColumns, allowanceClaims);
                doc.save(`${fileName}.pdf`);
            });
        });
        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
            summary: "Something went wrong when trying to generate the PDF file!",
            detail: "Please try again later",
        };
    }
};

export { exportAdminAllowanceClaimPDF, exportInvigilatorAllowanceClaimPDF };
