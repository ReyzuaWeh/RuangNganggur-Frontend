import { ParamsJobType } from "@/dataType/params";
import { AiOutlineDollar } from "react-icons/ai";
import { FaBuilding, FaMapMarkedAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const JobCard = (
    { role, company, location, salary, description, onDetailClick }: ParamsJobType
) => {

    const truncateDescription = (desc: string | null | undefined, maxLength: number): string => {
        if (desc === null || desc === undefined) {
            return "";
        }
        return desc.length > maxLength ? desc.slice(0, maxLength) + '...' : desc;
    }

    return (
        <div className="lg:w-[420px] bg-primary text-white p-6 tracking-widest rounded-[20px]">
            <div className="mb-2">
                <h1 className="lg:text-2xl font-medium">{role}</h1>
                <p className="flex items-center gap-x-2 text-xs">
                    <FaBuilding className="text-accents" />
                    {company}
                </p>
            </div>
            <hr className="w-full border border-accents mb-2" />
            <div className="py-2 flex flex-col gap-y-4">
                <div>
                    <h1 className="flex items-center gap-x-2 text-lg">
                        <FaMapMarkedAlt className="text-accents" /> Lokasi
                    </h1>
                    <p className="text-xs opacity-65">{location}</p>
                </div>
                <div>
                    <h1 className="flex items-center gap-x-2 text-lg">
                        <AiOutlineDollar className="text-accents" /> Gaji
                    </h1>
                    <p className="text-xs opacity-65">{salary}</p>
                </div>
                <div>
                    <h1 className="flex items-center gap-x-2 text-lg">
                        <IoDocumentTextOutline className="text-accents" /> Deskripsi
                    </h1>
                    <p className="text-xs opacity-65">{truncateDescription(description, 8)}</p>
                </div>

                <button onClick={() => onDetailClick}
                    className="btn-accent items-start rounded-md font-semibold w-1/3">
                    Detail
                </button>
            </div>
        </div>
    );
};

export default JobCard;
