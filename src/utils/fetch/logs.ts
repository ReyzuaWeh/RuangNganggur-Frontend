import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataLogsRegister } from "@dataType/fetch";
import fetchUser from "./users";

const getLogsRegister = async (limit: number) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.logs_route}/register?limit=${limit}`,
        method: HttpMethod.GET,
    });
    if (!response.ok) throw response;
    const data: DataLogsRegister[] = await response.json()
    return data;
}

const fetchLog = {
    getLogsRegister
}
export default fetchLog