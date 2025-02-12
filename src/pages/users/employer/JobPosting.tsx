import DashboardLayout from "@components/DashboardLayout";
import NotFound from "@components/NotFound";
import ValidationComponents from "@components/ValidationError";
import { DataOutJob, ErrorValidation } from "@dataType/fetch";
import { GenderType, JobType, RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
import functionSets from "@utils/function";
import swalError from "@utils/swal/error";
import swalSuccess from "@utils/swal/success";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobPosting = () => {
    const { id } = useParams<{
        id: string;
    }>();
    const { profile } = useMyProfile()
    if (profile?.role !== RoleType.employer) return <NotFound is403={true} />
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<DataOutJob>({
        employer_id: profile?.employer?.id,
        role: "",
        location: "",
        salary: 0,
        type_job: JobType.full_time,
        min_age: 0,
        max_age: 0,
        gender: null,
        open_date: new Date(),
        close_date: null,
        description: "",
    });
    const [error_validation, setError_validation] = useState<ErrorValidation | undefined>(undefined);
    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (!/^\d*$/.test(value) && name === "salary") return
        let parsedValue
        if (type === 'date' && value) parsedValue = functionSets.formatStringtoDate(value)
        parsedValue = type === 'number' ? parseInt(value) : value;
        setFormData({ ...formData, [name as keyof DataOutJob]: parsedValue || null });
    };
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true)
        if (!id) {
            fetchJob.postJob(formData).then(() => {
                setError_validation(undefined);
                swalSuccess({
                    title: "Post Job Success",
                    message: "Your job posting has been successfully submitted"
                })
            }).catch(async (error) => {
                if (error.status) {
                    if (functionSets.isBadOrConflictRequest(error.status) || error.status === 404) {
                        const data = await error.json()
                        swalError(error.status, "Input not valid!")
                        setError_validation(data);
                    }
                } else {
                    swalError(error.status, "Can't update job")
                }
                console.error("Error updating job:", error);
            }).finally(() => setSaving(false));
            return
        }
        fetchJob.updateJob({ id: parseInt(id), dataUpdate: formData }).then(() => {
            swalSuccess({
                title: "Update Job Success",
                message: "Your job posting has been successfully updated"
            })
        }).catch(async (error) => {
            if (error.status) {
                if (functionSets.isBadOrConflictRequest(error.status) || error.status === 404) {
                    const data = await error.json()
                    swalError(error.status, "Input not valid!")
                    setError_validation(data);
                } else {
                    swalError(error.status, "Can't update job")
                }
            }
            console.error("Error updating job:", error);
        }).finally(() => setSaving(false));
    };
    useEffect(() => {
        if (!id) {
            return setFormData({
                employer_id: profile?.employer?.id,
                role: "",
                location: "",
                salary: 0,
                type_job: JobType.full_time,
                min_age: 0,
                max_age: 0,
                gender: null,
                open_date: new Date(),
                close_date: null,
                description: "",
            })
        };
        fetchJob.getJob(parseInt(id)).then(e => {
            setFormData(e)
        }).catch(err => {
            swalError(err.status, "Cannot get data job")
        })
    }, [id])

    return (
        <DashboardLayout>
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">
                    Post a Job Listing
                </h1>
            </div>
            {/* Job Posting Form */}
            <div className="bg-white h-fit p-6 md:p-10 rounded-md shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="role" className="font-medium text-sm mb-1">
                            Role
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="Enter the role"
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="location" className="font-medium text-sm mb-1">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter the location"
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="salary" className="font-medium text-sm mb-1">
                            Salary
                        </label>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            id="salary"
                            name="salary"
                            value={formData.salary || ""}
                            onChange={handleChange}
                            placeholder="Enter the salary"
                            className="border border-gray-300 rounded-lg p-2"
                            inputMode="numeric"
                            required
                        />
                        <p className="text-xs text-end text-red-500">*In Rupiah (IDR)</p>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="type_job" className="font-medium text-sm mb-1">
                            Type of Job
                        </label>
                        <select
                            id="type_job"
                            name="type_job"
                            value={formData.type_job || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        >
                            <option value={JobType.full_time}>Full Time</option>
                            <option value={JobType.contract}>Contract</option>
                            <option value={JobType.part_time}>Part Time</option>
                            <option value={JobType.internship}>Internship</option>
                        </select>
                    </div>

                    <div className="flex gap-x-6">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="min_age" className="font-medium text-sm mb-1">
                                Minimum Age
                            </label>
                            <input
                                type="number"
                                id="min_age"
                                name="min_age"
                                value={formData.min_age || 0}
                                onChange={handleChange}
                                min="0"
                                placeholder="Minimum age"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-1/2">
                            <label htmlFor="max_age" className="font-medium text-sm mb-1">
                                Maximum Age
                            </label>
                            <input
                                type="number"
                                id="max_age"
                                name="max_age"
                                value={formData.max_age || 0}
                                onChange={handleChange}
                                min="0"
                                placeholder="Maximum age"
                                className="border border-gray-300 rounded-lg p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="gender" className="font-medium text-sm mb-1">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender || ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="">All Gender</option>
                            {Object.entries(GenderType).map(([key, value]) => (
                                <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="open_date" className="font-medium text-sm mb-1">
                            Open Date
                        </label>
                        <input
                            type="date"
                            id="open_date"
                            name="open_date"
                            value={functionSets.formatDatetoString(formData.open_date)}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="close_date" className="font-medium text-sm mb-1">
                            Close Date
                        </label>
                        <input
                            type="date"
                            id="close_date"
                            name="close_date"
                            value={formData.close_date ? functionSets.formatDatetoString(formData.close_date) : ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-medium text-sm mb-1">
                            Description
                        </label>
                        <textarea
                            rows={5}
                            id="description"
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                            placeholder="Detail of this job..."
                            className="border border-gray-300 rounded-lg p-2"
                        />
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
                </form>
            </div>
        </DashboardLayout>
    );
};

export default JobPosting;
