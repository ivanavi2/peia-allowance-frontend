import React, { useState, useRef, useCallback } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { AutoComplete } from "primereact/autocomplete";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useMutation } from "react-query";

import fetchDistance from "../../utils/fetchDistance";
import AllowanceClaimService from "../../service/AllowanceClaimService";
import handleAttachmentUpload from "../../utils/handleAttachmentUpload";

const examinationNameOptions = [
    { label: "Sijil Pelajaran Malaysia (SPM)", value: "spm" },
    { label: "Sijil Tinggi Persekolahan Malaysia (STPM)", value: "stpm" },
    { label: "Malaysian University English Test (MUET)", value: "muet" },
];
const classOfClaimOptions = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
];
const vehicleTypeOptions = [
    { label: "Car", value: "car" },
    { label: "Motorcycle", value: "motorcycle" },
];

const formDefaultValues = {
    allowanceType: "travel",
    invigilator: {
        name: "Ivan",
        icNumber: "980225075123",
        phoneNumber: "0164912966",
        baseSalary: 1500,
        address: "Blok 2, 10-7, Tingkat Paya Terubong 2, 11050, Pulau Pinang",
    },
    bankAccount: {
        name: "test",
        accountNumber: "709231",
    },
    examination: {
        name: "spm",
        session: 2,
        year: 2004,
    },
    invigilation: {
        centerCode: "abcd1001",
    },
    vehicle: {
        type: "car",
        model: "perodua bezza",
        registrationNumber: "15250B",
        engineCapacity: 0,
        classOfClaim: "A",
    },
    homeAddress: {
        address: "",
        placeId: "",
    },
    schoolAddress: {
        address: "",
        placeId: "",
    },
    examinationVaultAddress: {
        address: "",
        placeId: "",
    },
    invigilationCenterAddress: {
        address: "",
        placeId: "",
    },
    totalAllowance: 0.0,
    distanceBetweenHomeAndInvigilationCenter: 0,
    distanceBetweenHomeAndExaminationVault: 0,
    distanceBetweenSchoolAndInvigilationCenter: 0,
    distanceBetweenSchoolAndExaminationVault: 0,
};

