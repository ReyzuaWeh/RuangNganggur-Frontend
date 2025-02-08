import { ParamsJobType } from "@dataType/params";
import functionSets from "@utils/function";
import { AiOutlineDollar } from "react-icons/ai";
import { FaBuilding, FaMapMarkedAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const JobCard = (
    { role, company, location, salary, description, onDetailClick }: ParamsJobType
) => {
    return (
        <div className="lg:w-[325px] w-full bg-primary text-white p-6 tracking-widest rounded-[20px]">
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
                        <FaMapMarkedAlt className="text-accents" /> Location
                    </h1>
                    <p className="text-xs opacity-65">{location}</p>
                </div>
                <div>
                    <h1 className="flex items-center gap-x-2 text-lg">
                        <AiOutlineDollar className="text-accents" /> Sallary
                    </h1>
                    <p className="text-xs opacity-65">{functionSets.formatNumbertoIDR(salary)}</p>
                </div>
                <div>
                    <h1 className="flex items-center gap-x-2 text-lg">
                        <IoDocumentTextOutline className="text-accents" /> Description
                    </h1>
                    <p className="text-xs opacity-65">{functionSets.truncateWord(description || "", 12)}</p>
                </div>

                <button onClick={() => onDetailClick()}
                    className="btn-accent items-start rounded-md font-semibold w-1/3 self-end">
                    Detail
                </button>
            </div>
        </div>
    );
};

export default JobCard;
