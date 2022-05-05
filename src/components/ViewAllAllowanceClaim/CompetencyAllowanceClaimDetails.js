import React from "react";

import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const examinationNameToLabel = {
    spm: "Sijil Pelajaran Malaysia (SPM)",
    stpm: "Sijil Tinggi Persekolahan Malaysia (STPM)",
    muet: "Malaysian University English Test (MUET)",
};

const invigilationRoleToLabel = {
    headOfInvigilator: "Head of Invigilator",
    invigilator: "Invigilator",
};

const CompetencyAllowanceClaimDetail = ({ allowanceClaim }) => {
    return (
        <div className="p-fluid formgrid grid custom-scrollbar">
            <div className="col-12 mb-1">
                <h5>Personal Information</h5>
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilator.name">Name</label>
                <InputText id="invigilator.name" value={allowanceClaim.invigilator.name} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilator.icNumber">IC Number</label>
                <InputText id="invigilator.icNumber" value={allowanceClaim.invigilator.icNumber} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilator.phoneNumber">Phone Number</label>
                <InputText id="invigilator.phoneNumber" value={allowanceClaim.invigilator.phoneNumber} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilator.baseSalary">Base Salary</label>
                <InputNumber value={allowanceClaim.invigilator.baseSalary} inputId="invigilator.baseSalary" mode="decimal" useGrouping={false} disabled />
            </div>
            <div className="field col-12">
                <label htmlFor="invigilator.name">Address</label>
                <InputText id="invigilator.address" value={allowanceClaim.invigilator.address} disabled />
            </div>
            <div className="col-12 mt-4 mb-1">
                <h5>Bank Account Information</h5>
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="bankAccount.name">Bank Name</label>
                <InputText id="bankAccount.name" value={allowanceClaim.bankAccount.name} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="bankAccount.accountNumber">Account Number</label>
                <InputText id="bankAccount.accountNumber" value={allowanceClaim.bankAccount.accountNumber} disabled />
            </div>
            <div className="col-12 mt-4 mb-1">
                <h5>Invigilation Information</h5>
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="examination.name">Examination Name</label>
                <InputText id="examination.name" value={examinationNameToLabel[allowanceClaim.examination.name]} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="examination.year">Year</label>
                <InputNumber value={allowanceClaim.examination.year} inputId="examination.year" mode="decimal" useGrouping={false} disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="examination.session">Examination Session</label>
                <InputNumber value={allowanceClaim.examination.session} inputId="examination.session" mode="decimal" disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="invigilation.role">Role</label>
                <InputText id="invigilation.role" value={invigilationRoleToLabel[allowanceClaim.invigilation.role]} disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="invigilation.centerCode">Examination Center Code</label>
                <InputText id="invigilation.centerCode" value={allowanceClaim.invigilation.centerCode} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilation.morningSessions">Morning Sessions</label>
                <InputNumber value={allowanceClaim.invigilation.morningSessions} inputId="invigilation.morningSessions" mode="decimal" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilation.afternoonSessions">Afternoon Sessions</label>
                <InputNumber value={allowanceClaim.invigilation.afternoonSessions} inputId="invigilation.afternoonSessions" mode="decimal" disabled />
            </div>
        </div>
    );
};

export default CompetencyAllowanceClaimDetail;
