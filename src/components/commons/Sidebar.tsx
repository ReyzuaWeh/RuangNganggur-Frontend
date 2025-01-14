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
            <nav className="w-1/5 shadow-lg text-white bg-primary h-[100vh]">
                <div className="py-10 text-center">
                    <h1>RuangNganggur</h1>
                </div>
                <div>
                    <ul>
                        <li>
                            <NavLink
                                to="/users/profile"
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
                                to="/users/job-applied"
                                className={({ isActive }) => getNavLinks(isActive)}
                            >
                                <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                    <IoDocumentOutline size={25} />
                                    Job Applied
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/users/settings"
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
