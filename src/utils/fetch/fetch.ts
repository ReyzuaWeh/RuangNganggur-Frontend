import { HttpMethod, RouterPATHType } from "@dataType/basic";

const FetchFunction = async (
    { route, method, data, token }: {
        route: RouterPATHType,
        method?: HttpMethod
        data?: object,
        token?: string | null
    }
) => {
    return await fetch(route, {
        method: method || "GET",
        headers: !token ? {
            "Content-Type": "application/json",
        } : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: data ? JSON.stringify(data) : undefined,
    });
}
export default FetchFunction