import SidebarLayout, { getNavLinks } from "@components/layouts/SidebarLayout";
import OurRoute from "@utils/route";
import { IoDocumentOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SidebarJobseeker = () => {
    return (
        <SidebarLayout
            child={
                <li>
                    <NavLink
                        to={OurRoute.DataRoute["Applied"]}
                        className={({ isActive }) => getNavLinks(isActive)}
                    >
                        <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                            <IoDocumentOutline size={25} />
                            Job Applied
                        </span>
                    </NavLink>
                </li>
            }
        />
    )
};

export default SidebarJobseeker;
