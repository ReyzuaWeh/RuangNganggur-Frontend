import SidebarLayout, { getNavLinks } from "@components/layouts/SidebarLayout";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <SidebarLayout
            child={
                <>
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

                </>
            }
        />
    )
};

export default Sidebar;
