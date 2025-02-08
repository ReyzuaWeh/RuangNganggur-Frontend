import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import { DataOutApplicant, DataOutJob } from "@dataType/fetch";
import functionSets from "@utils/function";
import { getRefreshToken } from "@utils/localsave/getUser";
import FetchFunction from "./fetch";
import fetchUser from "./users";

const getApplicant = async (
    { jobseeker_id, jobId, employer_id, with_detail }: {
        jobseeker_id?: number | null,
        jobId?: number | null,
        employer_id?: number | null,
        with_detail?: boolean | null
    }
) => {
    const paramsObject = {
        ...(jobseeker_id && { jobseeker_id: String(jobseeker_id) }),
        ...(jobId && { job_id: String(jobId) }),
        ...(employer_id && { employer_id: String(employer_id) })
    }
    const params = new URLSearchParams(paramsObject)
    const tambahan = with_detail ? `/with-detail/` : `/`
    const response = await fetchUser.handleRequest({
        route: `${api_route.applicants_route}${tambahan}?${params.toString()}`,
        method: HttpMethod.GET,
        token: functionSets.getToken()
    });
    if (!response.ok) throw response;
    const data: DataOutApplicant[] = await response.json();
    return data;
}
const applyJob = async (
    { dataApply }: {
        dataApply: DataOutApplicant
    }
) => {
    const response = await fetchUser.handleRequest({
        route: api_route.applicants_route,
        method: HttpMethod.POST,
        data: dataApply,
        token: functionSets.getToken()
    });
    if (!response.ok) throw response;
    const data: DataOutApplicant = await response.json();
    return data;
}
const updateApplicant = async (
    { id, dataUpdate }: {
        id: number,
        dataUpdate: DataOutApplicant
    }
) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.applicants_route}/applicant/${id}`,
        method: HttpMethod.PUT,
        data: dataUpdate,
        token: functionSets.getToken()
    });
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
}
const deleteApplicant = async (id: number) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.applicants_route}/applicant/${id}`,
        method: HttpMethod.DELETE,
        token: functionSets.getToken()
    });
    if (!response.ok) throw response;
    return;
}
const getJob = async (id: number) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.jobs_route}/job/${id}`,
        method: HttpMethod.GET,
        token: functionSets.getToken()
    });
    if (!response.ok) throw response;
    const data: DataOutJob = await response.json();
    return data;
}
const updateJob = async (
    { id, dataUpdate }: {
        id: number,
        dataUpdate: DataOutJob
    }
) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.jobs_route}/job/${id}`,
        method: HttpMethod.PUT,
        data: dataUpdate,
        token: functionSets.getToken()
    });
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
    const response = await fetchUser.handleRequest({
        route: `${api_route.jobs_route}/job/${id}`,
        method: HttpMethod.DELETE,
        token: functionSets.getToken()
    }, true)
    if (!response.ok) throw response;
    const data = await response.json();
    return data;
}
const fetchJob = {
    deleteJob,
    getApplicant,
    getJobs,
    postJob,
    applyJob,
    updateApplicant,
    getJob,
    updateJob,
    deleteApplicant
}
export default fetchJob
