import SidebarLayout, { getNavLinks } from "@components/SidebarLayout";
import OurRoute from "@utils/route";
import { FaUsersCog } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
    return (
        <SidebarLayout
            child={
                <li>
                    <NavLink
                        to={OurRoute.DataRoute["Admin List User"]}
                        className={({ isActive }) => getNavLinks(isActive)}
                    >
                        <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                            <FaUsersCog size={25} />
                            Data User
                        </span>
                    </NavLink>
                    <NavLink
                        to={OurRoute.DataRoute["Admin List Job"]}
                        className={({ isActive }) => getNavLinks(isActive)}
                    >
                        <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                            <IoDocumentsOutline size={25} />
                            Job List
                        </span>
                    </NavLink>
                    <NavLink
                        to={OurRoute.DataRoute["Applied"]}
                        className={({ isActive }) => getNavLinks(isActive)}
                    >
                        <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                            <IoDocumentsOutline size={25} />
                            Applicant List
                        </span>
                    </NavLink>
                </li>
            }
        />
    )
};
export default SidebarAdmin;
