import React from "react";

import UnlockAccess from "./UnlockAccess";
import AdminPendingAllowanceClaimCountCard from "./Dashboard/Admin/PendingAllowanceClaimCountCard";
import AdminApprovedAllowanceClaimCountLast30DaysCard from "./Dashboard/Admin/ApprovedAllowanceClaimCountLast30DaysCard";
import AdminRejectedAllowanceClaimCountLast30DaysCard from "./Dashboard/Admin/RejectedAllowanceClaimCountLast30DaysCard";
import AdminApprovedAllowanceClaimAmountLast30DaysCard from "./Dashboard/Admin/ApprovedAllowanceClaimAmountLast30DaysCard";
import AdminApprovedAllowanceClaimByMonthBarChart from "./Dashboard/Admin/ApprovedAllowanceClaimByMonthBarChart";
import AdminApprovedAllowanceClaimByTypePieChart from "./Dashboard/Admin/ApprovedAllowanceClaimByTypePieChart";
import InvigilatorPendingAllowanceClaimCountCard from "./Dashboard/Invigilator/PendingAllowanceClaimCountCard";
import InvigilatorApprovedAllowanceClaimAmountSinceLast30DaysCard from "./Dashboard/Invigilator/ApprovedAllowanceClaimAmountSinceLast30DaysCard";
import InvigilatorRejectedAllowanceClaimCountLast30DaysCard from "./Dashboard/Invigilator/RejectedAllowanceClaimCountLast30DaysCard";
import InvigilatorApprovedAllowanceClaimCountLast30DaysCard from "./Dashboard/Invigilator/ApprovedAllowanceClaimCountLast30DaysCard";
import InvigilatorApprovedAllowanceClaimByMonthBarChart from "./Dashboard/Invigilator/ApprovedAllowanceClaimByMonthBarChart";
import InvigilatorApprovedAllowanceClaimByTypePieChart from "./Dashboard/Invigilator/ApprovedAllowanceClaimByTypePieChart";

const Dashboard = (props) => {
    return (
        <>
            <UnlockAccess roles={["Admin"]}>
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <AdminPendingAllowanceClaimCountCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <AdminApprovedAllowanceClaimCountLast30DaysCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <AdminRejectedAllowanceClaimCountLast30DaysCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <AdminApprovedAllowanceClaimAmountLast30DaysCard />
                    </div>
                    <div className="col-12 xl:col-6">
                        <AdminApprovedAllowanceClaimByMonthBarChart />
                    </div>

                    <div className="col-12 xl:col-6">
                        <AdminApprovedAllowanceClaimByTypePieChart />
                    </div>
                </div>
            </UnlockAccess>
            <UnlockAccess roles={["Teacher"]}>
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-3">
                        <InvigilatorPendingAllowanceClaimCountCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <InvigilatorApprovedAllowanceClaimCountLast30DaysCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <InvigilatorRejectedAllowanceClaimCountLast30DaysCard />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-3">
                        <InvigilatorApprovedAllowanceClaimAmountSinceLast30DaysCard />
                    </div>
                    <div className="col-12 xl:col-6">
                        <InvigilatorApprovedAllowanceClaimByMonthBarChart />
                    </div>
                    <div className="col-12 xl:col-6">
                        <InvigilatorApprovedAllowanceClaimByTypePieChart />
                    </div>
                    <div
                        className="px-4 py-5 shadow-2  col-12 flex flex-column md:flex-row md:align-items-center justify-content-between mb-3"
                        style={{
                            borderRadius: "1rem",
                            background: "linear-gradient(0deg, #c996fa, #763cad), linear-gradient(92.54deg, #432263 47.88%, #FFFFFF 100.01%)",
                        }}
                    >
                        <div>
                            <div className="text-white font-medium text-xl mt-2 mb-3">For any enquiries please contact us at</div>
                            <div className="text-white font-medium text-3xl">+60 7-231 0000</div>
                        </div>
                        <div className="mt-4 mr-auto md:mt-0 md:mr-0">
                            <a href="mailto:jpn.johor@moe.gov.my" className="p-button font-bold px-5 py-3 p-button-warning p-button-rounded p-button-raised">
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </UnlockAccess>
        </>
    );
};

export default React.memo(Dashboard);
