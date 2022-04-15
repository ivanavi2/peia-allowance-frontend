import React, { useState } from "react";
import { useQuery } from "react-query";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode } from "primereact/api";
import { Image, Transformation, Placeholder } from "cloudinary-react";
import { format } from "date-fns";

import AllowanceClaimService from "../service/AllowanceClaimService";
import CompetencyAllowanceClaimDetail from "../components/ViewAllAllowanceClaim/CompetencyAllowanceClaimDetails";
import TravelAllowanceClaimDetail from "../components/ViewAllAllowanceClaim/TravelAllowanceClaimDetail";
import OtherAllowanceClaimDetail from "../components/ViewAllAllowanceClaim/OtherAllowanceClaimDetail";
import EditCompetencyAllowanceForm from "../components/EditAllowanceClaim/CompetencyAllowanceForm";
import EditTravelAllowanceForm from "../components/EditAllowanceClaim/TravelAllowanceForm";
import EditOtherAllowanceForm from "../components/EditAllowanceClaim/OtherAllowanceForm";
import Spinner from "../components/Spinner";
import DataTable from "../components/DataTable";

const statuses = [
    { label: "All Status", value: null },
    { label: "Rejected", value: "0" },
    { label: "Pending", value: "1" },
    { label: "Approved", value: "2" },
];

const types = [
    { label: "All Types", value: null },
    { label: "Competency", value: "CompetencyAllowance" },
    { label: "Travel", value: "TravelAllowance" },
    { label: "Other", value: "OtherAllowance" },
];

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

const statusLabelToValue = {
    Rejected: 0,
    Pending: 1,
    Approved: 2,
};

const examinationLabel = {
    spm: {
        label: "Sijil Pelajaran Malaysia (SPM)",
    },
    stpm: {
        label: "Sijil Tinggi Persekolahan Malaysia (STPM)",
    },
    muet: {
        label: "Malaysian University English Test (MUET)",
    },
};

const typeLabel = {
    OtherAllowance: {
        label: "Others",
    },
    TravelAllowance: {
        label: "Travel",
    },
    CompetencyAllowance: {
        label: "Competency",
    },
};

