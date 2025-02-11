import AuthLayout from "@components/AuthLayout";
import ValidationComponents from "@components/ValidationError";
import { ErrorValidation, ForgetPasswordForm } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgetPassword = () => {
    const [error, setError] = useState<ErrorValidation | null>(null);
    const [visibility, setVisibility] = useState({
        new_password: false,
        confirm_password: false,
    });
    const [dataForget, setDataForget] = useState<ForgetPasswordForm>({
        username: "",
        email: "",
        role: RoleType.jobseeker,
        new_password: "",
        confirm_password: ""
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchUser.forgetpass(dataForget).then(() => {
            setError(null)
            swalSuccess({ title: "Change Password Successful!", message: "Your password has been changed." })
        }).catch(async (error) => {
            swalError(error.status, "Wrong Change Password Input");
            if (error.status === 500 || !error.status) return setError(null);
            const errorData = await error.json();
            setError(errorData);
        });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDataForget((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const togglePasswordVisibility = (field: keyof typeof visibility) => {
        setVisibility((prevState) => {
            return ({
                ...prevState,
                [field]: !prevState[field],
            })
        });
    };
    return (
        <AuthLayout>
            <div className="flex flex-col justify-center items-center flex-grow px-6">
                <h1 className="font-semibold text-4xl sm:text-5xl md:text-4xl text-accent text-center">
                    <span className="text-accents">Ruang</span>Nganggur.
                </h1>
                <div className="w-full sm:w-3/4 sm:flex-row gap-4 mt-4 bg-white shadow-md">
                    <div className="flex flex-col justify-center p-7">
                        <div className=" flex flex-col mx-auto text-center">
                            <h1 className="font-semibold">Forget Password</h1>
                            <p className="text-sm">Change password by informing these information</p>
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
                                    value={dataForget.username}
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
                                    value={dataForget.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="role" className="font-semibold text-xs">
                                    Your role
                                </label>
                                <select
                                    name="role"
                                    id="role"
                                    value={dataForget.role}
                                    onChange={handleChange}
                                    className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                                >
                                    {Object.entries(RoleType).map(([key, value]) => (
                                        <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value.replace("_", " "))}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="new_password" className="font-semibold text-xs">
                                    New Password
                                </label>
                                <label htmlFor="new_password" className="flex flex-nowrap border outline-none rounded-md px-4 py-2 mt-2">
                                    <input
                                        name="new_password"
                                        id="new_password"
                                        placeholder="Enter new password"
                                        type={visibility.new_password ? "text" : "password"}
                                        className="text-sm w-full"
                                        value={dataForget.new_password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("new_password")}
                                        className=" text-gray-600"
                                    >
                                        {visibility.new_password ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="confirm_password" className="font-semibold text-xs">
                                    Confirm Password
                                </label>
                                <label htmlFor="confirm_password" className="flex flex-nowrap border outline-none rounded-md px-4 py-2 mt-2">
                                    <input
                                        name="confirm_password"
                                        id="confirm_password"
                                        placeholder="Confirm new password"
                                        type={visibility.confirm_password ? "text" : "password"}
                                        className="text-sm w-full"
                                        value={dataForget.confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("confirm_password")}
                                        className=" text-gray-600"
                                    >
                                        {visibility.confirm_password ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </label>
                            </div>
                            <button type="submit" className="btn-primary py-2 px-5 mx-auto rounded">
                                Change Password
                            </button>
                            <div className="flex items-center opacity-50 w-full">
                                <hr className="border w-full" />
                                <p className="text-center text-sm w-full">Continue with</p>
                                <hr className="border w-full" />
                            </div>
                            <div className="flex items-center sm:flex-row flex-col text-sm gap-x-1 mx-auto">
                                <p className="text-center">Remember again?</p>
                                <a
                                    href={OurRoute.DataRoute["Login"]}
                                    className="text-primary underline font-semibold"
                                >
                                    Login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default ForgetPassword
