import images_source from "@/assets/get/images";
import { DataOutUser } from "@dataType/fetch";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import { deleteAccessToken } from "@utils/localsave/getUser";
import OurRoute from "@utils/route";
import swalSuccess from "@utils/swal/success";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";


const getNavLinkClass = (isActive: boolean) =>
    isActive
        ? "block px-2 py-2 bg-accents rounded-lg"
        : "block px-2 py-2 hover:bg-orange-400 transition-all rounded-lg";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | null>(null);

    useEffect(() => {
        const token = functionSets.getToken();
        if (!token) return setIsLoggedIn(false);
        (async () => {
            try {
                const data = await fetchUser.getProfile();
                setProfile(data);
                setIsLoggedIn(true);
            } catch (error) {
                console.log(error);
                setIsLoggedIn(false);
            }
        })();
    }, []);

    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            customClass: {
                title: "text-center font-bold text-2xl",
                actions: "w-full flex no-wrap",
                confirmButton: "my-0 mx-2 rounded-lg py-3 px-3.5",
                denyButton: "my-0 mx-2 rounded-lg p-1.5 py-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAccessToken();
                setProfile(null);
                setIsLoggedIn(false);
                swalSuccess({
                    title: "Logout Success",
                    message: "You have been logged out",
                });
            }
        });
    };

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <>
            <div className="flex justify-end md:justify-between items-center px-8 py-3.5 shadow-lg bg-gray-200">
                <h1 className="font-semibold text-md hidden md:block sm:text-lg md:text-2xl text-center">
                    <span className="text-accents">Ruang</span>Nganggur
                </h1>
                <button
                    className={`lg:hidden text-2xl focus:outline-none transition-all duration-100 ${isMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                    onClick={toggleMenu}
                    disabled={isMenuOpen}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <nav className="hidden lg:flex items-center">
                    <ul className="flex gap-x-8">
                        <li>
                            <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">About Us</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={OurRoute.DataRoute["Job List"]} className={({ isActive }) => getNavLinkClass(isActive)}>
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">Job Listing</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={OurRoute.DataRoute["Company List"]} className={({ isActive }) => getNavLinkClass(isActive)}>
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">Company</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="hidden lg:flex gap-x-3 items-center rounded-lg">
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to={OurRoute.DataRoute["Profile"]}
                                className="flex group items-center overflow-hidden transition-all bg-primary text-white hover:bg-slate-700 hover:text-gray-200 border rounded-xl px-2 py-1 gap-x-2"
                            >
                                <p className="text-sm font-medium tracking-widest">{profile?.username || "User"}</p>
                                <img
                                    //@ts-ignore
                                    src={profile?.image || images_source["../no-profile.png"].default}
                                    alt={`${profile?.username}'s profile`}
                                    className="w-9 h-9 rounded-full bg-white border border-black object-cover transition-all group-hover:opacity-80"
                                />
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-xs hover:bg-red-500 hover:text-gray-200 pr-0.5 transition-all w-fit text-primary md:text-sm lg:text-3xl font-medium rounded"
                            >
                                <IoExitOutline />
                            </button>
                        </>
                    ) : (
                        <a href="/auth" className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md">
                            Get Started
                        </a>
                    )}
                </div>
            </div>

            <div
                className={`lg:hidden z-10 fixed top-0 right-0 h-full w-fit px-4 bg-white shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <button className="absolute top-6 right-6 text-2xl focus:outline-none" onClick={toggleMenu}>
                    <div className={`transition-transform duration-200 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
                        <FaTimes />
                    </div>
                </button>
                <ul className="flex flex-col mt-16 gap-y-2">
                    <li className="mb-2">
                        <div className="flex gap-x-3 items-center hover:bg-gray-400 bg-gray-300 py-2 rounded-lg px-4">
                            {profile?.username ? (
                                <NavLink to={OurRoute.DataRoute["Profile"]} className="flex items-center gap-1">
                                    <img
                                        // @ts-ignore
                                        src={profile?.image || images_source["../no-profile.png"].default}
                                        alt="Profile"
                                        className="w-10 h-10 bg-white border border-black rounded-full object-cover"
                                    />
                                    <p className="text-sm font-medium tracking-widest">{profile.username}</p>
                                </NavLink>
                            ) : (
                                <a
                                    href={OurRoute.DataRoute["Login"]}
                                    className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md"
                                >
                                    Get Started
                                </a>
                            )}
                        </div>
                    </li>
                    <li>
                        <NavLink to={OurRoute.DataRoute["About"]} className={({ isActive }) => getNavLinkClass(isActive)}>
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={OurRoute.DataRoute["Job List"]} className={({ isActive }) => getNavLinkClass(isActive)}>
                            Job Listing
                        </NavLink>
                        <NavLink to={OurRoute.DataRoute["Company List"]} className={({ isActive }) => getNavLinkClass(isActive)}>
                            Company
                        </NavLink>
                    </li>
                    {profile && (
                        <li>
                            <button className="btn-danger w-fit rounded p-1 mx-2" onClick={handleLogout}>
                                <p className="flex items-center">
                                    <IoExitOutline className="w-5 h-5" /> Logout
                                </p>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
