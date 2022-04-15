import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const OtherAllowanceClaimDetail = ({ allowanceClaim }) => {
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
                <InputText id="bankAccount.accountNumber" value={allowanceClaim.examination.name} disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="examination.year">Year</label>
                <InputNumber value={allowanceClaim.examination.year} inputId="examination.year" mode="decimal" disabled useGrouping={false} />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="examination.session">Examination Session</label>
                <InputNumber value={allowanceClaim.examination.session} inputId="examination.session" mode="decimal" disabled useGrouping={false} />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="invigilation.centerCode">Examination Center Code</label>
                <InputText id="invigilation.centerCode" value={allowanceClaim.invigilation?.centerCode} disabled />
            </div>
            <div className="col-12 mt-4 mb-1">
                <h5>Expenses Information</h5>
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.hotel.days">Hotel (days)</label>
                <InputNumber value={allowanceClaim.expenses.hotel.days} inputId="expenses.hotel.days" mode="decimal" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.hotel.total">Hotel (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.hotel.total} inputId="expenses.hotel.total" mode="currency" currency="MYR" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.lodging.days">Lodging (days)</label>
                <InputNumber value={allowanceClaim.expenses.lodging.days} inputId="expenses.lodging.days" mode="decimal" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.lodging.total">Lodging (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.lodging.total} inputId="expenses.lodging.total" mode="currency" currency="MYR" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.food">Food (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.food} inputId="expenses.food" mode="currency" currency="MYR" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.tolTouchnGo">Toll / Touch'n Go (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.tolTouchnGo} inputId="expenses.tolTouchnGo" mode="currency" currency="MYR" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.publicTransport">Public Transport (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.publicTransport} inputId="expenses.publicTransport" mode="currency" currency="MYR" disabled />
            </div>
            <div className="field col-12 md:col-6">
                <label htmlFor="expenses.parking">Parking (MYR)</label>
                <InputNumber value={allowanceClaim.expenses.parking} inputId="expenses.parking" mode="currency" currency="MYR" disabled />
            </div>
        </div>
    );
};

export default OtherAllowanceClaimDetail;
