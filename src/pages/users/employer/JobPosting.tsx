import DashboardLayout from "@components/DashboardLayout";
import NotFound from "@components/NotFound";
import { DataOutJob } from "@dataType/fetch";
import { JobType, RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchJob from "@utils/fetch/jobs";
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
        close_date: new Date(),
        description: "",
    });

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (!/^\d*$/.test(value) && name === "salary") return
        setFormData((prevState) => ({
            ...prevState,
            [name]: type !== "date" ? value : new Date(value),
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) {
            fetchJob.postJob(formData).then(() => {
                swalSuccess({
                    title: "Post Job Success",
                    message: "Your job posting has been successfully submitted"
                })
            }).catch(async (err) => {
                const errorMsg = await err.json()
                console.error(errorMsg)
                swalError(err.status, "Can't post job")
            });
            return
        }
        fetchJob.updateJob({ id: parseInt(id), dataUpdate: formData }).then(() => {
            swalSuccess({
                title: "Update Job Success",
                message: "Your job posting has been successfully updated"
            })
        }).catch(async (err) => {
            const errorMsg = await err.json()
            console.error(errorMsg)
            swalError(err.status, "Can't update job")
        });

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
                close_date: new Date(),
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
            <div className="bg-white max-h-[85vh] overflow-y-auto p-6 md:p-10 rounded-md shadow-md">
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
                            <option value="male">Male</option>
                            <option value="female">Female</option>
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
                            value={formData.open_date ? new Date(formData.open_date).toISOString().split('T')[0] : ""}
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
                            value={formData.close_date ? new Date(formData.close_date).toISOString().split('T')[0] : ""}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg p-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                    >
                        Submit Job Listing
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default JobPosting;
