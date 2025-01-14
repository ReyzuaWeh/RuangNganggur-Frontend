import images_source from "@/assets/get/images";
import HomeSwiper from "@components/HomeSwiper";
import LandingLayout from "@components/LandingLayout";
import { NavLink } from "react-router-dom";

const About = () => {
    return (
        <>
            <LandingLayout>
                <div className="bg-gradient-home flex flex-col">
                    <HomeSwiper />
                    <div className="p-6 md:p-10 flex flex-col justify-start items-start">
                        <div className="bg-gray-300 p-4 mb-4 rounded-lg">
                            <h1 className="text-3xl md:text-4xl text-accents font-semibold">
                                Ruang<span className="text-primary">Nganggur.</span>
                            </h1>
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl font-semibold tracking-widest">
                            #CariKerja
                        </h1>
                    </div>
                </div>

                <div className="bg-[#F4F7FA] shadow-lg w-full flex flex-col lg:flex-row lg:items-center py-14">
                    <div className="lg:w-1/2 px-6 md:px-14 tracking-widest font-medium text-lg md:text-xl text-center lg:text-left">
                        <p>
                            Lebih dari 12.000 pencari kerja telah mempercayakan{" "}
                            <br className="hidden md:block" /> langkah awal karier mereka
                            bersama kami.
                        </p>
                    </div>
                    <div className="mt-5 lg:mt-0 lg:w-1/2 flex bg-primary rounded-l-[20px] md:rounded-l-[40px] items-center text-white p-6 gap-x-4">
                        {/* @ts-ignore */}
                        <img src={images_source['../bag.png'].default} alt="Job Bag" className="" />
                        <div className="text-center mx-auto text-2xl md:text-6xl tracking-widest font-medium">
                            <h1>12.000+</h1>
                            <h1>Pelamar</h1>
                        </div>
                    </div>
                </div>

                <div className="border-2 bg-[#EBF1F6] shadow-lg w-full flex flex-col lg:flex-row lg:items-center py-14">
                    <div className="justify-end mt-5 lg:mt-0 lg:w-1/2 flex bg-primary rounded-r-[20px] md:rounded-r-[40px] items-center text-white p-6 gap-x-4">
                        <div className="text-center mx-auto text-2xl md:text-6xl tracking-widest font-medium">
                            <h1 className="">12.000+</h1>
                            <h1 className="text-4xl">Perusahaan</h1>
                        </div>
                        {/* @ts-ignore */}
                        <img src={images_source["../building.png"].default} alt="Job Bag" className="" />
                    </div>

                    <div className="lg:w-1/2 px-6 md:px-14 tracking-widest font-medium text-lg md:text-xl text-center lg:text-right">
                        <p className="">
                            Lebih dari 12.000 perusahaan telah mempercayakan{" "}
                            <br className="hidden md:block" /> langkah awal bisnis mereka
                            bersama kami.
                        </p>
                    </div>
                </div>

                <div className="shadow-lg bg-[#E8EDF1] tracking-widest font-semibold flex flex-col items-center justify-center">
                    <div className="py-10">
                        <div className="py-8">
                            <h1 className="text-6xl">Join Our Journey</h1>
                        </div>
                        <NavLink
                            to="/auth">
                            <div className="mx-auto flex justify-center">
                                <button className="btn-accent py-2 px-4 rounded-lg w-1/2">
                                    Register
                                </button>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </LandingLayout>
        </>
    );
};

export default About;
