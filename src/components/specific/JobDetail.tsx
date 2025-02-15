import { DataOutApplicant, DataOutJob, DataOutUser } from "@dataType/fetch";
import { RoleType, StatusAplicantType } from "@dataType/khusus";
import fetchJob from "@utils/fetch/jobs";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import React, { useEffect, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import {
    FaBuilding,
    FaFileContract,
    FaGenderless,
    FaHourglassEnd,
    FaHourglassStart,
    FaMapMarkedAlt,
    FaUserCheck
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

const JobDetail = ({ job, onClose, job_id, applicant_data }: {
    job?: DataOutJob | null; onClose: () => void, job_id?: number | null,
    applicant_data?: DataOutApplicant | null
}) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(null);
    const [jobActive, setJobActive] = useState<DataOutJob | null>(job || null);
    const [formData, setFormData] = useState<DataOutApplicant>({
        job_id: jobActive?.id,
        jobseeker_id: 0,
        jobletter: "",
        jobletter_file: "",
        jobletter_name: "",
        status: StatusAplicantType.process,
        applied_at: new Date(),
    });
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
            [name + "_file"]: base64String,
            [name + "_name"]: file.name,
        }));
    };
    console.log(profile)
    console.log(profile && profile.role === RoleType.jobseeker && (!applicant_data || applicant_data.status === StatusAplicantType.process))
    useEffect(() => {
        setVisible(true);
        fetchUser.getProfile().then(e => {
            setProfile(e);
            if (e.jobseeker) {
                setFormData((prev) => ({ ...prev, jobseeker_id: e.jobseeker?.id as number }));
            }
        }).catch((error) => {
            console.error("Error fetching Profile:", error);
        })
        if (job_id) {
            if (applicant_data) {
                setFormData({ ...applicant_data })
            }
            fetchJob.getJob(job_id, true).then(e => {
                setJobActive(e)
                setFormData((prev) => ({ ...prev, job_id: e.id }))
            }).catch(err => {
                swalError(err.status, "Cannot get data job")
            })
        }
    }, [job_id]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 sm:p-6">
            <div
                className={`bg-primary text-white p-5 rounded-2xl transition-transform
                ${visible ? "scale-100" : "scale-0"}
                w-full max-w-[1100px] max-h-[80vh] min-h-[400px] flex flex-col`}
            >
                {/* Header Modal */}
                <div className="bg-[#2c3b63] h-[15%] p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl lg:text-4xl font-medium mb-2">{jobActive?.role}</h1>
                        <p className="flex items-center gap-x-2 text-lg lg:text-xl">
                            <FaBuilding className="text-accents" />
                            {jobActive?.employer?.company_name || "PT Undefined Indonesia"}
                        </p>
                    </div>
                    <button
                        className="text-accents"
                        onClick={() => {
                            setVisible(false);
                            setTimeout(onClose, 300);
                        }}
                    >
                        <IoMdClose size={25} />
                    </button>
                </div>

                {/* Konten Modal */}
                <div className="flex flex-col lg:flex-row h-fit gap-3 scrollbar-modals-apply mt-3 overflow-auto">
                    {/* Detail Pekerjaan */}
                    <div className="bg-[#2c3b63] h-fit p-4 lg:w-1/4 lg:h-[300px] rounded-xl lg:self-center">
                        <p className="text-xl lg:text-2xl font-medium mb-2">Job Detail</p>
                        <div className="flex flex-col gap-y-2 h-full">
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaMapMarkedAlt className="text-accents" />
                                Location : {jobActive?.location || "Remote"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <AiOutlineDollar className="text-accents" />
                                Salary : {jobActive?.salary && functionSets.formatNumbertoIDR(jobActive?.salary) || "No Sallary"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaUserCheck className="text-accents" />
                                Age : {jobActive?.min_age && jobActive?.max_age
                                    ? `${jobActive.min_age} - ${jobActive.max_age} Years Old`
                                    : jobActive?.min_age
                                        ? `> ${jobActive.min_age} Years Old`
                                        : jobActive?.max_age
                                            ? `< ${jobActive.max_age} Years Old`
                                            : "Not specified"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaGenderless className="text-accents" />
                                Gender : {jobActive?.gender && functionSets.capitalizeFirstLetter(jobActive?.gender) || "All Gender"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaFileContract className="text-accents" />
                                Type Job : {jobActive?.type_job && functionSets.capitalizeFirstLetter(jobActive?.type_job.replace("_", " "))}
                            </h2>
                        </div>
                    </div>

                    {/* Form Apply */}
                    <div className={`bg-[#2c3b63] p-4 rounded-lg flex flex-col flex-1 lg:self-center 
                        ${profile && profile.role === RoleType.jobseeker && (!applicant_data || applicant_data.status === StatusAplicantType.process) ? " h-fit" : "lg:h-[300px]"}`}>
                        <div className="flex w-full lg:flex-row flex-col h-fit justify-between">
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaHourglassStart className="text-accents" />
                                Open Date : {jobActive?.open_date ? functionSets.DateToString(jobActive?.open_date) : "-"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaHourglassEnd className="text-accents" />
                                Close Date : {jobActive?.close_date ? functionSets.DateToString(jobActive?.close_date) : "-"}
                            </h2>
                        </div>
                        <div className={`flex flex-col flex-1 h-fit w-full transition-[height] 
                            ${" flex-1 "}`}>
                            <h2 className="flex items-center gap-x-2 text-lg mb-2">
                                <IoDocumentTextOutline className="text-accents" /> Description
                            </h2>
                            {/* Kontainer Deskripsi dengan Scroll */}
                            <div
                                className={`w-full lg:flex-0 opacity-65 max-h-[300px] min-h-fit overflow-y-auto 
                                scrollbar-modals-apply-description
                                ${profile && profile.role === RoleType.jobseeker && (!applicant_data || applicant_data.status === StatusAplicantType.process) ? " " : " flex-1 "}
                                bg-[#E1ECFF] text-primary p-4 rounded-md whitespace-pre-wrap break-words`}
                            >
                                {jobActive?.description || "No description for this job"}
                            </div>
                        </div>
                        {profile && profile.role === RoleType.jobseeker && (!applicant_data || applicant_data.status === StatusAplicantType.process) && (
                            <form onSubmit={e => {
                                e.preventDefault()
                                setLoading(true)
                                if (!job_id) {
                                    fetchJob.applyJob({ dataApply: formData }).then(() => {
                                        swalSuccess({
                                            title: "Apply Success",
                                            message: "Your application has been successfully submitted"
                                        })
                                        onClose()
                                    }).catch(async error => {
                                        if (error.status) {
                                            const err_massage = await error.json()
                                            console.log(err_massage)
                                            swalError(error.status, err_massage.detail)
                                        }
                                        console.error("Error fetching Profile:", error);
                                    }).finally(() => {
                                        setLoading(false)
                                    })
                                } else {
                                    fetchJob.updateApplicant({ id: formData.id as number, dataUpdate: formData }).then(() => {
                                        swalSuccess({
                                            title: "Apply Success",
                                            message: "Your application has been updated successfully submitted"
                                        })
                                        onClose()
                                    }).catch(async error => {
                                        if (error.status) {
                                            const err_massage = await error.json()
                                            console.log(err_massage)
                                            swalError(error.status, err_massage.detail)
                                        }
                                        console.error("Error fetching Profile:", error);
                                    }).finally(() => {
                                        setLoading(false)
                                    })
                                }
                            }}>
                                <label className="text-lg font-medium mb-2">Job Letter</label>
                                <input
                                    name="jobletter"
                                    onChange={handlFileChange}
                                    type="file"
                                    className="bg-white text-black px-4 py-2 w-full rounded-lg"
                                />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 text-black w-full py-3 rounded-lg mt-4 text-center"
                                    disabled={loading}
                                >
                                    {applicant_data ? "Update Apply" : "Apply"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