const CompetencyAllowanceForm = () => {
    const [displayCalculationModal, setDisplayCalculationModal] = useState(false);
    const fileUploadRef = useRef(null);
    const toastRef = useRef(null);
    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        setValue,
        watch,
    } = useForm({
        defaultValues: formDefaultValues,
    });

    const { mutate } = useMutation(AllowanceClaimService.addAllowanceClaim, {
        onSuccess: (data) => {
            console.log("onsucessdata", data);
            /** To add invalidate query */
        },
        onError: (error) => {
            console.log("onerror", error.response);
            if (error.response) toastRef.current.show({ severity: "error", summary: error.response.data?.message });
        },
    });

    /* Listen for changes for the following fields to calculate total eligible allowance based on the values from these fields */
    const [
        watchedVehicleType,
        watchedDistanceBetweenHomeAndInvigilationCenter,
        watchedDistanceBetweenHomeAndExaminationVault,
        watchedDistanceBetweenSchoolAndInvigilationCenter,
        watchedDistanceBetweenSchoolAndExaminationVault,
    ] = watch([
        "vehicle.type",
        "distanceBetweenHomeAndInvigilationCenter",
        "distanceBetweenHomeAndExaminationVault",
        "distanceBetweenSchoolAndInvigilationCenter",
        "distanceBetweenSchoolAndExaminationVault",
    ]);

    const {
        suggestions: { status, data },
        setValue: setPlacesAutocompleteValue,
    } = usePlacesAutocomplete({
        requestOptions: {
            componentRestrictions: { country: "my" },
        },
        debounce: 500,
    });

    const calculateTotalEligibleAllowance = () => {
        const baseRateMultiplier = {
            car: 0.3,
            motorcycle: 0.15,
        };
        /* totalEligibleAllowance = 
            30days * Distance between home and invigilation center * Vehicle base rate multipler per km
            + (RM100 base + RM50 additional * distance between home and examination vault)
            + (RM100 base + RM50 additional * (distance between school and inivigilation center + distance between school and examination vault))
         */
        return (
            30 * watchedDistanceBetweenHomeAndInvigilationCenter * baseRateMultiplier[watchedVehicleType] +
            (50 + 10 * watchedDistanceBetweenHomeAndExaminationVault) +
            (50 + 10 * (watchedDistanceBetweenSchoolAndInvigilationCenter + watchedDistanceBetweenSchoolAndExaminationVault))
        );
    };

    const getAutocompleteSuggestions = () => {
        return (
            status === "OK" &&
            data.map((suggestion) => {
                return {
                    description: suggestion.description,
                    placeId: suggestion.place_id,
                };
            })
        );
    };

    const isAddressPlaceIdExist = (field) => {
        const placeId = getValues(field);
        return placeId !== "" || "Please select a valid address from the dropdown";
    };

    const onAutocompleteFieldChange = (fieldName, event) => {
        setValue(fieldName, event.target.value);
        setPlacesAutocompleteValue(event.target.value);
    };

    const onAutoCompleteFieldSelect = async (fieldName, event) => {
        const parentField = fieldName.split(".")[0];
        setValue(fieldName, event.value.description);
        setValue(`${parentField}.placeId`, event.value.placeId);
        setPlacesAutocompleteValue(event.value.description, false);
        const placesId = getValues(["homeAddress.placeId", "schoolAddress.placeId", "invigilationCenterAddress.placeId", "examinationVaultAddress.placeId"]);
        const results = await fetchDistance(placesId, fieldName);
        results.forEach((result) => {
            setValue(result.setDistanceFieldName, parseFloat(result.distance));
        });
    };

    const onUpload = useCallback(
        async (event) => {
            try {
                const { files } = event;
                const formData = getValues();

                console.log(formData);

                const uploadAttachmentsResponse = await handleAttachmentUpload(files);
                console.log("uploadattachmentresponse", uploadAttachmentsResponse);

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
                    <div className="field col-12 md:col-6">
                        <label htmlFor="examination.session">Examination Session</label>
                        <Controller
                            name="examination.session"
                            control={control}
                            rules={{ required: "Examination session is required" }}
                            render={({ field, fieldState }) => (
                                <InputNumber {...field} inputId={field.name} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e.value)} />
                            )}
                        />
                        {errors?.examination?.session && <small className="p-error">{errors.examination.session.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="invigilation.centerCode">Examination Center Code</label>
                        <Controller
                            name="invigilation.centerCode"
                            control={control}
                            rules={{ required: "Invigilation center code is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.invigilation?.centerCode && <small className="p-error">{errors.invigilation.centerCode.message}</small>}
                    </div>
                    <div className="col-12 mt-4 mb-1">
                        <h5>Vehicle Information</h5>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="vehicle.type">Vehicle Type</label>
                        <Controller
                            name="vehicle.type"
                            control={control}
                            rules={{ required: "Vehicle type is required" }}
                            render={({ field, fieldState }) => <Dropdown id={field.name} {...field} options={vehicleTypeOptions} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.vehicle?.type && <small className="p-error">{errors.vehicle.type.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="vehicle.model">Vehicle Model</label>
                        <Controller
                            name="vehicle.model"
                            control={control}
                            rules={{ required: "Vehicle model is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.vehicle?.model && <small className="p-error">{errors.vehicle.model.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="vehicle.registrationNumber">Registration Number</label>
                        <Controller
                            name="vehicle.registrationNumber"
                            control={control}
                            rules={{ required: "Vehicle registration number is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.vehicle?.registrationNumber && <small className="p-error">{errors.vehicle.registrationNumber.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="vehicle.engineCapacity">Engine Capacity</label>
                        <Controller
                            name="vehicle.engineCapacity"
                            control={control}
                            rules={{ required: "Vehicle engine capacity is required", min: { value: 0, message: "Must be greater than 0" } }}
                            render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} tooltip="eg: 1500 (cc)" onChange={(e) => field.onChange(e.value)} />
                            )}
                        />
                        {errors?.vehicle?.engineCapacity && <small className="p-error">{errors.vehicle.engineCapacity.message}</small>}
                    </div>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="vehicle.classOfClaim">Class of Claim</label>
                        <Controller
                            name="vehicle.classOfClaim"
                            control={control}
                            rules={{ required: "Vehicle registration number is required" }}
                            render={({ field, fieldState }) => <Dropdown id={field.name} {...field} options={classOfClaimOptions} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.vehicle?.classOfClaim && <small className="p-error">{errors.vehicle.classOfClaim.message}</small>}
                    </div>
                    <div className="col-12 mt-4 mb-1">
                        <h5>Travel Information</h5>
                    </div>
                    <div className="field col-12">
                        <label htmlFor="homeAddress.address">Home Address</label>
                        <Controller
                            name="homeAddress.address"
                            control={control}
                            rules={{
                                required: "Home address is required",
                                validate: {
                                    validAddress: (_) => isAddressPlaceIdExist("homeAddress.placeId"),
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <AutoComplete
                                    id={field.name}
                                    {...field}
                                    field="description"
                                    suggestions={getAutocompleteSuggestions()}
                                    onSelect={(e) => onAutoCompleteFieldSelect(field.name, e)}
                                    completeMethod={() => {}}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => onAutocompleteFieldChange(field.name, e)}
                                />
                            )}
                        />
                        {errors?.homeAddress?.address && <small className="p-error">{errors.homeAddress.address.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="schoolAddress.address">School Address</label>
                        <Controller
                            name="schoolAddress.address"
                            control={control}
                            rules={{
                                required: "School address is required",
                                validate: {
                                    validAddress: (_) => isAddressPlaceIdExist("schoolAddress.placeId"),
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <AutoComplete
                                    id={field.name}
                                    {...field}
                                    field="description"
                                    suggestions={getAutocompleteSuggestions()}
                                    onSelect={(e) => onAutoCompleteFieldSelect(field.name, e)}
                                    completeMethod={() => {}}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => onAutocompleteFieldChange(field.name, e)}
                                />
                            )}
                        />
                        {errors?.schoolAddress?.address && <small className="p-error">{errors.schoolAddress.address.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="invigilationCenterAddress.address">Invigilation Center Address</label>
                        <Controller
                            name="invigilationCenterAddress.address"
                            control={control}
                            rules={{
                                required: "Invigilation center address is required",
                                validate: {
                                    validAddress: (_) => isAddressPlaceIdExist("invigilationCenterAddress.placeId"),
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <AutoComplete
                                    id={field.name}
                                    {...field}
                                    field="description"
                                    suggestions={getAutocompleteSuggestions()}
                                    onSelect={(e) => onAutoCompleteFieldSelect(field.name, e)}
                                    completeMethod={() => {}}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => onAutocompleteFieldChange(field.name, e)}
                                />
                            )}
                        />
                        {errors?.invigilationCenterAddress?.address && <small className="p-error">{errors.invigilationCenterAddress.address.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="examinationVaultAddress.address">Examination Vault Address</label>
                        <Controller
                            name="examinationVaultAddress.address"
                            control={control}
                            rules={{
                                required: "Examination vault address is required",
                                validate: {
                                    validAddress: (_) => isAddressPlaceIdExist("examinationVault.placeId"),
                                },
                            }}
                            render={({ field, fieldState }) => (
                                <AutoComplete
                                    id={field.name}
                                    {...field}
                                    field="description"
                                    suggestions={getAutocompleteSuggestions()}
                                    onSelect={(e) => onAutoCompleteFieldSelect(field.name, e)}
                                    completeMethod={() => {}}
                                    className={`${fieldState.invalid && "p-invalid"}`}
                                    onChange={(e) => onAutocompleteFieldChange(field.name, e)}
                                />
                            )}
                        />
                        {errors?.examinationVaultAddress?.address && <small className="p-error">{errors.examinationVaultAddress.address.message}</small>}
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="distanceBetweenHomeAndInvigilationCenter">Distance Between Home and Invigilation Center</label>
                        <Controller
                            name="distanceBetweenHomeAndInvigilationCenter"
                            control={control}
                            rules={{ min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e)} suffix="km" disabled />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="distanceBetweenHomeAndExaminationVault">Distance Between Home and Examination Vault</label>
                        <Controller
                            name="distanceBetweenHomeAndExaminationVault"
                            control={control}
                            rules={{ min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e)} suffix="km" disabled />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="distanceBetweenHomeAndExaminationVault">Distance Between School and Invigilation Center</label>
                        <Controller
                            name="distanceBetweenSchoolAndInvigilationCenter"
                            control={control}
                            rules={{ min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e)} suffix="km" disabled />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="distanceBetweenHomeAndExaminationVault">Distance Between School and Examination Vault</label>
                        <Controller
                            name="distanceBetweenSchoolAndExaminationVault"
                            control={control}
                            rules={{ min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber inputId={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} onChange={(e) => field.onChange(e)} suffix="km" disabled />
                            )}
                        />
                    </div>
                    <div className="field col-12 xl:col-10">
                        <label htmlFor="totalAllowance">Total Eligible Allowance</label>
                        <Controller
                            name="totalAllowance"
                            control={control}
                            rules={{ required: "Total eligible allowance is required", min: 0 }}
                            render={({ field, fieldState }) => (
                                <InputNumber
                                    {...field}
                                    disabled
                                    value={calculateTotalEligibleAllowance()}
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
                    <div className="col-12 xl:col-2 xl:pt-4 pb-4 xl:pb-0">
                        <Button label="Show calculation" icon="pi pi-external-link" onClick={() => setDisplayCalculationModal(true)} />
                        <Dialog header="How total eligible travel allowance is calculated" visible={displayCalculationModal} style={{ width: "50vw" }} onHide={() => setDisplayCalculationModal(false)}>
                            <p>Total eligible allowance = 30 days * Distance between home and invigilation center * Vehicle base rate multipler per km</p>
                            <p>+ RM50 base + (RM10 additional * distance between home and examination vault)</p>
                            <p>+ RM50 base + (RM10 additional * (distance between school and inivigilation center + distance between school and examination vault))</p>
                        </Dialog>
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
