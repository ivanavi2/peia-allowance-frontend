import transformCamelCaseString from "./transformCamelCaseString";
import { format } from "date-fns";

const statusLabel = {
    0: {
        label: "Rejected",
        severity: "danger",
    },
    1: {
        label: "Pending",
        severity: null,
    },
    2: {
        label: "Approved",
        severity: "success",
    },
};

const transformAdminAllowanceClaimExportArray = (allowanceClaims) => {
    const allowanceClaimExportArray = allowanceClaims.map((allowanceClaim) => {
        let claim = {
            "Invigilator Name": allowanceClaim.invigilator.name,
            "Invigilator IC": allowanceClaim.invigilator.icNumber,
            "Total Allowance Claimed (MYR)": allowanceClaim.totalAllowance.toFixed(2),
            "Allowance Type": allowanceClaim.allowanceType.replace(/([0-9A-Z])/g, " $&"),
            Status: statusLabel[allowanceClaim.status].label,
            "Examination Name": allowanceClaim.examination.name.toUpperCase(),
            "Examination Session": allowanceClaim.examination.session,
            "Examination Year": allowanceClaim.examination.year,
            "Last Updated At": format(new Date(allowanceClaim.updatedAt), "dd/MM/yyyy hh:mm aa"),
            "Created At": format(new Date(allowanceClaim.createdAt), "dd/MM/yyyy hh:mm aa"),
        };

        if (allowanceClaim.allowanceType === "CompetencyAllowance") {
            claim = {
                ...claim,
                "Invigilation Role": transformCamelCaseString(allowanceClaim.invigilation.role),
                "Invigilation Center Code": allowanceClaim.invigilation.centerCode,
                "Invigilation Morning Sessions": allowanceClaim.invigilation.morningSessions,
                "Invigilation Afternoon Sessions": allowanceClaim.invigilation.afternoonSessions,
            };
        }
        if (allowanceClaim.allowanceType === "TravelAllowance") {
            claim = {
                ...claim,
                "Distance Between Home and Invigilation Center (km)": allowanceClaim.distanceBetweenHomeAndInvigilationCenter,
                "Distance Between Home and Examination Vault (km)": allowanceClaim.distanceBetweenHomeAndExaminationVault,
                "Distance Between School and Invigilation Center (km)": allowanceClaim.distanceBetweenSchoolAndInvigilationCenter,
                "Distance Between School and Examination Vault (km)": allowanceClaim.distanceBetweenSchoolAndExaminationVault,
            };
        }
        if (allowanceClaim.allowanceType === "OtherAllowance") {
            claim = {
                ...claim,
                "Lodging (MYR)": allowanceClaim.expenses.lodging.total.toFixed(2),
                "Hotel (MYR)": allowanceClaim.expenses.hotel.total.toFixed(2),
                "Food (MYR)": allowanceClaim.expenses.food.toFixed(2),
                "Tol / TouchnGo (MYR)": allowanceClaim.expenses.tolTouchnGo.toFixed(2),
                "Parking (MYR)": allowanceClaim.expenses.parking.toFixed(2),
                "Telephone / Fax (MYR)": allowanceClaim.expenses.telephoneFax.toFixed(2),
                "Public Transport": allowanceClaim.expenses.publicTransport.toFixed(2),
            };
        }

        return claim;
    });
    return allowanceClaimExportArray;
};

const transformInvigilatorAllowanceClaimExportArray = (allowanceClaims) => {
    const allowanceClaimExportArray = allowanceClaims.map((allowanceClaim) => {
        let claim = {
            "Total Allowance Claimed (MYR)": allowanceClaim.totalAllowance.toFixed(2),
            "Allowance Type": allowanceClaim.allowanceType.replace(/([0-9A-Z])/g, " $&"),
            Status: statusLabel[allowanceClaim.status].label,
            "Examination Name": allowanceClaim.examination.name.toUpperCase(),
            "Examination Session": allowanceClaim.examination.session,
            "Examination Year": allowanceClaim.examination.year,
            "Last Updated At": format(new Date(allowanceClaim.updatedAt), "dd/MM/yyyy hh:mm aa"),
            "Created At": format(new Date(allowanceClaim.createdAt), "dd/MM/yyyy hh:mm aa"),
        };

        if (allowanceClaim.allowanceType === "CompetencyAllowance") {
            claim = {
                ...claim,
                "Invigilation Role": transformCamelCaseString(allowanceClaim.invigilation.role),
                "Invigilation Center Code": allowanceClaim.invigilation.centerCode,
                "Invigilation Morning Sessions": allowanceClaim.invigilation.morningSessions,
                "Invigilation Afternoon Sessions": allowanceClaim.invigilation.afternoonSessions,
            };
        }
        if (allowanceClaim.allowanceType === "TravelAllowance") {
            claim = {
                ...claim,
                "Distance Between Home and Invigilation Center (km)": allowanceClaim.distanceBetweenHomeAndInvigilationCenter,
                "Distance Between Home and Examination Vault (km)": allowanceClaim.distanceBetweenHomeAndExaminationVault,
                "Distance Between School and Invigilation Center (km)": allowanceClaim.distanceBetweenSchoolAndInvigilationCenter,
                "Distance Between School and Examination Vault (km)": allowanceClaim.distanceBetweenSchoolAndExaminationVault,
            };
        }
        if (allowanceClaim.allowanceType === "OtherAllowance") {
            claim = {
                ...claim,
                "Lodging (MYR)": allowanceClaim.expenses.lodging.total.toFixed(2),
                "Hotel (MYR)": allowanceClaim.expenses.hotel.total.toFixed(2),
                "Food (MYR)": allowanceClaim.expenses.food.toFixed(2),
                "Tol / TouchnGo (MYR)": allowanceClaim.expenses.tolTouchnGo.toFixed(2),
                "Parking (MYR)": allowanceClaim.expenses.parking.toFixed(2),
                "Telephone / Fax (MYR)": allowanceClaim.expenses.telephoneFax.toFixed(2),
                "Public Transport": allowanceClaim.expenses.publicTransport.toFixed(2),
            };
        }

        return claim;
    });
    return allowanceClaimExportArray;
};

export { transformAdminAllowanceClaimExportArray, transformInvigilatorAllowanceClaimExportArray };
