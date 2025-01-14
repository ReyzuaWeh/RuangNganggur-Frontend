import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-right">
            <div
                className={`bg-white p-6 py-12 rounded-lg max-w-md transform transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Change Email</h2>
                    <button className="text-xl" onClick={onClose}>
                        <IoMdClose size={30} />
                    </button>
                </div>

                <p>
                    Enter your current password and confirm your new password to continue changing the password.
                </p>

                {/* Current Password */}
                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="currentPassword" className="font-medium">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            id="currentPassword"
                            type={passwordVisibility.currentPassword ? 'text' : 'password'}
                            className="py-2 px-4 text-sm border-2 border-gray-400 rounded-md w-full"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('currentPassword')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            {passwordVisibility.currentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="newPassword" className="font-medium">
                        Enter New Password
                    </label>
                    <div className="relative">
                        <input
                            id="newPassword"
                            type={passwordVisibility.newPassword ? 'text' : 'password'}
                            className="py-2 px-4 text-sm border-2 border-gray-400 rounded-md w-full"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('newPassword')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            {passwordVisibility.newPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col mt-5 w-full">
                    <label htmlFor="confirmPassword" className="font-medium">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                            className="py-2 px-4 text-sm border-2 border-gray-400 rounded-md w-full"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            {passwordVisibility.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="flex justify-start mt-10">
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
