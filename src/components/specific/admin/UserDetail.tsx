import { DataOutUser } from "@dataType/fetch";
import functionSets from "@utils/function";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const UserDetailPopUp = ({ data_user, handleClose }: {
    data_user: DataOutUser,
    handleClose: () => void,
}) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true)
    }, []);

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center 
                z-50
                transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`bg-blue-950 p-4 rounded-lg relative transform transition-transform duration-300 
        ${visible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'} 
        w-full max-w-sm md:max-w-2xl md:grid md:text-lg sm:text-base text-sm md:gap-4`}
            >

                <button
                    className="absolute top-2 right-2 text-white bg-[red] px-2 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={handleClose}
                >
                    <ImCross />
                </button>
                <div className="bg-gray-300 p-4 mb-4 rounded-lg overflow-hidden">
                    <h3 className="font-bold text-accents">Data Main User</h3>
                    <div className="grid-cols-[auto_min-content_1fr] grid gap-2">
                        <p className="font-bold">Username</p>
                        <p>: </p>
                        <p>
                            {data_user.username}
                        </p>
                        <p className="font-semibold">Email</p>
                        <p>:</p>
                        <p>

                            {data_user.email}
                        </p>
                        <p className="font-semibold">Registered</p>
                        <p>:</p>
                        <p>

                            {functionSets.formatDatetoString(data_user.registered_at)}
                        </p>
                    </div>
                </div>
                {data_user.employer && (<div className="bg-gray-300 p-4 mb-4 rounded-lg overflow-hidden">
                    <h3 className="font-bold text-accents">Data Employer</h3>
                    <div className="grid grid-cols-[auto_min-content_1fr] gap-2">
                        <p className="font-bold">Company Name</p>
                        <p>:</p>
                        <p>
                            {data_user.employer.company_name}
                        </p>
                        <p className="font-bold">Company Address</p>
                        <p>:</p>
                        <p>
                            {data_user.employer.company_address}
                        </p>
                        <p className="font-bold">Company Description</p>
                        <p>:</p>
                        <p>
                            {data_user.employer.company_description}
                        </p>
                    </div>
                </div>)}
                {data_user.jobseeker && (<div className="bg-gray-300 p-4 mb-4 rounded-lg overflow-hidden">
                    <h3 className="font-bold text-accents">Data Jobseeker</h3>
                    <div className="grid grid-cols-[auto_min-content_1fr] gap-2">
                        <p className="font-bold">NIS</p>
                        <p>:</p>
                        <p>
                            {data_user.jobseeker.nis}
                        </p>
                        <p className="font-bold">First Name</p>
                        <p>:</p>
                        <p>
                            {data_user.jobseeker.first_name}
                        </p>
                        <p className="font-bold">Last Name</p>
                        <p>:</p>
                        <p>
                            {data_user.jobseeker.last_name || "N/A"}
                        </p>
                        <p className="font-bold">Phone Number</p>
                        <p>:</p>
                        <p>
                            {data_user.jobseeker.phone_number || "N/A"}
                        </p>
                        <p className="font-bold">Graduate Year</p>
                        <p>:</p>
                        <p>
                            {data_user.jobseeker.graduate_year || "N/A"}
                        </p>
                    </div>
                </div>)}
            </div>
        </div>
    )
};

export default UserDetailPopUp;
