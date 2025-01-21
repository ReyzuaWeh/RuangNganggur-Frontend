import OurRoute from "@/utils/route";
import AuthSwiper from "@components/AuthSwiper";
import ValidationComponents from '@components/ValidationError';
import { ErrorValidation, LoginInterface } from '@dataType/fetch';
import fetchUser from '@utils/fetch/users';
import swalError from '@utils/swal/error';
import swalSuccess from '@utils/swal/success';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [formData, setFormData] = useState<LoginInterface>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<ErrorValidation | null>(null);
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
        <>

            <section className="bg-gradient flex flex-col lg:flex-row w-full h-screen">
                <div className=" lg:block h-full w-full lg:w-1/2 p-16">
                    <AuthSwiper />
                </div>

                <div className="w-full lg:w-1/2 h-[85vh] flex flex-col">
                    <div className="flex flex-col justify-center items-center flex-grow px-6">
                        <h1 className="font-semibold text-4xl sm:text-5xl md:text-4xl text-accent text-center">
                            <span className="text-accents">Ruang</span>Nganggur.
                        </h1>
                        <div className="w-full sm:w-3/4 sm:flex-row gap-4 mt-10 bg-white shadow-md">
                            <div className="flex flex-col justify-center p-7">
                                <div className=" flex flex-col mx-auto text-center">
                                    <h1 className="font-semibold">Welcome Back!</h1>
                                    <p className="text-sm">Login to continue Ruang Nganggur</p>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-y-4 justify-start mt-6"
                                >
                                    <div className="flex flex-col">
                                        {error && <ValidationComponents errorValid={error} />}
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
                                        <input
                                            name="password"
                                            id="password"
                                            placeholder="Enter Password"
                                            type="password"
                                            className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember" className="ml-1 font-semibold">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button type="submit" className="btn-primary py-2 px-5">
                                        Login
                                    </button>
                                    <div className="flex items-center opacity-50 w-full">
                                        <hr className="border w-full" />
                                        <p className="text-center text-sm w-full">Continue with</p>
                                        <hr className="border w-full" />
                                    </div>
                                    <div className="flex items-center text-sm gap-x-1 mx-auto">
                                        <p>Don’t have an account?</p>
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
                </div>
            </section>
        </>
    );
};

export default LoginComponent;
