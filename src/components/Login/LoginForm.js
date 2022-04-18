import React, { useRef, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";

import useAuth from "../../CustomHooks/useAuth";

const LoginForm = () => {
    const toastRef = useRef(null);
    const { signIn, error } = useAuth();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
    });

    useEffect(() => {
        if (error) toastRef.current.show({ severity: "error", summary: error.message, detail: error.detail });
    }, [error]);

    return (
        <div className="col-12">
            <Toast ref={toastRef} />
            <form
                onSubmit={handleSubmit((data) => {
                    const { login, password } = data;
                    signIn(login, password);
                })}
            >
                <div className="p-fluid formgrid grid">
                    <div className="col-12 mb-4">
                        <h5>Login</h5>
                    </div>
                    <div className="field col-12">
                        <label htmlFor="login">Username</label>
                        <Controller
                            name="login"
                            control={control}
                            rules={{ required: "Username is required" }}
                            render={({ field, fieldState }) => <InputText id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} />}
                        />
                        {errors?.login && <small className="p-error">{errors.login}</small>}
                    </div>

                    <div className="field col-12">
                        <label htmlFor="password">Password</label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field, fieldState }) => <Password id={field.name} {...field} className={`${fieldState.invalid && "p-invalid"}`} feedback={false} toggleMask />}
                        />
                        {errors?.password && <small className="p-error">{errors.password}</small>}
                    </div>
                    <div className=" my-2 ml-2">
                        <Button label="Submit" type="submit"></Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
