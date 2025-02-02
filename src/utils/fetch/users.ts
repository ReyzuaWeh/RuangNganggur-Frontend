import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutToken, DataOutUser, ForgetPasswordForm, LoginInterface } from "@dataType/fetch";
import { RoleType, SetProfileType } from "@dataType/khusus";
import { getAccessToken, getRefreshToken, setToken } from "@utils/localsave/getUser";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import OurRoute from "../route";
import FetchFunction from "./fetch";

const refreshToken = async (refreshToken: string | null): Promise<DataOutToken> => {
    if (!refreshToken) return Promise.reject(new Error("Refresh token is required"));
    const response = await FetchFunction({
        route: `${api_route.auth_route}/refresh-token`,
        method: HttpMethod.GET,
        token: refreshToken
    });
    if (!response.ok) throw response;
    const data: DataOutToken = await response.json();
    setToken(data);
    return data;
}
const handleRequest = async (params: {
    route: string;
    method?: HttpMethod;
    data?: any;
    token?: string | null;
}, retry: boolean = true): Promise<Response> => {
    const token = params.token || getAccessToken();
    const response = await FetchFunction({ ...params, token });

    if (response.status === 401 && retry) {
        try {
            const refreshTok = getRefreshToken();
            await refreshToken(refreshTok);
            return await handleRequest(params, false);
        } catch (error) {
            throw error;
        }
    }
    return response;
};

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
const changepass = async (formChangePassword: ForgetPasswordForm) => {
    const response = await handleRequest({
        route: `${api_route.auth_route}/change-password`,
        method: HttpMethod.PUT,
        data: formChangePassword
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
}

const getProfile = async (): Promise<DataOutUser> => {
    const response = await handleRequest({
        route: `${api_route.users_route}/profile`,
        method: HttpMethod.GET,
    });
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data;
};
const updateProfile = async (updatedProfile: DataOutUser): Promise<DataOutUser> => {
    const response = await handleRequest({
        route: `${api_route.users_route}/profile`,
        method: HttpMethod.PUT,
        data: updatedProfile,
    });
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data;
};
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
    return
};


const saveChange = (
    updatedProfile: DataOutUser | null,
    setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>,
) => {
    console.log(updatedProfile);
    if (!updatedProfile) return Promise.reject(new Error("There is no data you send"));
    return updateProfile(updatedProfile).then(value => {
        swalSuccess({ title: "Update Success!", message: "Your profile has been updated." })
        setProfile(value);
    }).catch(async error => {
        console.error("Error updating profile:", error);
        const errorData = error instanceof Response && error.json ? await error.json() : error;
        console.error(errorData)
        if (error.status && error.status !== 401) {
            swalError(error.status, `<a href="${OurRoute.DataRoute["Login"]}">Have to login. Click here!</a>`);
        }
        swalError(error.status, "Cannot update data user");
    });
}

export const fetchUser = {
    login,
    register,
    getProfile,
    updateProfile,
    updateSubProfile,
    saveChange,
    refreshToken,
    changepass
};
export default fetchUser;
