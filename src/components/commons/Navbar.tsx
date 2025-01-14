import { DataOutUser } from "@/dataType/fetch";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const getNavLinkClass = (isActive: boolean) => {
    return isActive
        ? "block px-2 py-2 bg-accents rounded-lg"
        : "block px-2 hover:bg-orange-400 py-2 transition-all rounded-lg";
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState<DataOutUser | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        // console.log("Token:", token);
        // console.log("Headers:", {
        //   Authorization: `Bearer ${token}`,
        // });
        setIsLoggedIn(!!token);
        console.log(isLoggedIn);

        if (token) {
            fetch("https://ruangng-nganggur-fast-api.vercel.app/users/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((user) => {
                    console.log("Profile data:", user);
                    setProfile(user);
                    // if(response.status === 200){
                    //     setProfile(200)
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error);
                });
        } else {
            localStorage.setItem("access_token", "0");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false);
        navigate("/auth/logout");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="flex justify-between items-center px-8 py-7 shadow-lg bg-gray-200">
                <div>
                    <h1 className="font-semibold text-md sm:text-lg md:text-2xl text-center">
                        <span className="text-accents">Ruang</span>Nganggur
                    </h1>
                </div>

                <button
                    className="lg:hidden text-2xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <nav className="hidden lg:flex items-center justify-between">
                    <ul className="flex justify-between gap-x-8">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => getNavLinkClass(isActive)}
                            >
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">
                                    About Us
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/job-listing"
                                className={({ isActive }) => getNavLinkClass(isActive)}
                            >
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">
                                    Job Listing
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/applicant-list"
                                className={({ isActive }) => getNavLinkClass(isActive)}
                            >
                                <span className="px-4 py-3 text-sm tracking-widest font-medium">
                                    Applicant List
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="hidden lg:flex gap-x-3 items-center rounded-lg ">
                    {profile?.username ? (
                        <>
                            <a
                                href={
                                    profile?.role === "jobseeker"
                                        ? "/auth/success"
                                        : "/auth/success"
                                }
                            >
                                <img
                                    src={profile?.image || "/assets/no-profile.png"}
                                    alt={`${profile?.username}'s profile`}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <p className="text-sm font-medium tracking-widest">
                                    {profile ? profile.username : "User"}
                                </p>
                                <button
                                    onClick={handleLogout}
                                    className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md"
                                >
                                    Logout
                                </button>
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="/auth"
                                className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md"
                            >
                                Get Started
                            </a>
                        </>
                    )}
                </div>
            </div>

            <div
                className={`lg:hidden z-10 fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300`}
            >
                <button
                    className="absolute top-6 right-6 text-2xl focus:outline-none"
                    onClick={toggleMenu}
                >
                    <FaTimes />
                </button>

                <ul className="flex flex-col mt-16">
                    <li className="mb-2">
                        <div className="flex gap-x-3 items-center hover:bg-gray-400 bg-gray-300 py-2 rounded-lg px-4">
                            {profile?.username ? (
                                <>
                                    <img
                                        src={profile?.image || "/assets/no-profile.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <p className="text-sm font-medium tracking-widest">
                                        {profile ? profile.username : "User"}
                                    </p>
                                    {/* <button
                onClick={handleLogout}
                className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md"
              >
                Logout
              </button> */}
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/auth"
                                        className="text-xs md:text-sm lg:text-sm font-medium px-8 py-2 btn-primary rounded-md"
                                    >
                                        Get Started
                                    </a>
                                </>
                            )}
                        </div>
                    </li>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => getNavLinkClass(isActive)}
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/job-listing"
                            className={({ isActive }) => getNavLinkClass(isActive)}
                        >
                            Job Listing
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/applicant-list"
                            className={({ isActive }) => getNavLinkClass(isActive)}
                        >
                            Applicant List
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
