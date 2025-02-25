import images_source from "@/assets/get/images";
import LandingLayout from "@components/LandingLayout";

const AboutUs = () => {
    const partnerImages = [
        // @ts-ignore
        images_source["../gabid.jpg"].default,
        // @ts-ignore
        images_source["../ginanjar.jpg"].default,
        // @ts-ignore
        images_source["../natasya1.jpg"].default,
        // @ts-ignore
        images_source["../rafi.jpg"].default,
        // @ts-ignore
        images_source["../sholihin.jpg"].default
    ];

    return (
        <LandingLayout>

            <div className="bg-blue-100 min-h-screen flex items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-6xl">
                    {/* About Us Section */}
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-6 w-full">
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1C3C77] mb-6 md:mb-10">About Us</h2>
                                <p className="text-black text-base md:text-lg">
                                    Bursa Kerja Khusus SMKN 4 Bandung merupakan unit kerja yang memiliki tujuan untuk
                                    memberikan akses kepada alumni yang berminat untuk bekerja dan memberikan kesempatan
                                    perusahaan yang akan melakukan rekrutmen.
                                </p>
                                <p className="text-black text-base md:text-lg mt-2">
                                    Dibawah Disnaker Kota Bandung, dan difokuskan untuk menyalurkan alumni SMKN 4 Bandung
                                    untuk bekerja.
                                </p>
                            </div>
                            <div className="flex-shrink-0 w-48 h-48 md:w-60 md:h-60 relative">
                                {/* @ts-ignore */}
                                <img src={images_source[`../tangan.jpg`].default} alt="About Us" className="rounded-lg w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Our Partner Section */}
                    <div className="mt-10 text-center">
                        <h2 className="text-4xl md:text-5xl text-[#1C3C77] font-bold">Our Partner</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8 md:mt-12 place-items-center">
                            {partnerImages.map((image, index) => (
                                <div key={index} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-gray-300">
                                    <img src={image} alt={`Partner ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
export default AboutUs
