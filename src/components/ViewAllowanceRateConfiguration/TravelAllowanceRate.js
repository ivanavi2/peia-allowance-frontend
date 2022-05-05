import React, { useState } from "react";
import { useQuery } from "react-query";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import AllowanceRateService from "../../service/AllowanceRateService";
import Spinner from "../Spinner";
import DataTable from "../DataTable";
import EditAllowanceRateForm from "./EditAllowanceRateForm";

const TravelAllowanceRate = () => {
    const { isLoading, isError, data } = useQuery(["allowanceRate", "TravelAllowance"], () => AllowanceRateService.getAllowanceRateByAllowanceType("TravelAllowance"));
    const rates = data?.allowanceRates.rates;
    const [displayModal, setDisplayModal] = useState(false);
    const [currentSelectedAllowanceRate, setCurrentSelectedAllowanceRate] = useState({});

    const actionsBodyTemplate = (rowData) => {
        return (
            <Button
                className="p-1 m-1 text-sm"
                icon="fa-solid fa-pen-to-square"
                onClick={() => {
                    setDisplayModal("editAllowanceRateModal");
                    setCurrentSelectedAllowanceRate(rowData);
                }}
            />
        );
    };
    const tableColumns = [
        <Column key="code" field="code" header="Code" />,
        <Column key="rate" field="rate" header="Rate" />,
        <Column key="actions" field="_id" header="Actions" body={actionsBodyTemplate} align="center" />,
    ];

    const displayEditAllowanceRateForm = () => {
        return <EditAllowanceRateForm allowanceRate={currentSelectedAllowanceRate} allowanceType="TravelAllowance" setDisplayModal={setDisplayModal} />;
    };

    if (isError) {
        return <h5 className="mb-4">Something went wrong</h5>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <DataTable data={rates} columns={tableColumns}></DataTable>
            <Dialog header={`Edit ${currentSelectedAllowanceRate.code} Rate`} visible={displayModal === "editAllowanceRateModal"} style={{ width: "70vw" }} onHide={() => setDisplayModal(false)}>
                <div className="flex">{displayEditAllowanceRateForm()}</div>
            </Dialog>
        </>
    );
};

export default TravelAllowanceRate;
