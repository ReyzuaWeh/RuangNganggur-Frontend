import { EmployerFormInterface, JobSeekerFormInterface } from "@/dataType/form";
import AuthSwiper from "@components/AuthSwiper";
import RegisterJobSeeker from "@components/jobseeker/FormRegister";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const { wanna_be } = useParams<{
        wanna_be: RoleType;
    }>();
    const [formData, setFormData] = useState<EmployerFormInterface & JobSeekerFormInterface>({
        email: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        role: wanna_be as RoleType,
        nis: "",
        company_name: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const role = wanna_be as RoleType;
        const formDataSend: DataOutUser = {
            username: formData.username,
            password: formData.password,
            email: formData.email || null,
            role,
            registered_at: new Date(),
            disabled: false,
            jobseeker: null,
            employer: null,
        };

        if (role === RoleType.jobseeker) {
            formDataSend.jobseeker = {
                first_name: formData.first_name,
                last_name: formData.last_name || null,
                nis: formData.nis
            };
        } else if (role === RoleType.employer) {
            formDataSend.employer = {
                company_name: formData.company_name
            };
        }

        try {
            const response = await fetch("http://localhost:8000/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataSend),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: "Your account has been created.",
                });
            } else {
                const error = await response.json();
                console.error("Error:", error);
                const errorMessage = error.detail
                    .map((err: { loc: any[]; msg: any; }) => `${err.loc[1]}: ${err.msg}`)
                    .join("\n");
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: errorMessage,
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Failed to connect to server.",
            });
        }
    };

    return (
        <>
            <section className="bg-gradient flex flex-col lg:flex-row w-full h-screen">
                <div className="hidden lg:block h-[95vh] w-full lg:w-1/2 p-16">
                    <AuthSwiper />
                </div>

                <div className="w-full lg:w-1/2 h-[85vh] flex flex-col">
                    <div className="flex flex-col justify-center items-center flex-grow px-6">
                        <div className="w-full sm:w-3/4 sm:flex-row gap-4 mt-10 bg-white shadow-md">
                            <div className="flex flex-col justify-center p-7">
                                <div className=" flex flex-col mx-auto text-center">

                                    <h1 className="font-semibold">Create An Account</h1>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-y-4 justify-start mt-6"
                                >
                                    <div className="flex flex-col">
                                        <label htmlFor="username" className="font-semibold text-xs">
                                            Username <span className="text-red-600">*</span>
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
                                            Password <span className="text-red-600">*</span>
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
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="font-semibold text-xs">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            placeholder="Enter Email"
                                            type="email"
                                            className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                                            value={formData.email as string || ""}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {
                                        (wanna_be === RoleType.jobseeker) ?
                                            <RegisterJobSeeker handleChange={handleChange}
                                                formData={formData as JobSeekerFormInterface} /> :
                                            null
                                    }
                                    <button type="submit" className="btn-primary py-2 px-5">
                                        Register
                                    </button>
                                    <div className="flex items-center opacity-50 w-full">
                                        <hr className="border w-full" />
                                        <p className="text-center text-sm w-full">Continue with</p>
                                        <hr className="border w-full" />
                                    </div>
                                    <div className="flex items-center text-sm gap-x-1 mx-auto">
                                        <p>Already have an account?</p>
                                        <a
                                            href="/auth/login"
                                            className="text-primary underline font-semibold"
                                        >
                                            Login
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

export default Register;
