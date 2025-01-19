import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import functionSets from "../function";
import FetchFunction from "./fetch";

const getApplicant = async (
    { userId, jobId }: {
        userId?: number | null,
        jobId?: number | null
    }
) => {
    if (!userId && !jobId) return Promise.reject(new Error("userId and jobId are required"));
    const paramsObject = {
        ...(userId && { jobseeker_id: String(userId) }),
        ...(jobId && { job_id: String(jobId) })
    }
    const params = new URLSearchParams(paramsObject)
    const response = await FetchFunction(
        {
            route: `${api_route.applicants_route}?${params.toString()}`,
            method: HttpMethod.GET,
            token: functionSets.getToken()
        }
    )
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
}
const fetchJob = {
    getApplicant
}
export default fetchJob
