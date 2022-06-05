import React from "react";
import { useQuery } from "react-query";

import AllowanceClaimService from "../../../service/AllowanceClaimService";
import Spinner from "../../Spinner";
import useAuth from "../../../CustomHooks/useAuth";

const ApprovedAllowanceClaimAmountSinceLast30DaysCard = () => {
    const { user } = useAuth();
    const { isLoading, isError, data } = useQuery(
        ["approvedAllowanceClaimSinceLast30DaysCount", user._id],
        () => AllowanceClaimService.getInvigilatorApprovedAllowanceClaimCountSinceLast30Days(user._id),
        { enabled: user !== null || user !== undefined }
    );
    return (
        <div className="card mb-0 h-9rem">
            <div className="flex justify-content-between mb-3">
                {isError && <h5 className="mb-4">Something went wrong</h5>}
                {isLoading && <Spinner />}
                {!isLoading && !isError && (
                    <>
                        <div>
                            <span className="block text-500 font-medium mb-3">Approved Allowance Claim Since Last 30 Days Count </span>
                            <div className="text-900 font-medium text-xl">{data.approvedAllowanceClaimSinceLast30DaysCount}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-green-100 border-round p-2 m-1" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="fa-solid fa-check text-green-500 text-xl" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ApprovedAllowanceClaimAmountSinceLast30DaysCard;
