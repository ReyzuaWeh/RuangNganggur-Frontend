import OurRoute from "@utils/route";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { RiHome9Fill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";


const getNavLinks = (isActive: boolean) => {
    return isActive
        ? "gap-x-2 block w-full p-4 border-l-4 border-accents bg-white text-primary"
        : "gap-x-2 block w-full p-4 hover:bg-gray-400 hover:text-primary transition-all";
};

const SidebarLayout = ({ child }: {
    child: React.ReactNode
}) => {
    const [visible, setVisible] = useState<boolean>(true)
    useEffect(() => {
        const handleResize = () => {
            window.innerWidth >= 1024 ? setVisible(true) : setVisible(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className="lg:w-fit relative w-full z-10">
            <div className="lg:hidden top-0 w-full flex fixed bg- justify-end">
                <div className="hamburger text-primary">
                    <button onClick={() => {
                        setVisible(!visible)
                    }} className="p-4 text-3xl">
                        <div className={`${visible ? "rotate-180 scale-110" : "rotate-0 scale-100"} transition-transform duration-300 ease-in-out`}>
                            {visible ? <IoMdClose /> : <RxHamburgerMenu />}
                        </div>
                    </button>
                </div>
            </div>
            <nav
                className={`
                    max-w-fit shadow-lg text-white lg:sticky lg:top-0 bg-primary
                    fixed z-20 h-screen lg:block
                    transition-all duration-500 ease-in-out transform
                    ${visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                `}>
                <div className="py-10 px-3 text-center">
                    <h1 className="font-semibold text-lg">
                        <span className="text-accents">Ruang</span>Nganggur.
                    </h1>
                </div>
                <ul>
                    <li>
                        <NavLink
                            to={OurRoute.DataRoute["Profile"]}
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
                            to={OurRoute.DataRoute["Setting"]}
                            className={({ isActive }) => getNavLinks(isActive)}
                        >
                            <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                <IoSettingsOutline size={25} />
                                Settings
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={OurRoute.DataRoute["Home"]}
                            className={({ isActive }) => getNavLinks(isActive)}
                        >
                            <span className="flex items-center gap-x-2 opacity-75 font-semibold">
                                <RiHome9Fill size={25} />
                                Back
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export { getNavLinks };
export default SidebarLayout