import ModalsLayout from "@components/ModalsLayout";
import { useMyProfile } from "@provider/userProvider";
import fetchUser from "@utils/fetch/users";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const EditMainUser = (
    { onClose }: { onClose: () => void }
) => {
    const { profile: dataProfile, setProfile: setNewProfile } = useMyProfile()
    const [profile, setProfile] = useState(dataProfile)
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => {
            if (prev) {
                return {
                    ...prev,
                    [name]: value
                }
            }
            return prev
        })
    }
    return (
        <ModalsLayout
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setLoading={setIsLoading}
            isLoading={isLoading}
            profile={profile}
            saveChange={fetchUser.saveChange}
            setNewProfile={setNewProfile}
            children={
                <>

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Change User Data</h2>
                        <button className="text-xl" type="button" onClick={onClose}>
                            <IoMdClose size={30} />
                        </button>
                    </div>

                    <p className="text-sm text-gray-500 mb-6 text-wrap">
                        These are your main data as <span className="font-bold italic">User</span>.
                        Some of it are used for authentication and other important features.
                        Please make sure to enter the correct email.
                    </p>

                    <div className="flex flex-col mt-4 w-full">
                        <label htmlFor="username" className="font-medium mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={profile?.username || ""}
                            onChange={handleChange}
                            className="py-2 px-4 text-sm border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex flex-col mt-4 w-full">
                        <label htmlFor="email" className="font-medium mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile?.email || ""}
                            onChange={handleChange}
                            className="py-2 px-4 text-sm border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </>
            }
        />
    )
};

export default EditMainUser;
