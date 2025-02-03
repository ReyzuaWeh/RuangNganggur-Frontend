import Loading from "@components/Loading";
import { DataOutUser } from "@dataType/fetch";
import fetchUser from "@utils/fetch/users";
import OurRoute from "@utils/route";
import swalError from "@utils/swal/error";
import React, { createContext, useEffect, useState } from "react";

interface ProfileContextType {
    profile: DataOutUser | null;
    setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser.getProfile().then(value => {
            setProfile(value);
            setLoading(false);
        }).catch(async error => {
            const errorData = error instanceof Response && error.json ? await error.json() : error;
            if (error.status && error.status === 401) {
                return swalError(error.status, 'Have to Login First!', `<a href="${OurRoute.DataRoute["Login"]}">Click here!</a>`);
            }
            swalError(error.status, "Cannot get data user");
            console.error(errorData)
        })
    }, []);
    if (loading) return <Loading />
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

const useMyProfile = (): ProfileContextType => {
    const context = React.useContext(ProfileContext);
    if (context === null) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};

export { ProfileProvider, useMyProfile };

