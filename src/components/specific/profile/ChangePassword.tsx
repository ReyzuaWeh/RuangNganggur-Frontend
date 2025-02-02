import { useMyProfile } from '@/components/provider/userProvider';
import ValidationComponents from '@components/ValidationError';
import { ErrorValidation, ForgetPasswordForm } from '@dataType/fetch';
import { RoleType } from '@dataType/khusus';
import fetchUser from '@utils/fetch/users';
import swalError from '@utils/swal/error';
import swalSuccess from '@utils/swal/success';
import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
    const { profile } = useMyProfile()
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorValidation | null>(null);
    const [passwordForm, setPasswordForm] = useState<ForgetPasswordForm>({
        username: profile?.username || "",
        email: profile?.email || "",
        role: profile?.role || RoleType.jobseeker,
        new_password: "",
        confirm_password: ""
    });
    const [visibility, setVisibility] = useState({
        new_password: false,
        confirm_password: false,
    });

    const handleChangePasswordForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };
    const togglePasswordVisibility = (field: keyof typeof visibility) => {
        setVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };
    useEffect(() => {
        setIsVisible(true);
    }, []);


    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 w-full flex justify-end items-right">
            <div
                className={`bg-white  min-w-[40%] p-6 py-12 rounded-lg rounded-tr-[0] rounded-br-[0] max-w-md transform transition-transform duration-300 
                    ${isVisible ? "translate-x-0" : "translate-x-full"}`
                }
            >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    console.log(passwordForm)
                    fetchUser.changepass(passwordForm).then(() => {
                        setError(null)
                        swalSuccess({
                            title: "Password Changed!",
                            message: "Your password has been successfully changed."
                        })
                    }).catch(async error => {
                        swalError(error.status, "Wrong Change Input");
                        if (error.status === 500 || !error.status) return setError(null);
                        const errorData = await error.json();
                        console.error(errorData)
                        setError(errorData);
                    }).finally(() => setLoading(false))
                }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Change Your Password</h2>
                        <button className="text-xl" onClick={onClose} disabled={loading} type="button">
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    {error && <ValidationComponents errorValid={error} />}
                    {/* New Password */}
                    <div className="flex flex-col mt-5 w-full">
                        <label htmlFor="new_password" className="font-medium">
                            Enter New Password
                        </label>
                        <div className="relative">
                            <input
                                id="new_password"
                                name="new_password"
                                value={passwordForm.new_password}
                                onChange={handleChangePasswordForm}
                                type={visibility.new_password ? 'text' : 'password'}
                                className="py-2 px-4 text-sm border-2 border-gray-400 rounded-md w-full"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new_password')}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {visibility.new_password ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col mt-5 w-full">
                        <label htmlFor="confirm_password" className="font-medium">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                value={passwordForm.confirm_password}
                                onChange={handleChangePasswordForm}
                                type={visibility.confirm_password ? 'text' : 'password'}
                                className="py-2 px-4 text-sm border-2 border-gray-400 rounded-md w-full"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm_password')}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                            >
                                {visibility.confirm_password ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-start mt-10">
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm"
                            disabled={loading}
                            type="submit"
                        >
                            {!loading ? "Save" : "Saving..."}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
