import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutJob } from "@dataType/fetch";
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
const getJob = async (
    { idEmployer, location, jobRole }: {
        idEmployer?: number | null,
        location?: string | null,
        jobRole?: string | null
    }
) => {
    const paramsObject = {
        ...(idEmployer && { employer_id: String(idEmployer) }),
        ...(location && { location: location }),
        ...(jobRole && { role: jobRole })
    }
    const params = new URLSearchParams(paramsObject)
    const response = await FetchFunction(
        {
            route: `${api_route.jobs_route}?${params.toString()}`,
            method: HttpMethod.GET,
            token: functionSets.getToken()
        }
    )
    if (!response.ok) throw response;
    const data: DataOutJob[] = await response.json();
    return data;
}
const postJob = async (dataPostJob: DataOutJob) => {
    const token = functionSets.getToken()
    const response = await FetchFunction({
        route: api_route.jobs_route,
        method: HttpMethod.POST,
        token: token,
        data: dataPostJob
    })
    if (!response.ok) throw response;
    const data: DataOutJob = await response.json();
    return data;
}
const deleteJob = async (id: number) => {
    const token = functionSets.getToken()
    const response = await FetchFunction({
        route: `${api_route.jobs_route}/job/${id}`,
        method: HttpMethod.DELETE,
        token: token
    })
    if (!response.ok) throw response;
    return response;
}
const fetchJob = {
    deleteJob,
    getApplicant,
    getJob,
    postJob,
}
export default fetchJob
