import { DataOutToken } from "@dataType/fetch";

const setToken = (value: DataOutToken) => {
    localStorage.setItem("access_token", value.access_token);
    localStorage.setItem("refresh_token", value.refresh_token);
    return
}

const getAccessToken = () => localStorage.getItem("access_token");

const deleteAccessToken = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
};

const getRefreshToken = () => localStorage.getItem("refresh_token");
export {
    deleteAccessToken,
    getAccessToken,
    getRefreshToken,
    setToken
};

