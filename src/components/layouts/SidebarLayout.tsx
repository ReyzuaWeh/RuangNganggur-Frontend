import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


const getNavLinks = (isActive: boolean) => {
    return isActive
        ? "gap-x-2 block w-full p-4 border-l-4 border-accents bg-white text-primary"
        : "gap-x-2 block w-full p-4 hover:bg-gray-400 hover:text-primary transition-all";
};

const SidebarLayout = ({ child }: {
    child: React.ReactNode
}) => {
    return (
        <nav className="w-1/5 shadow-lg text-white bg-primary min-h-screen">
            <div className="py-10 text-center">
                <h1>RuangNganggur</h1>
            </div>
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
                {child}
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
        </nav>
    )
}
export { getNavLinks };
export default SidebarLayout