const ViewAllAllowanceClaim = () => {
    const { isLoading, isError, data, error } = useQuery("allowanceClaims", AllowanceClaimService.getAllAllowanceClaim);
    const allowanceClaims = data?.data.allowanceClaims;
    const [displayModal, setDisplayModal] = useState(false);
    const [currentSelectedAllowanceClaim, setCurrentSelectedAllowanceClaim] = useState({});

    const totalAllowanceClaimBodyTemplate = (rowData) => {
        return parseFloat(rowData.totalAllowance).toFixed(2);
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={statusLabel[rowData.status].label} severity={statusLabel[rowData.status].severity}></Tag>;
    };

    const examinationBodyTemplate = (rowData) => {
        return `${examinationLabel[rowData.examination.name].label} ${rowData.examination.year}/${rowData.examination.session}`;
    };

    const typeBodyTemplate = (rowData) => {
        return `${typeLabel[rowData.allowanceType].label}`;
    };

    const lastUpdatedAtBodyTemplate = (rowData) => {
        const datetime = new Date(rowData.updatedAt);
        return format(datetime, "dd/MM/yyyy hh:mm aa");
    };

    const attachmentsBodyTemplate = (rowData) => {
        return (
            <Button
                className="py-1 px-2 text-sm"
                label="View"
                icon="fa-solid fa-magnifying-glass"
                onClick={() => {
                    setDisplayModal("attachmentsModal");
                    setCurrentSelectedAllowanceClaim(rowData);
                }}
            />
        );
    };

    const actionsBodyTemplate = (rowData) => {
        return (
            <Button
                className="p-1 m-1 text-sm"
                icon="fa-solid fa-pen-to-square"
                disabled={rowData.status !== 1}
                onClick={() => {
                    setDisplayModal("editAllowanceModal");
                    setCurrentSelectedAllowanceClaim(rowData);
                }}
            />
        );
    };

    const approveRejectBodyTemplate = (rowData) => {
        return (
            <>
                <Button className="p-1 m-1 text-sm p-button-success" icon="fa-solid fa-check" onClick={() => {}} />
                <Button className="p-1 m-1 text-sm p-button-danger" icon="fa-solid fa-xmark" onClick={() => {}} />
            </>
        );
    };

    const detailsBodyTemplate = (rowData) => {
        return (
            <Button
                className="py-1 px-2 text-sm"
                label="View"
                icon="fa-solid fa-magnifying-glass"
                onClick={() => {
                    setDisplayModal("detailsModal");
                    setCurrentSelectedAllowanceClaim(rowData);
                }}
            />
        );
    };

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value)} placeholder="Select a Status" className="p-column-filter" showClear />;
    };

    const typeFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={types} onChange={(e) => options.filterCallback(e.value)} placeholder="Select a Type" className="p-column-filter" showClear />;
    };

    const displayAttachments = () => {
        if (currentSelectedAllowanceClaim?.attachments?.length === 0) {
            return <h5>No attachments is uploaded</h5>;
        }

        return currentSelectedAllowanceClaim?.attachments?.map((attachment) => (
            <div className="border-primary border-1 border-round m-1" key={attachment.public_id}>
                <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} publicId={attachment.public_id} loading="lazy">
                    <Placeholder></Placeholder>
                    <Transformation width="250" height="250" crop="scale" quality="auto" />
                </Image>
            </div>
        ));
    };

    const displayDetails = () => {
        if (currentSelectedAllowanceClaim.allowanceType === "CompetencyAllowance") {
            return <CompetencyAllowanceClaimDetail allowanceClaim={currentSelectedAllowanceClaim} />;
        }
        if (currentSelectedAllowanceClaim.allowanceType === "TravelAllowance") {
            return <TravelAllowanceClaimDetail allowanceClaim={currentSelectedAllowanceClaim} />;
        }
        if (currentSelectedAllowanceClaim.allowanceType === "OtherAllowance") {
            return <OtherAllowanceClaimDetail allowanceClaim={currentSelectedAllowanceClaim} />;
        }
        return <h5>No details available</h5>;
    };

    const displayEditAllowanceClaimForm = () => {
        if (currentSelectedAllowanceClaim.allowanceType === "CompetencyAllowance") {
            return <EditCompetencyAllowanceForm allowanceClaim={currentSelectedAllowanceClaim} setDisplayModal={setDisplayModal} />;
        }
        if (currentSelectedAllowanceClaim.allowanceType === "TravelAllowance") {
            return <EditTravelAllowanceForm allowanceClaim={currentSelectedAllowanceClaim} setDisplayModal={setDisplayModal} />;
        }
        if (currentSelectedAllowanceClaim.allowanceType === "OtherAllowance") {
            return <EditOtherAllowanceForm allowanceClaim={currentSelectedAllowanceClaim} setDisplayModal={setDisplayModal} />;
        }
        return <h5>No details available</h5>;
    };

    const matchModes = [{ label: "Equals", value: FilterMatchMode.EQUALS }];

    const tableColumns = [
        <Column key="totalAllowance" field="totalAllowance" header="Total Allowance Claimed (MYR)" body={totalAllowanceClaimBodyTemplate} />,
        <Column
            key="status"
            field="status"
            header="Status"
            body={statusBodyTemplate}
            filter
            filterMatchMode="equals"
            filterMatchModeOptions={matchModes}
            filterElement={statusFilterTemplate}
            showFilterOperator={false}
            showAddButton={false}
        />,
        <Column
            key="allowanceType"
            field="allowanceType"
            header="Type"
            body={typeBodyTemplate}
            filter
            filterMatchMode="equals"
            filterMatchModeOptions={matchModes}
            filterElement={typeFilterTemplate}
            showFilterOperator={false}
            showAddButton={false}
        />,
        <Column key="examination.name" field="examination.name" header="Examination" body={examinationBodyTemplate} />,
        <Column key="updatedAt" field="updatedAt" header="Last Updated At" body={lastUpdatedAtBodyTemplate} />,
        <Column key="attachments" field="attachments" header="Attachments" body={attachmentsBodyTemplate} align="center" />,
        <Column key="type" field="type" header="Details" body={detailsBodyTemplate} align="center" />,
        <Column key="actions" field="_id" header="Actions" body={actionsBodyTemplate} align="center" />,
        <Column key="approveReject" field="_id" header="Approve/Reject" body={approveRejectBodyTemplate} align="center" />,
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4">View All Allowance Claim</h5>
                    {isError && <h5 className="mb-4">Something went wrong</h5>}
                    {isLoading && <Spinner />}
                    {!isLoading && !isError && <DataTable data={allowanceClaims} columns={tableColumns}></DataTable>}
                    <Dialog header="Attachments" visible={displayModal === "attachmentsModal"} style={{ width: "70vw" }} onHide={() => setDisplayModal(false)}>
                        <div className="flex">{displayAttachments()}</div>
                    </Dialog>
                    <Dialog header="Allowance Details" visible={displayModal === "detailsModal"} style={{ width: "70vw" }} onHide={() => setDisplayModal(false)}>
                        {displayDetails()}
                    </Dialog>
                    <Dialog header="Edit Allowance Claim" visible={displayModal === "editAllowanceModal"} style={{ width: "70vw" }} onHide={() => setDisplayModal(false)}>
                        {displayEditAllowanceClaimForm()}
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ViewAllAllowanceClaim, comparisonFn);
