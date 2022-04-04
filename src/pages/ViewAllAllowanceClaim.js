import React from "react";
import { useQuery } from "react-query";

import AllowanceClaimService from "../service/AllowanceClaimService";
import Spinner from "../components/Spinner";
const ViewAllAllowanceClaim = () => {
    const { isLoading, isError, data, error } = useQuery("allowanceClaims", AllowanceClaimService.getAllAllowanceClaim);

    console.log("data", data);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4">View All Allowance Claim</h5>
                    {isError && <h5 className="mb-4">Something went wrong</h5>}
                    {isLoading && <Spinner />}
                    {!isLoading && !isError && (
                        <div>
                            <h1>hi</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ViewAllAllowanceClaim, comparisonFn);
