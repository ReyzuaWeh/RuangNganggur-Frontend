import { IoDocumentOutline, IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const getNavLinks = (isActive: boolean) => {
    return isActive
        ? "gap-x-2 block w-full p-4 border-l-4 border-accents bg-white text-primary"
        : "gap-x-2 block w-full p-4 hover:bg-gray-400 hover:text-primary transition-all";
};


const Sidebar = () => {
    return (
        <>
            <nav className="w-1/5 shadow-lg text-white bg-primary min-h-screen">
                <div className="py-10 text-center">
                    <h1>RuangNganggur</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <NavLink
                                to="/users/employee/profile"
                                className={({ isActive }) => getNavLinks(isActive)}
                            >
                                <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                    <IoPersonCircleOutline size={25} />
                                    Profile
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/users/employee/job-posting"
                                className={({ isActive }) => getNavLinks(isActive)}
                            >
                                <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                    <IoDocumentOutline size={25} />
                                    Posting Job
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/users/employee/job-applicant"
                                className={({ isActive }) => getNavLinks(isActive)}
                            >
                                <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                    <IoDocumentOutline size={25} />
                                    Job Applicant
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/users/employee/settings"
                                className={({ isActive }) => getNavLinks(isActive)}
                            >
                                <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                    <IoSettingsOutline size={25} />
                                    Settings
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
