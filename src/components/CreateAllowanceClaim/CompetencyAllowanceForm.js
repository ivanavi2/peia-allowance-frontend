import React, { useRef, useCallback } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useMutation, useQueryClient } from "react-query";

import AllowanceClaimService from "../../service/AllowanceClaimService";
import handleAttachmentUpload from "../../utils/handleAttachmentUpload";
import { getCurrentYear } from "../../utils/date";

const examinationNameOptions = [
    { label: "Sijil Pelajaran Malaysia (SPM)", value: "spm" },
    { label: "Sijil Tinggi Persekolahan Malaysia (STPM)", value: "stpm" },
    { label: "Malaysian University English Test (MUET)", value: "muet" },
];
const roleOptions = [
    { label: "Head of Invigilator", value: "headOfInvigilator" },
    { label: "Invigilator", value: "invigilator" },
];

const CompetencyAllowanceForm = ({ user }) => {
    const { teacherName, icNumber, teacherPhoneNumber, salary, homeAddress } = user;
    const formDefaultValues = {
        user: user._id,
        allowanceType: "CompetencyAllowance",
        invigilator: {
            name: teacherName,
            icNumber: icNumber,
            phoneNumber: teacherPhoneNumber,
            baseSalary: parseFloat(salary),
            address: homeAddress,
        },
        bankAccount: {
            name: "",
            accountNumber: "",
        },
        examination: {
            name: "spm",
            session: 1,
            year: getCurrentYear(),
        },
        invigilation: {
            role: "invigilator",
            centerCode: "",
            morningSessions: 0,
            afternoonSessions: 0,
        },
        totalAllowance: 0.0,
        stationeryExpenses: 0,
    };

    const fileUploadRef = useRef(null);
    const toastRef = useRef(null);
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        reset,
    } = useForm({
        defaultValues: formDefaultValues,
    });
    const queryClient = useQueryClient();

    const { mutate } = useMutation(AllowanceClaimService.addAllowanceClaim, {
        onSuccess: (data) => {
            toastRef.current.show({ severity: "success", summary: "Submit success!", detail: "Competency allowance claim is submitted" });
            reset();
            fileUploadRef.current.clear();
            queryClient.invalidateQueries("allowanceClaims");
            /** To optimize/improve invalidate query */
        },
        onError: (error) => {
            console.log("onerror", error.response);
            if (error.response.status === 401) {
                toastRef.current.show({ severity: "error", summary: "Something went wrong!", detail: error.response.data.error.message });
                return;
            }
            toastRef.current.show({ severity: "error", summary: "Something went wrong!", detail: "Please try again later" });
        },
    });

    const calculateTotalEligibleAllowance = () => {
        const baseRatePerSession = {
            morningSession: 20,
            afternoonSession: 30,
        };
        const baseRateByRole = {
            headOfInvigilator: 1.15,
            invigilator: 1.05,
        };
        const [morningSessions, afternoonSessions, invigilationRole] = getValues(["invigilation.morningSessions", "invigilation.afternoonSessions", "invigilation.role"]);
        const allowance = (morningSessions * baseRatePerSession["morningSession"] + afternoonSessions * baseRatePerSession["afternoonSession"]) * baseRateByRole[invigilationRole];
        return allowance;
    };

    const onUpload = useCallback(
        async (event) => {
            try {
                const { files } = event;
                const formData = getValues();

                console.log(formData);

                const uploadAttachmentsResponse = await handleAttachmentUpload(files);

                if (!uploadAttachmentsResponse.status) {
                    toastRef.current.show({ severity: "error", summary: uploadAttachmentsResponse.summary, detail: uploadAttachmentsResponse.detail });
                    return;
                }

                mutate({ formData, attachments: uploadAttachmentsResponse.attachments });
                /* TODO: add api call to add new allowance claim to server */
            } catch (error) {
                if (error.response.status === 401) {
                    toastRef.current.show({ severity: "error", summary: "Something went wrong!", detail: error.response.data.error.message });
                    return;
                }
                toastRef.current.show({ severity: "error", summary: "Something went wrong!", detail: "Please try again later" });
            }
        },
        [getValues, mutate]
    );

    return (
        <div className="col-12">
            <Toast ref={toastRef} />
            <form
                onSubmit={handleSubmit((data) => {
                    /* Handle image upload and form submit in fileUpload.upload method
                       since unable to return upload results from the fileUpload.upload method
                     */
                    fileUploadRef.current.upload();
                })}
            >
                <div className="p-fluid formgrid grid">
                    <div className="col-12 mb-1">
                        <h5>Personal Information</h5>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilator.name">Name</label>
                        <Controller
                            name="invigilator.name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} disabled />}
                        />
                        {errors?.invigilator?.name && <small className="p-error">{errors.invigilator.name.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilator.icNumber">IC Number</label>
                        <Controller
                            name="invigilator.icNumber"
                            control={control}
                            rules={{ required: "IC number is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} disabled />}
                        />
                        {errors?.invigilator?.icNumber && <small className="p-error">{errors.invigilator.icNumber.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilator.phoneNumber">Phone Number</label>
                        <Controller
                            name="invigilator.phoneNumber"
                            control={control}
                            rules={{ required: "Phone number is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} disabled />}
                        />
                        {errors?.invigilator?.phoneNumber && <small className="p-error">{errors.invigilator.phoneNumber.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilator.baseSalary">Base Salary</label>
                        <Controller
                            name="invigilator.baseSalary"
                            control={control}
                            rules={{ required: "Base salary is required", min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber {...field} inputId={field.name} className={`${fieldState.invalid && "p-invalid"}`} mode="currency" currency="MYR" disabled />
                            )}
                        />
                        {errors?.invigilator?.baseSalary && <small className="p-error">{errors.invigilator.baseSalary.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="invigilator.address">Address</label>
                        <Controller
                            name="invigilator.address"
                            control={control}
                            rules={{ required: "Address is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} disabled />}
                        />
                        {errors?.invigilator?.address && <small className="p-error">{errors.invigilator.address.message}</small>}
                    </div>
                    <div className="col-12 mt-4 mb-1">
                        <h5>Bank Account Information</h5>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="bankAccount.name">Bank Name</label>
                        <Controller
                            name="bankAccount.name"
                            control={control}
                            rules={{ required: "Bank name is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.bankAccount?.name && <small className="p-error">{errors.bankAccount.name.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="bankAccount.accountNumber">Account Number</label>
                        <Controller
                            name="bankAccount.accountNumber"
                            control={control}
                            rules={{ required: "Bank account number is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.bankAccount?.accountNumber && <small className="p-error">{errors.bankAccount.accountNumber.message}</small>}
                    </div>
                    <div className="col-12 mt-4 mb-1">
                        <h5>Invigilation Information</h5>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="examination.name">Examination Name</label>
                        <Controller
                            name="examination.name"
                            control={control}
                            rules={{ required: "Examination name is required" }}
                            render={({ field, fieldState }) => <Dropdown id={field.name} {...field} options={examinationNameOptions} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.examination?.name && <small className="p-error">{errors.examination.name.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="examination.year">Year</label>
                        <Controller
                            name="examination.year"
                            control={control}
                            rules={{
                                required: "Examination year is required",
                                min: { value: 2000, message: "Year must be greater than 2000" },
                                max: { value: 2100, message: "Year must be lesser than 2100" },
                            }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    {...field}
                                    value={field.value}
                                    inputId={field.name}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    mode="decimal"
                                    useGrouping={false}
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                        {errors?.examination?.year && <small className="p-error">{errors.examination.year.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="examination.session">Examination Session</label>
                        <Controller
                            name="examination.session"
                            control={control}
                            rules={{ required: "Examination session is required", min: { value: 1, message: "Examination session cannot be 0 or lesser than 0" } }}
                            render={({ field, fieldState }) => (
                                <InputNumber {...field} inputId={field.name} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e.value)} />
                            )}
                        />
                        {errors?.examination?.session && <small className="p-error">{errors.examination.session.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="invigilation.role">Role</label>
                        <Controller
                            name="invigilation.role"
                            control={control}
                            rules={{ required: "Invigilation role is required" }}
                            render={({ field, fieldState }) => (
                                <Dropdown
                                    id={field.name}
                                    {...field}
                                    options={roleOptions}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                        setValue("totalAllowance", calculateTotalEligibleAllowance());
                                    }}
                                />
                            )}
                        />
                        {errors?.invigilation?.role && <small className="p-error">{errors.invigilation.role.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="invigilation.centerCode">Examination Center Code</label>
                        <Controller
                            name="invigilation.centerCode"
                            control={control}
                            rules={{ required: "Invigilation center code is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.invigilation?.centerCode && <small className="p-error">{errors.invigilation.centerCode.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilation.morningSessions">Morning Sessions</label>
                        <Controller
                            name="invigilation.morningSessions"
                            control={control}
                            rules={{ required: "Morning sessions is required", min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    {...field}
                                    inputId={field.name}
                                    tooltip="Total number of morning sessions in duty during the examination period"
                                    tooltipOptions={{ position: "bottom" }}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                        setValue("totalAllowance", calculateTotalEligibleAllowance());
                                    }}
                                />
                            )}
                        />
                        {errors?.invigilation?.morningSessions && <small className="p-error">{errors.invigilation.morningSessions.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilation.afternoonSessions">Afternoon Sessions</label>
                        <Controller
                            name="invigilation.afternoonSessions"
                            control={control}
                            rules={{ required: "Afternoon sessions is required", min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    {...field}
                                    inputId={field.name}
                                    tooltip="Total number of morning sessions in duty during the examination period"
                                    tooltipOptions={{ position: "bottom" }}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                        setValue("totalAllowance", calculateTotalEligibleAllowance());
                                    }}
                                />
                            )}
                        />
                        {errors?.invigilation?.afternoonSessions && <small className="p-error">{errors.invigilation.afternoonSessions.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="totalAllowance">Total Eligible Allowance</label>
                        <Controller
                            name="totalAllowance"
                            control={control}
                            rules={{ required: "Total eligible allowance is required", min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    {...field}
                                    disabled
                                    inputId={field.name}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    mode="currency"
                                    currency="MYR"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                        {errors?.totalAllowance && <small className="p-error">{errors.totalAllowance.message}</small>}
                    </div>

                    <div className="field col-12">
                        <label htmlFor="attachments">Attachments</label>
                        <FileUpload
                            ref={fileUploadRef}
                            name="attachments"
                            customUpload
                            uploadHandler={onUpload}
                            multiple
                            accept=".jpg, .png, .jpeg, .pdf"
                            maxFileSize={1000000}
                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                        />
                        <span className="m-2 font-bold text-sm">*Max 3 files can be uploaded, max file size is 1MB, accepted file types are .jpg, .png, .jpeg and .pdf</span>
                    </div>

                    <div className="md:col-3 my-2 ml-2 md:ml-0">
                        <Button label="Submit" type="submit"></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CompetencyAllowanceForm;
