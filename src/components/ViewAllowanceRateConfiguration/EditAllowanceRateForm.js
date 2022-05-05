import React, { useRef, useCallback, useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useMutation, useQueryClient } from "react-query";

import AllowanceRateService from "../../service/AllowanceRateService";

const EditAllowanceRateForm = ({ allowanceRate, allowanceType, setDisplayModal }) => {
    const toastRef = useRef(null);
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            allowanceType,
            ...allowanceRate,
        },
    });
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(AllowanceRateService.editAllowanceRateByCode, {
        onSuccess: (data) => {
            console.log("onsucessdata", data);
            console.log(allowanceType);
            toastRef.current.show({ life: 1500, severity: "success", summary: "Submit success!", detail: "Allowance rate is successfully edited" });
            queryClient.invalidateQueries(["allowanceRate", allowanceType]);
            /** To optimize/improve invalidate query */
        },
        onError: (error) => {
            console.log("onerror", error.response);
            if (error.response) toastRef.current.show({ severity: "error", summary: error.response.data?.message });
        },
    });

    return (
        <div className="col-12">
            <Toast
                ref={toastRef}
                onHide={() => {
                    setDisplayModal(false);
                }}
            />
            <form
                onSubmit={handleSubmit(({ allowanceType, code, rate }) => {
                    /* Handle image upload and form submit in fileUpload.upload method
                       since unable to return upload results from the fileUpload.upload method
                     */
                    console.log({ allowanceType, code, rate });
                    mutate({ allowanceType, code, rate });
                })}
            >
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="code">Code</label>
                        <Controller
                            name="code"
                            control={control}
                            rules={{
                                required: "Code is required",
                            }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} disabled />}
                        />
                        {errors?.code && <small className="p-error">{errors.code.message}</small>}
                    </div>
                    <div className="field col-12">
                        <label htmlFor="rate">Rate</label>
                        <Controller
                            name="rate"
                            control={control}
                            rules={{
                                required: "Rate is required",
                                validate: {
                                    isValidIntegerOrDouble: (v) => !isNaN(v) || (!isNaN(v) && v.toString().indexOf(".") !== -1) || "Please enter a valid rate",
                                },
                            }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.rate && <small className="p-error">{errors.rate.message}</small>}
                    </div>

                    <div className="md:col-3 my-2 ml-2 md:ml-0">
                        <Button label="Submit" type="submit" loading={isLoading}></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditAllowanceRateForm;
