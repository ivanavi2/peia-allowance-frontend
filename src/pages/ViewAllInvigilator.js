import React, { useState } from "react";
import { useQuery } from "react-query";
import { Column } from "primereact/column";
import { format } from "date-fns";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import DataTable from "../components/DataTable";
import TeacherService from "../service/TeacherService";
import Spinner from "../components/Spinner";
import transformCamelCaseString from "../utils/transformCamelCaseString";

const ViewAllInvigilator = () => {
    const { isLoading, isError, data } = useQuery("invigilators", () => TeacherService.getAllTeacher());
    const invigilators = data?.teachers;
    const [currentSelectedInvigilator, setCurrentSelectedInvigilator] = useState({});
    const [displayModal, setDisplayModal] = useState(false);

    const salaryBodyTemplate = (rowData) => {
        return parseFloat(rowData.salary).toFixed(2);
    };

    const invigilationExperienceBodyTemplate = (rowData) => {
        return (
            <Button
                className="py-1 px-2 text-sm"
                label="View"
                icon="fa-solid fa-magnifying-glass"
                onClick={() => {
                    setCurrentSelectedInvigilator(rowData);
                    setDisplayModal("invigilationExperienceModal");
                }}
            />
        );
    };

    const invigilationRoleBodyTemplate = (rowData) => {
        return transformCamelCaseString(rowData.role);
    };

    const collectionDateBodyTemplate = (rowData) => {
        const datetime = new Date(rowData.assignmentTask.collectionDate);
        return format(datetime, "dd/MM/yyyy hh:mm aa");
    };

    const salaryFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="MYR" />;
    };

    const invigilatorTableColumns = [
        <Column key="teacherName" field="teacherName" header="Name" filter showAddButton={false} showFilterOperator={false} />,
        <Column key="teacherSex" field="teacherSex" header="Gender" />,
        <Column key="teacherEmailAddress" field="teacherEmailAddress" header="Email Address" />,
        <Column key="teacherPhoneNumber" field="teacherPhoneNumber" header="Phone Number" />,
        <Column key="homeAddress" field="homeAddress" header="Address" />,
        <Column key="city" field="city" header="City" />,
        <Column key="state" field="state" header="State" filter showAddButton={false} showFilterOperator={false} />,
        <Column key="salaryGrade" field="salaryGrade" header="Salary Grade" />,
        <Column key="salary" field="salary" header="Salary (MYR)" dataType="numeric" body={salaryBodyTemplate} filter filterElement={salaryFilterTemplate} />,
        <Column key="invigilationExperience" field="_id" header="Invigilation Experiences" body={invigilationExperienceBodyTemplate} />,
    ];

    const invigilationExperienceTableColumns = [
        <Column key="role" field="role" header="Role" body={invigilationRoleBodyTemplate} filter showAddButton={false} showFilterOperator={false} />,
        <Column key="assignmentTitle" field="assignmentTask.title" header="Assignment Title" />,
        <Column key="assignmentExamType" field="assignmentTask.examType" header="Exam" />,
        <Column key="assignmentStatus" field="assignmentTask.status" header="Status" />,
        <Column key="assignmentCollectionDate" field="assignmentTask.collectionDate" header="Collection Date" body={collectionDateBodyTemplate} />,
    ];

    const displayInvigilationExperience = () => {
        if (currentSelectedInvigilator?.listOfInvigilatorExperience?.length <= 0) return <h6>No invigilation experience available</h6>;
        return <DataTable data={currentSelectedInvigilator.listOfInvigilatorExperience} columns={invigilationExperienceTableColumns}></DataTable>;
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4">View All Invigilator</h5>
                    {isError && <h5 className="mb-4">Something went wrong</h5>}
                    {isLoading && <Spinner />}
                    {!isLoading && !isError && <DataTable data={invigilators} columns={invigilatorTableColumns}></DataTable>}
                    <Dialog header="Invigilation Experience" visible={displayModal === "invigilationExperienceModal"} style={{ width: "70vw" }} onHide={() => setDisplayModal(false)}>
                        <div>{displayInvigilationExperience()}</div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default ViewAllInvigilator;
