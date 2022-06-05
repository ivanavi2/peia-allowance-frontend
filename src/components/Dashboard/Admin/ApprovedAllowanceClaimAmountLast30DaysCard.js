import React from "react";
import { useQuery } from "react-query";

import AllowanceClaimService from "../../../service/AllowanceClaimService";
import Spinner from "../../Spinner";

const ApprovedAllowanceClaimAmountLast30DaysCard = () => {
    const { isLoading, isError, data } = useQuery("approvedAllowanceClaimSinceLast30DaysAmount", AllowanceClaimService.getApprovedAllowanceClaimAmountSinceLast30Days);
    return (
        <div className="card mb-0  h-9rem">
            <div className="flex justify-content-between mb-3">
                {isError && <h5 className="mb-4">Something went wrong</h5>}
                {isLoading && <Spinner />}
                {!isLoading && !isError && (
                    <>
                        <div>
                            <span className="block text-500 font-medium mb-3">Approved Allowance Claim Since Last 30 Days Amount </span>
                            <div className="text-900 font-medium text-xl">MYR {data.approvedAllowanceClaimAmountSinceLast30Days}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round p-2 m-1" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="fa-solid fa-money-bill text-purple-500 text-xl" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApprovedAllowanceClaimAmountLast30DaysCard;
