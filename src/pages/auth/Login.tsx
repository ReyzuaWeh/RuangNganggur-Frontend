import images_source from "@/assets/get/images";
import AuthLayout from "@components/AuthLayout";
import ValidationComponents from '@components/ValidationError';
import { ErrorValidation, LoginInterface } from '@dataType/fetch';
import fetchUser from '@utils/fetch/users';
import OurRoute from "@utils/route";
import swalError from '@utils/swal/error';
import swalSuccess from '@utils/swal/success';
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [formData, setFormData] = useState<LoginInterface>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<ErrorValidation | null>(null);
    const [visibility, setVisibility] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: LoginInterface) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchUser.login(formData).then((value) => {
            localStorage.setItem("access_token", value.access_token);
            if (remember) {
                localStorage.setItem("refresh_token", value.refresh_token);
            } else {
                localStorage.removeItem("refresh_token");
            }
            swalSuccess({ title: "Login Successful!", message: "Redirecting to your profile..." })
            setTimeout(() => {
                navigate("/auth/success");
            }, 1000);
        }).catch(async (error) => {
            swalError(error.status, "Wrong username/password");
            console.error(error)
            if (error.status === 500 || !error.status) return setError(null);
            const errorData = await error.json();
            setError(errorData);
        })
    };
    return (
        <AuthLayout>
            <div className="flex flex-col justify-center items-center flex-grow px-6">
                <div className="font-semibold text-accent text-center">
                    {/* @ts-ignore */}
                    <img src={images_source["../logo-horizontal.png"].default} className="w-full" />
                </div>
                <div className="w-full sm:w-3/4 sm:flex-row gap-4 bg-white shadow-md">
                    <div className="flex flex-col justify-center p-7">
                        <div className=" flex flex-col mx-auto text-center">
                            <h1 className="font-semibold">Welcome Back!</h1>
                            <p className="text-sm">Login to continue Ruang Nganggur</p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-y-4 justify-start mt-6"
                        >
                            {error && <ValidationComponents errorValid={error} />}
                            <div className="flex flex-col">
                                <label htmlFor="username" className="font-semibold text-xs">
                                    Username
                                </label>
                                <input
                                    name="username"
                                    id="username"
                                    placeholder="Enter Username"
                                    type="text"
                                    className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="font-semibold text-xs">
                                    Password
                                </label>
                                <label htmlFor="password" className="flex flex-nowrap border outline-none rounded-md px-4 py-2 mt-2">
                                    <input
                                        name="password"
                                        id="password"
                                        placeholder="Enter Password"
                                        type={visibility ? "text" : "password"}
                                        className="text-sm w-full"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setVisibility(!visibility)}
                                        className=" text-gray-600"
                                    >
                                        {visibility ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </label>

                            </div>
                            <div className="flex items-center justify-end text-sm">
                                <input
                                    onChange={(e) => setRemember(e.target.checked)}
                                    checked={remember}
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                />
                                <label htmlFor="remember" className="ml-1 font-semibold">
                                    Remember Me
                                </label>
                            </div>
                            <div className="flex flex-col-reverse items-center sm:flex-row justify-between w-full">
                                <a href={OurRoute.DataRoute["Forget Password"]} className="text-primary text-sm text-center sm:text-end font-semibold">
                                    Forget Password?
                                </a>
                                <button type="submit" className="btn-primary py-2 px-5">
                                    Login
                                </button>
                            </div>
                            <div className="flex items-center opacity-50 w-full">
                                <hr className="border w-full" />
                                <p className="text-center text-sm w-full">Continue with</p>
                                <hr className="border w-full" />
                            </div>
                            <div className="flex items-center sm:flex-row flex-col text-sm gap-x-1 mx-auto">
                                <p className="text-center">Don’t have an account?</p>
                                <a
                                    href={OurRoute.DataRoute["Register"]}
                                    className="text-primary underline font-semibold"
                                >
                                    Register
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginComponent;
