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
const getJobsHistory = async (
    first_year: number,
    last_year: number,
    { with_owner }: {
        with_owner?: boolean | null
    }
) => {
    const tambahan = with_owner ? "/with-owner" : ""
    const response = await fetchUser.handleRequest({
        route: `${api_route.logs_route}/jobs/${first_year}/${last_year}${tambahan}`,
        method: HttpMethod.GET,
    });
    if (!response.ok) throw response;
    const data = await response.json()
    return data;
}

const fetchLog = {
    getLogsRegister,
    getJobsHistory
}
export default fetchLog