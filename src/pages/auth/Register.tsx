import AuthSwiper from "@components/AuthSwiper";
import RegisterEmployer from "@components/employer/FormRegister";
import RegisterJobSeeker from "@components/jobseeker/FormRegister";
import NotFound from "@components/NotFound";
import ValidationComponents from "@components/ValidationError";
import { DataOutUser, ErrorValidation } from "@dataType/fetch";
import { EmployerFormInterface, JobSeekerFormInterface } from "@dataType/form";
import { RoleType, useStateEmployerForm, useStateJobSeekerForm, useStateObjectAnyType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";

const Register = () => {
    const { wanna_be } = useParams<{
        wanna_be: RoleType;
    }>();
    const [searchParams] = useSearchParams();
    if (wanna_be === RoleType.admin && !searchParams.get("code")) {
        return <NotFound />
    }
    if (wanna_be === RoleType.admin && searchParams.get("code") !== "SMKN4BDG") {
        return <NotFound />
    }
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState<ErrorValidation | null>(null);
    const [visibility, setVisibility] = useState(false);
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

    const handleChange = functionSets.handleChangeFormObject

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
        fetchUser.register(formDataSend).then(() => {
            setError(null)
            swalSuccess({ title: "Registration Successful!", message: "Your account has been created." })
        }).catch(async (error) => {
            swalError(error.status, "Wrong Register Input");
            if (error.status === 500 || !error.status) return setError(null);
            const errorData = await error.json();
            console.error(errorData)
            setError(errorData);
        });
    };
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey && event.key.toLowerCase() === "s") {
                document.addEventListener("keydown", handleSecondKey);
            }
        };

        const handleSecondKey = (event: KeyboardEvent) => {
            if (!event.key) return;
            if (event.key.toLowerCase() === "m") {
                document.addEventListener("keydown", handleThirdKey);
            }
        };
        const handleThirdKey = (event: KeyboardEvent) => {
            if (!event.key) return;
            if (event.key.toLowerCase() === "k") {
                document.addEventListener("keydown", handleForthKey);
            }
        };
        const handleForthKey = (event: KeyboardEvent) => {
            if (!event.key) return;
            if (event.key.toLowerCase() === "a") {
                document.addEventListener("keydown", handleFifthKey);
            }
        };
        const handleFifthKey = (event: KeyboardEvent) => {
            if (!event.key) return;
            if (event.key.toLowerCase() === "d") {
                setAdmin(true); // Toggle tampilan komponen
            }
            document.removeEventListener("keydown", handleFifthKey);
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keydown", handleSecondKey);
            document.removeEventListener("keydown", handleThirdKey);
            document.removeEventListener("keydown", handleForthKey);
        };
    }, []);

    return wanna_be === RoleType.admin && !admin ? <NotFound /> : (
        <section className="bg-gradient flex flex-col items-center min-h-screen lg:flex-row w-full h-fit">
            <div className="hidden lg:flex flex-grow h-full w-full lg:w-1/2 py-10 px-16">
                <AuthSwiper />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
                <div className="flex flex-col justify-center h-screen lg:h-fit items-center flex-grow px-6">
                    <div className="w-full sm:w-3/4 sm:flex-row gap-4 my-3 bg-white shadow-md">
                        <div className="flex flex-col justify-center p-7">
                            <div className=" flex flex-col mx-auto text-center">

                                <h1 className="font-semibold">Create An Account</h1>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-y-4 justify-start mt-6"
                            >
                                {error && <ValidationComponents errorValid={error} />}
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
                                        onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="font-semibold text-xs">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <label htmlFor="password" className="flex flex-nowrap border outline-none rounded-md px-4 py-2 mt-2">
                                        <input
                                            name="password"
                                            id={visibility ? "text" : "password"}
                                            className="text-sm w-full"
                                            placeholder="Enter Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setVisibility(!visibility)}
                                            className="w-fit text-gray-600"
                                        >
                                            {visibility ? <FaEye /> : <FaEyeSlash />}
                                        </button>
                                    </label>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="font-semibold text-xs">
                                        Email <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        name="email"
                                        id="email"
                                        placeholder="Enter Email"
                                        type="email"
                                        className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                                        value={formData.email as string || ""}
                                        onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                                        required
                                    />
                                </div>
                                {
                                    (wanna_be === RoleType.jobseeker) && (<RegisterJobSeeker
                                        handleChange={handleChange}
                                        formData={formData as JobSeekerFormInterface}
                                        setFormData={setFormData as useStateJobSeekerForm}
                                    />)
                                }
                                {
                                    (wanna_be === RoleType.employer) && (<RegisterEmployer
                                        handleChange={handleChange}
                                        formData={formData as EmployerFormInterface}
                                        setFormData={setFormData as useStateEmployerForm}
                                    />)
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
    );
};

export default Register;
