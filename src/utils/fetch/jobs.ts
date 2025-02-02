import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutJob } from "@dataType/fetch";
import functionSets from "@utils/function";
import { getRefreshToken } from "@utils/localsave/getUser";
import FetchFunction from "./fetch";
import fetchUser from "./users";

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
const getJobs = async (
    { idEmployer, location, role, with_owner }: {
        idEmployer?: number | null,
        location?: string | null,
        role?: string | null,
        with_owner?: boolean | null,
    }
) => {
    let tambahan = "/";
    if (with_owner) tambahan = `/with-owner`
    const paramsObject = {
        ...(idEmployer && { employer_id: String(idEmployer) }),
        ...(location && { location }),
        ...(role && { role })
    }
    const params = new URLSearchParams(paramsObject)
    const response = await FetchFunction(
        {
            route: `${api_route.jobs_route}${tambahan}?${params.toString()}`,
            method: HttpMethod.GET,
            token: functionSets.getToken()
        }
    )
    if (!response.ok) {
        if (response.status === 404) return []
        throw response
    };
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
    if (response.status == 401) {
        await fetchUser.refreshToken(getRefreshToken()).then(() => postJob(dataPostJob))
    } else if (!response.ok) {
        throw response
    };
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
    if (response.status == 401) {
        fetchUser.refreshToken(getRefreshToken()).then(() => deleteJob(id))
    } else if (!response.ok) {
        throw response
    };
    return response;
}
const fetchJob = {
    deleteJob,
    getApplicant,
    getJobs,
    postJob,
}
export default fetchJob
