import { RoleType, SetProfileType } from "@/dataType/khusus";
import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutToken, DataOutUser, LoginInterface } from "@dataType/fetch";
import functionSets from "../function";
import swalError from "../swal/error";
import swalSuccess from "../swal/success";
import FetchFunction from "./fetch";

const login = async (dataLogin: LoginInterface): Promise<DataOutToken> => {
    const response = await FetchFunction({
        route: `${api_route.auth_route}/token`,
        method: HttpMethod.POST,
        data: dataLogin
    });
    if (!response.ok) throw response;
    const data: DataOutToken = await response.json();
    return data;
}
const register = async (formRegister: DataOutUser): Promise<DataOutUser> => {
    const response = await FetchFunction({
        route: api_route.users_route,
        method: HttpMethod.POST,
        data: formRegister
    });
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data;
}
const getProfile = async (): Promise<DataOutUser> => {
    const token = functionSets.getToken()
    const response = await FetchFunction({
        route: `${api_route.users_route}/profile`,
        token: token
    })
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data
}
const updateProfile = async (updatedProfile: DataOutUser) => {
    const token = functionSets.getToken()
    const response = await FetchFunction({
        route: `${api_route.users_route}/profile`,
        method: HttpMethod.PUT,
        token: token,
        data: updatedProfile
    });
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data;
}
const updateSubProfile = (
    { value, role, key, setProfile }: {
        value: any,
        role: RoleType.employer | RoleType.jobseeker,
        key: string,
        setProfile: SetProfileType
    }
) => {
    setProfile(prev => {
        if (prev) {
            const updatedProfile = {
                ...prev,
                [role]: {
                    ...prev[role],
                    [key]: value,
                },
            }
            return updatedProfile;
        }
        return prev;
    });
};


const saveChange = (updatedProfile: DataOutUser, setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>) => {
    return fetchUser.updateProfile(updatedProfile).then(value => {
        swalSuccess({ title: "Update Success!", message: "Your profile has been updated." })
        setProfile(value);
    }).catch(async error => {
        console.error("Error updating profile:", error);
        const errorData = await error.json();
        console.error(errorData)
        swalError(error.status, "Cannot update data user");
    });
}


export const fetchUser = {
    login,
    register,
    getProfile,
    updateProfile,
    updateSubProfile,
    saveChange
};
export default fetchUser;
