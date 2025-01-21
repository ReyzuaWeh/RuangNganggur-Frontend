import { TokenDecrypt } from "@dataType/localSave";
import { jwtDecode } from "jwt-decode";

const getAccessToken = () => {
    return localStorage.getItem("access_token");
}

const deleteAccessToken = () => {
    return localStorage.removeItem("access_token");
};

const getDecryptToken = () => {
    const token = getAccessToken();
    if (!token) return null;
    const decoded: TokenDecrypt = jwtDecode(token);
    return decoded
}
const getIDUser = () => {
    return getDecryptToken()?.sub;
}
const getSubIDUser = async () => {
    const sub = await getDecryptToken()?.subsubject;
    return Number(sub);
}
export {
    deleteAccessToken,
    getAccessToken,
    getIDUser,
    getSubIDUser
};

