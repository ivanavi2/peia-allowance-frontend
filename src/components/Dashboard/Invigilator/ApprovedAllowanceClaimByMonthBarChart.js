import React from "react";
import { useQuery } from "react-query";
import { Chart } from "primereact/chart";
import { getYear } from "date-fns";

import AllowanceClaimService from "../../../service/AllowanceClaimService";
import Spinner from "../../Spinner";
import useAuth from "../../../CustomHooks/useAuth";

const ApprovedAllowanceClaimByMonthBarChart = () => {
    const { user } = useAuth();
    const { isLoading, isError, data } = useQuery(
        ["approvedAllowanceClaimAmountByMonth", user._id],
        () => AllowanceClaimService.getInvigilatorApprovedAllowanceClaimAmountCurrentYearByMonth(user._id),
        { enabled: user !== null || user !== undefined }
    );

    const barChartData = {
        labels: data?.approvedAllowanceClaimAmountCurrentYearByMonth.map((monthlyClaim) => monthlyClaim.monthName),
        datasets: [
            {
                label: "Allowance Claim Approved (MYR) by Month",
                backgroundColor: "#C4B5FD",
                data: data?.approvedAllowanceClaimAmountCurrentYearByMonth.map((monthlyClaim) => monthlyClaim.amount.toFixed(2)),
            },
        ],
    };

    const barChartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#ebedef",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#ebedef",
                },
                grid: {
                    color: "rgba(160, 167, 181, .3)",
                },
            },
            y: {
                ticks: {
                    color: "#ebedef",
                },
                grid: {
                    color: "rgba(160, 167, 181, .3)",
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
                    <h5>Allowance Claim Approved By Month In {getYear(Date.now())}</h5>
                    <Chart type="bar" data={barChartData} options={barChartOptions} />
                </>
            )}
        </div>
    );
};

export default ApprovedAllowanceClaimByMonthBarChart;
