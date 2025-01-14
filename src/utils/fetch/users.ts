import api_route from "@api/api";
import { DataOutToken, LoginInterface } from "@dataType/fetch";
// import Swal from "sweetalert2";

const login = async (dataLogin: LoginInterface): Promise<DataOutToken> => {
    const response = await fetch(`${api_route.auth_route}/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataLogin),
    });
    console.log("cek", response.status)
    if (!response.ok) throw response;
    const data: DataOutToken = await response.json();
    return data;
}
const register = () => {

}
const getProfile = () => {

}

export const fetchUser = {
    login,
    register,
    getProfile
};
export default fetchUser;
