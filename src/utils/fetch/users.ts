import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutToken, DataOutUser, ErrorValidation, ForgetPasswordForm, LoginInterface } from "@dataType/fetch";
import { RoleType, SetProfileType } from "@dataType/khusus";
import { getAccessToken, getRefreshToken, setToken } from "@utils/localsave/getUser";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import functionSets from "../function";
import OurRoute from "../route";
import FetchFunction from "./fetch";

const refreshToken = async (refreshToken: string | null): Promise<DataOutToken> => {
    let error = new Error("Refresh token is required") as any
    error.status = 401
    if (!refreshToken) return Promise.reject(error);
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
            params.token = getAccessToken()
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
const forgetpass = async (formChangePassword: ForgetPasswordForm) => {
    const response = await handleRequest({
        route: `${api_route.auth_route}/forget-pass`,
        method: HttpMethod.PUT,
        data: formChangePassword
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
}
const getUser = async (id: number, find_jobseeker?: boolean | null, find_employer?: boolean | null) => {
    const paramsObject: Record<string, string> = {};
    if (find_jobseeker) {
        paramsObject["find_jobseeker"] = String(find_jobseeker);
    }
    if (find_employer) {
        paramsObject["find_jobseeker"] = String(find_jobseeker);
    }
    const params = new URLSearchParams(paramsObject);
    const response = await handleRequest({
        route: `${api_route.users_route}/user/${id}?${params.toString()}`,
        method: HttpMethod.GET,
        token: getAccessToken()
    });
    if (!response.ok) throw response;
    const data: DataOutUser = await response.json();
    return data;
}
const deleteUser = async (id: number) => {
    const response = await handleRequest({
        route: `${api_route.users_route}/user/${id}`,
        method: HttpMethod.DELETE,
        token: getAccessToken()
    });
    if (!response.ok) throw response;
    return true;
}
const getUsers = async (
    { role, search, status, min_years, max_years, not_admin, location, company_name }: {
        role?: RoleType | null,
        search?: string | null,
        status?: boolean,
        min_years?: number | null,
        max_years?: number | null,
        not_admin?: boolean,
        location?: string | null,
        company_name?: string | null
    }
) => {
    const paramsObject: Record<any, any> = {
        ...(role && { role }),
        ...(search && { search }),
        ...(Boolean(status !== undefined) && { status }),
        ...(min_years && { min_years: String(min_years) }),
        ...(max_years && { max_years: String(max_years) }),
        ...(not_admin && { not_admin }),
        ...(location && { location }),
        ...(company_name && { company_name })
    }
    const params = new URLSearchParams(paramsObject)
    const response = await handleRequest({
        route: `${api_route.users_route}?${params.toString()}`,
        method: HttpMethod.GET,
        token: getAccessToken()
    }, true);
    if (!response.ok) throw response;
    const data: DataOutUser[] = await response.json();
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
const updateUser = async (updatedProfile: DataOutUser, id: number): Promise<DataOutUser> => {
    const response = await handleRequest({
        route: `${api_route.users_route}/user/${id}`,
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
    id: number | null,
    setError_validation: React.Dispatch<React.SetStateAction<ErrorValidation | undefined>>
) => {
    console.log(updatedProfile);
    if (!updatedProfile || !id) return Promise.reject(new Error("There is no data/id you send"));
    return updateUser(updatedProfile, id).then(value => {
        swalSuccess({ title: "Update Success!", message: "Your profile has been updated." })
        setProfile(value);
        setError_validation(undefined)
    }).catch(async error => {
        console.error("Error updating profile:", error);
        const errorData = error instanceof Response && error.json ? await error.json() : error;
        console.error(errorData)
        if (error.status && error.status !== 401) {
            swalError(error.status, `<a href="${OurRoute.DataRoute["Login"]}">Have to login. Click here!</a>`);
        }
        swalError(error.status, "Cannot update data user");
        if (functionSets.isBadOrConflictRequest(error.status)) {
            setError_validation(errorData)
        }
    });
}

export const fetchUser = {
    login,
    register,
    getProfile,
    updateSubProfile,
    saveChange,
    refreshToken,
    changepass,
    forgetpass,
    handleRequest,
    getUser,
    updateUser,
    getUsers,
    deleteUser
};
export default fetchUser;
