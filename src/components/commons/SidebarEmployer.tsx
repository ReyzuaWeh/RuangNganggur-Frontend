import SidebarLayout, { getNavLinks } from "@components/SidebarLayout";
import OurRoute from "@utils/route";
import { IoDocumentOutline, IoDocumentsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <SidebarLayout
            child={
                <>
                    <li>
                        <NavLink
                            to={OurRoute.DataRoute["Job Posting"]}
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
                            to={OurRoute.DataRoute["My Job Post"]}
                            className={({ isActive }) => getNavLinks(isActive)}
                        >
                            <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                <IoDocumentsOutline size={25} />
                                Job Posts
                            </span>
                        </NavLink>
                    </li>

                </>
            }
        />
    )
};

export default Sidebar;
