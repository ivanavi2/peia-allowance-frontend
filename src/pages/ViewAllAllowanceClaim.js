import React from "react";

import UnlockAccess from "../components/UnlockAccess";
import InvigilatorViewAllAllowanceClaim from "../components/ViewAllAllowanceClaim/InvigilatorViewAllAllowanceClaim";
import AdminViewAllAllowanceClaim from "../components/ViewAllAllowanceClaim/AdminViewAllAllowanceClaim";

const ViewAllAllowanceClaim = () => {
    return (
        <>
            <UnlockAccess roles={["Teacher"]}>
                <InvigilatorViewAllAllowanceClaim />
            </UnlockAccess>
            <UnlockAccess roles={["Admin"]}>
                <AdminViewAllAllowanceClaim />
            </UnlockAccess>
        </>
    );
};

export default React.memo(ViewAllAllowanceClaim);
