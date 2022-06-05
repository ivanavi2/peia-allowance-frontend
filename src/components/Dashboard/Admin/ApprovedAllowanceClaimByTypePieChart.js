import React from "react";
import { useQuery } from "react-query";
import { Chart } from "primereact/chart";
import { getYear } from "date-fns";

import AllowanceClaimService from "../../../service/AllowanceClaimService";
import Spinner from "../../Spinner";
import transformCamelCaseString from "../../../utils/transformCamelCaseString";

const ApprovedAllowanceClaimByTypePieChart = () => {
    const { isLoading, isError, data } = useQuery("approvedAllowanceClaimAmountByType", AllowanceClaimService.getApprovedAllowanceClaimAmountCurrentYearByType);

    const pieChartData = {
        labels: data?.approvedAllowanceClaimAmountCurrentYearByType.map((claimByType) => transformCamelCaseString(claimByType.type)),
        datasets: [
            {
                label: "Allowance Claim Approved (MYR) by Type",
                backgroundColor: ["#C4B5FD", "#66BB6A", "#FFA726"],
                hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
                data: data?.approvedAllowanceClaimAmountCurrentYearByType.map((claimByType) => claimByType.approvedAllowanceByType.toFixed(2)),
            },
        ],
    };

    const pieChartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#ebedef",
                },
            },
        },
    };
    return (
        <div className="card">
            {isError && <h5 className="mb-4">Something went wrong</h5>}
            {isLoading && <Spinner />}
            {!isLoading && !isError && (
                <>
                    <h5>Allowance Claim Approved By Type In {getYear(Date.now())}</h5>
                    <div className="flex justify-content-center">
                        <Chart type="pie" data={pieChartData} options={pieChartOptions} style={{ position: "relative", width: "50%" }} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ApprovedAllowanceClaimByTypePieChart;
