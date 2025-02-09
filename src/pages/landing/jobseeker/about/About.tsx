import images_source from "@/assets/get/images";
import HomeSwiper from "@components/HomeSwiper";
import LandingLayout from "@components/LandingLayout";
import { NavLink } from "react-router-dom";

const About = () => {
    return (
        <LandingLayout>
            {/* Hero Section */}
            <div className="bg-gradient-home flex flex-col min-h-[50vh] sm:min-h-[60vh]">
                <HomeSwiper />
                <div className="p-4 sm:p-6 md:p-10 flex flex-col justify-start items-start">
                    <div className="bg-gray-300 p-3 sm:p-4 mb-3 sm:mb-4 rounded-lg w-fit">
                        <h1 className="text-lg sm:text-3xl md:text-4xl text-accents font-semibold">
                            Ruang<span className="text-primary">Nganggur.</span>
                        </h1>
                    </div>
                    <h1 className="text-white text-base sm:text-4xl md:text-6xl font-semibold tracking-widest">
                        #CariKerja
                    </h1>
                </div>
            </div>

            {/* Job Seekers Section */}
            <div className="bg-[#F4F7FA] shadow-lg w-full flex flex-col lg:flex-row lg:items-center py-8 sm:py-10 md:py-14">
                <div className="lg:w-1/2 px-4 sm:px-6 md:px-14 tracking-widest font-medium text-base sm:text-lg md:text-xl text-center lg:text-left">
                    <p className="leading-relaxed">
                        Lebih dari 12.000 pencari kerja telah mempercayakan{" "}
                        <br className="hidden md:block" /> langkah awal karier mereka
                        bersama kami.
                    </p>
                </div>
                <div className="mt-4 sm:mt-5 lg:mt-0 lg:w-1/2 flex bg-primary rounded-l-[20px] md:rounded-l-[40px] items-center text-white p-4 sm:p-6 gap-x-2 sm:gap-x-4">
                    <img
                        // @ts-ignore
                        src={images_source['../bag.png'].default}
                        alt="Job Bag"
                        className="w-16 sm:w-20 md:w-auto"
                    />
                    <div className="text-center mx-auto text-xl sm:text-2xl md:text-6xl tracking-widest font-medium">
                        <h1>12.000+</h1>
                        <h1>Pelamar</h1>
                    </div>
                </div>
            </div>

            {/* Companies Section */}
            <div className="border-2 bg-[#EBF1F6] shadow-lg w-full flex flex-col lg:flex-row lg:items-center py-8 sm:py-10 md:py-14">
                <div className="justify-end mt-4 sm:mt-5 lg:mt-0 lg:w-1/2 flex bg-primary rounded-r-[20px] md:rounded-r-[40px] items-center text-white p-4 sm:p-6 gap-x-2 sm:gap-x-4">
                    <div className="text-center mx-auto text-xl sm:text-2xl md:text-6xl tracking-widest font-medium">
                        <h1>12.000+</h1>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl">Perusahaan</h1>
                    </div>
                    <img
                        // @ts-ignore
                        src={images_source["../building.png"].default}
                        alt="Job Bag"
                        className="w-16 sm:w-20 md:w-auto"
                    />
                </div>

                <div className="lg:w-1/2 px-4 sm:px-6 md:px-14 tracking-widest font-medium text-base sm:text-lg md:text-xl text-center lg:text-right">
                    <p className="leading-relaxed">
                        Lebih dari 12.000 perusahaan telah mempercayakan{" "}
                        <br className="hidden md:block" /> langkah awal bisnis mereka
                        bersama kami.
                    </p>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="shadow-lg bg-[#E8EDF1] tracking-widest font-semibold flex flex-col items-center justify-center px-4 sm:px-6">
                <div className="py-6 sm:py-8 md:py-10 w-full max-w-2xl">
                    <div className="py-6 sm:py-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center">Join Our Journey</h1>
                    </div>
                    <NavLink to="/auth" className="block w-full">
                        <div className="mx-auto flex justify-center">
                            <button className="btn-accent py-2 px-4 rounded-lg w-full sm:w-2/3 md:w-1/2 text-lg sm:text-xl transition-all hover:scale-105">
                                Register
                            </button>
                        </div>
                    </NavLink>
                </div>
            </div>
        </LandingLayout>
    );
};

export default About;