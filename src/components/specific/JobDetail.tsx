import { DataOutJob } from "@dataType/fetch";
import functionSets from "@utils/function";
import React, { useEffect, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaBuilding, FaGenderless, FaHourglassEnd, FaHourglassStart, FaMapMarkedAlt, FaUserCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";

const JobDetail = ({ job, onClose }: { job: DataOutJob | null; onClose: () => void }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        id: 0,
        job_id: 0,
        jobseeker_id: "",
        jobletter: "",
        status: "process",
        applied_at: new Date().toISOString().slice(0, 10),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setVisible(true);
    }, []);

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
                        <h1 className="text-2xl lg:text-4xl font-medium mb-2">{job?.role}</h1>
                        <p className="flex items-center gap-x-2 text-lg lg:text-xl">
                            <FaBuilding className="text-accents" />
                            {job?.employer?.company_name || "PT Undefined Indonesia"}
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
                    <div className="bg-[#2c3b63] h-fit p-4 lg:w-1/4 rounded-xl lg:self-center">
                        <p className="text-xl lg:text-2xl font-medium mb-2">Job Detail</p>
                        <div className="flex flex-col gap-y-2 h-full">
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaMapMarkedAlt className="text-accents" />
                                Location : {job?.location}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <AiOutlineDollar className="text-accents" />
                                Salary : {job?.salary && `Rp. ${job?.salary}` || "No Sallary"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaUserCheck className="text-accents" />
                                Age : {job?.min_age && job?.max_age
                                    ? `${job.min_age} - ${job.max_age} Years Old`
                                    : job?.min_age
                                        ? `> ${job.min_age} Years Old`
                                        : job?.max_age
                                            ? `< ${job.max_age} Years Old`
                                            : "Not specified"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaGenderless className="text-accents" />
                                Gender : {job?.gender && functionSets.capitalizeFirstLetter(job?.gender) || "All Gender"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaHourglassStart className="text-accents" />
                                Open Date : {job?.open_date ? functionSets.DateToString(job?.open_date) : "Undefined"}
                            </h2>
                            <h2 className="flex items-center gap-x-2 text-lg">
                                <FaHourglassEnd className="text-accents" />
                                Close Date : {job?.close_date ? functionSets.DateToString(job?.close_date) : "Undefined"}
                            </h2>
                        </div>
                    </div>

                    {/* Form Apply */}
                    <div className="bg-[#2c3b63] p-4 rounded-lg flex-1 h-fit self-center lg:min-h-[300px]">
                        <div className="flex flex-col flex-1">
                            <h2 className="flex items-center gap-x-2 text-lg mb-2">
                                <IoDocumentTextOutline className="text-accents" /> Description
                            </h2>
                            {/* Kontainer Deskripsi dengan Scroll */}
                            <div
                                className="flex-1 opacity-65 max-h-[170px] overflow-y-auto scrollbar-modals-apply-description
                                    bg-[#E1ECFF] text-primary p-4 rounded-md whitespace-pre-wrap break-words"
                            >
                                {job?.description || "No description for this job"}
                            </div>
                        </div>
                        <form>
                            <p className="text-lg font-medium mb-2">Job Letter</p>
                            <input
                                name="jobletter"
                                value={formData.jobletter}
                                onChange={handleChange}
                                type="file"
                                className="bg-white text-black px-4 py-2 w-full rounded-lg"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 text-black w-full py-3 rounded-lg mt-4 text-center"
                            >
                                Apply
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetail;
