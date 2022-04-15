import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const examinationNameToLabel = {
    spm: "Sijil Pelajaran Malaysia (SPM)",
    stpm: "Sijil Tinggi Persekolahan Malaysia (STPM)",
    muet: "Malaysian University English Test (MUET)",
};

const TravelAllowanceClaimDetail = ({ allowanceClaim }) => {
    return (
        <div className="p-fluid formgrid grid custom-scrollbar">
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
            <div className="field col-12 md:col-6">
                <label htmlFor="examination.session">Examination Session</label>
                <InputNumber value={allowanceClaim.examination.session} inputId="examination.session" mode="decimal" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilation.centerCode">Examination Center Code</label>
                <InputText id="invigilation.centerCode" value={allowanceClaim.invigilation?.centerCode} disabled />
            </div>
            <div className="col-12 mt-4 mb-1">
                <h5>Vehicle Information</h5>
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="vehicle.vehicleType">Vehicle Type</label>
                <InputText id="vehicle.vehicleType" value={allowanceClaim.vehicle.vehicleType} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="vehicle.model">Vehicle Model</label>
                <InputText id="vehicle.model" value={allowanceClaim.vehicle.model} disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="vehicle.registrationNumber">Registration Number</label>
                <InputText id="vehicle.registrationNumber" value={allowanceClaim.vehicle.registrationNumber} disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="vehicle.engineCapacity">Engine Capacity</label>
                <InputNumber inputId="vehicle.engineCapacity" tooltip="eg: 1500 (cc)" value={allowanceClaim.vehicle.engineCapacity} disabled />
            </div>
            <div className="field col-12 md:col-4">
                <label htmlFor="vehicle.classOfClaim">Class of Claim</label>
                <InputText id="vehicle.classOfClaim" value={allowanceClaim.vehicle.classOfClaim} disabled />
            </div>
            <div className="col-12 mt-4 mb-1">
                <h5>Travel Information</h5>
            </div>
            <div className="field col-12">
                <label htmlFor="homeAddress.address">Home Address</label>
                <InputText id="homeAddress.address" value={allowanceClaim.homeAddress.address} disabled />
            </div>
            <div className="field col-12">
                <label htmlFor="schoolAddress.address">School Address</label>
                <InputText id="schoolAddress.address" value={allowanceClaim.schoolAddress.address} disabled />
            </div>
            <div className="field col-12">
                <label htmlFor="invigilationCenterAddress.address">Invigilation Center Address</label>
                <InputText id="invigilationCenterAddress.address" value={allowanceClaim.invigilationCenterAddress.address} disabled />
            </div>
            <div className="field col-12">
                <label htmlFor="examinationVaultAddress.address">Examination Vault Address</label>
                <InputText id="examinationVaultAddress.address" value={allowanceClaim.examinationVaultAddress.address} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="distanceBetweenHomeAndInvigilationCenter">Distance Between Home and Invigilation Center</label>
                <InputNumber inputId="distanceBetweenHomeAndInvigilationCenter" value={allowanceClaim.distanceBetweenHomeAndInvigilationCenter} suffix=" km" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="distanceBetweenHomeAndExaminationVault">Distance Between Home and Examination Vault</label>
                <InputNumber inputId="distanceBetweenHomeAndExaminationVault" value={allowanceClaim.distanceBetweenHomeAndExaminationVault} suffix=" km" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="distanceBetweenSchoolAndInvigilationCenter">Distance Between School and Invigilation Center</label>
                <InputNumber inputId="distanceBetweenSchoolAndInvigilationCenter" value={allowanceClaim.distanceBetweenSchoolAndInvigilationCenter} suffix=" km" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="distanceBetweenSchoolAndExaminationVault">Distance Between School and Examination Vault</label>
                <InputNumber inputId="distanceBetweenSchoolAndExaminationVault" value={allowanceClaim.distanceBetweenSchoolAndExaminationVault} suffix=" km" disabled />
            </div>
        </div>
    );
};

export default TravelAllowanceClaimDetail;
