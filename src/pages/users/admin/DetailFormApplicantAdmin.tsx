import Loading from "@/components/commons/Loading";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import fetchJob from "@/utils/fetch/jobs";
import fetchUser from "@/utils/fetch/users";
import swalError from "@/utils/swal/error";
import swalSuccess from "@/utils/swal/success";
import ValidationComponents from "@components/ValidationError";
import { DataOutApplicant, ErrorValidation } from "@dataType/fetch";
import { RoleType, StatusAplicantType } from "@dataType/khusus";
import functionSets from "@utils/function";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailFormApplicant = () => {
    const { id } = useParams();
    const [saving, setSaving] = useState(false);
    const [error_validation, setError_validation] = useState<ErrorValidation | undefined>(undefined);
    const [formData, setFormData] = useState<DataOutApplicant>({
        jobseeker_id: 0,
        job_id: 0,
        jobletter: "",
        status: StatusAplicantType.process,
        applied_at: new Date()
    });
    const [listJob, setListJob] = useState<Record<number, string> | undefined>()
    const [listJobseeker, setListJobseeker] = useState<Record<number, string> | undefined>()
    const [loading, setLoading] = useState(false);
    const handlFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const { name } = e.target;
        if (!file) {
            setFormData((prev) => ({ ...prev, [name + "_file"]: null, [name + "_name"]: null }));
            return;
        }
        const base64String = await functionSets.getBase64(file);
        setFormData((prev) => ({
            ...prev,
            jobletter: file.name,
            [name + "_file"]: base64String,
            [name + "_name"]: file.name,
        }));
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let parsedValue = type === 'date' ? functionSets.formatStringtoDate(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        if (id) {
            return fetchJob.updateApplicant({ id: parseInt(id), dataUpdate: formData }).then(() => {
                setError_validation(undefined)
                swalSuccess({ title: "Create Applicant Success", message: `Applicant has been created` })
            }).catch(async (error) => {
                if (error.status === 500 || !error.status) return setError_validation(undefined);
                if (error.status === 422 || error.status === 400 || error.status === 409 || error.status === 404) {
                    const errorData = await error.json();
                    setError_validation(errorData.detail);
                    return swalError(error, "Wrong Update Input");
                }
                swalError(error.status, `Cannot Update Applicant`);
            }).finally(() => setSaving(false))
        }
        return fetchJob.applyJob({ dataApply: formData }).then(() => {
            setError_validation(undefined)
            swalSuccess({ title: "Update Applicant Success", message: `Applicant has been updated` })
        }).catch(async (error) => {
            if (error.status === 500 || !error.status) return setError_validation(undefined);
            if (error.status === 422 || error.status === 400 || error.status === 409 || error.status === 404) {
                const errorData = await error.json();
                setError_validation(errorData);
                return swalError(error, "Wrong Create Input");
            }
            swalError(error.status, `Cannot Create Applicant`);
        }).finally(() => setSaving(false))
    }
    useEffect(() => {
        fetchJob.getJobs({}).then(data => {
            const newData = data.reduce((acc, curr) => {
                acc[curr.id as number] = curr.role;
                return acc;
            }, {} as Record<number, string>);
            setListJob(newData);
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        })
        fetchUser.getUsers({ role: RoleType.jobseeker }).then(data => {
            const newData = data.reduce((acc, curr) => {
                if (curr.jobseeker?.id && curr.jobseeker?.first_name) {
                    acc[curr.jobseeker.id] = curr.jobseeker.first_name + (curr.jobseeker?.last_name && ` ${curr.jobseeker?.last_name}` || "");
                }
                return acc;
            }, {} as Record<number, string>);
            setListJobseeker(newData);
        }).catch(error => {
            console.error("Error fetching users:", error);
        })
        if (id) {
            setLoading(true)
            fetchJob.getApplicantDetail(parseInt(id), {}).then(e => {
                setFormData(e)
            }).catch(err => {
                swalError(err.status, "Cannot get data applicant")
            }).finally(() => setLoading(false))
        } else {
            setFormData({
                jobseeker_id: 0,
                job_id: 0,
                jobletter: "",
                status: StatusAplicantType.process,
                applied_at: new Date()
            })
        }
    }, [id])
    if (loading) return <Loading />
    return (
        <DashboardLayout>
            <form
                onSubmit={handleSubmit}
                className="min-h-screen flex flex-col bg-gray-100 p-8 overflow-y-auto"
            >
                <div className="bg-white p-6 shadow rounded-lg mb-8 flex-1 overflow-auto">
                    <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
                        <h2 className="text-2xl font-bold">Data Applicant</h2>
                    </div>
                    <hr className="border-t-1 border-gray-800 my-6" />
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="job_id" className="block text-left mb-2">
                                    Job Name: <span className="text-red-600">*</span>
                                </label>
                                <select
                                    name="job_id"
                                    value={formData.job_id}
                                    onChange={handleChange}
                                    className="border p-3 rounded text-black hover:border-blue-300 focus:ring focus:ring-blue-300 hover:shadow-md transition-all w-full"
                                    required
                                >
                                    <option value="">Select Job</option>
                                    {listJob && Object.entries(listJob).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="jobseeker_id" className="block text-left mb-2">
                                    Jobseeker Name: <span className="text-red-600">*</span>
                                </label>
                                <select
                                    name="jobseeker_id"
                                    value={formData.jobseeker_id}
                                    onChange={handleChange}
                                    className="border p-3 rounded text-black hover:border-blue-300 focus:ring focus:ring-blue-300 hover:shadow-md transition-all w-full"
                                    required
                                >
                                    <option value="">Select Job Seeker</option>
                                    {listJobseeker && Object.entries(listJobseeker).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-left mb-2">Status:</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`border p-3 rounded text-black hover:border-blue-300 focus:ring
                                        focus:ring-blue-300 hover:shadow-md transition-all w-full`}
                                >
                                    <option value="">Select Status</option>
                                    {Object.entries(StatusAplicantType).map(([key, value]) => (
                                        <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value)}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="applied_at" className="block text-left mb-2">Applied At:</label>
                                <input
                                    type="date"
                                    name="applied_at"
                                    value={functionSets.formatDatetoString(formData.applied_at)}
                                    onChange={handleChange}
                                    className="border rounded-md p-3 focus:ring focus:ring-blue-300 outline-none hover:border-blue-300 hover:shadow-md transition-all w-full"
                                />
                            </div>
                        </div>
                        <div className="pt-3">
                            <label htmlFor="jobletter" className="block text-left mb-2">Upload File</label>
                            <div className="file-input-wrapper">
                                <input
                                    type="file"
                                    name="jobletter"
                                    accept="application/pdf"
                                    onChange={handlFileChange}
                                    className="border p-3 rounded text-black hover:border-blue-300 focus:ring focus:ring-blue-300 hover:shadow-md transition-all w-full"
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    {formData.jobletter ?
                                        (
                                            <a href={formData.jobletter} target="_blank">
                                                {functionSets.truncateWord(formData.jobletter.split("/").pop() || "", 20)}
                                            </a>
                                        )
                                        : "No file attached"}
                                </p>
                            </div>
                        </div>
                    </div>
                    {error_validation && <ValidationComponents errorValid={error_validation} />}
                    <div className="flex space-x-4 gap-x-2 justify-center md:justify-end mt-4 md:mt-0 w-full">
                        <button
                            type='button'
                            onClick={() => {
                                window.history.back()
                            }}
                            className="bg-red-600 md:w-fit w-1/2 hover:bg-red-800 transition-colors text-white px-5 py-3 rounded"
                        >
                            Back
                        </button>
                        <button
                            type='submit'
                            className="bg-orange-400 md:w-fit w-1/2 hover:bg-orange-600 transition-colors text-white px-5 py-3 rounded"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

            </form>
        </DashboardLayout>
    );
}
export default DetailFormApplicant