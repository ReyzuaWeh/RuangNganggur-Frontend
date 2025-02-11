import images_source from "@/assets/get/images";
import OurRoute from "@utils/route";

const Success = () => {
    return (
        <>
            <section className="bg-gradient min-h-screen flex items-center justify-center">
                <div className="absolute top-0 left-0 w-full h-1/3">
                    {/* @ts-ignore */}
                    <img src={images_source["../overlay.png"].default} alt="" className='w-full h-full' />
                </div>

                <div className="relative flex flex-col justify-center items-center w-full max-w-md md:max-w-lg px-4 sm:px-8">
                    <div className="w-full bg-white shadow-md p-6 sm:p-10 text-center rounded-xl">
                        <img
                            // @ts-ignore
                            src={images_source["../success-logo.png"].default}
                            alt="Logout Icon"
                            className="w-30 h-30  mx-auto mb-4"
                        />
                        <h1 className="font-semibold text-lg sm:text-2xl">
                            Login was successful!
                        </h1>
                        <p className="text-sm sm:text-base mt-2">
                            Welcome back, User! We glad to have you here.
                        </p>

                        <a
                            href={OurRoute.DataRoute["Profile"]}
                            className="block w-full btn-primary  py-3 mt-8 rounded-full"
                        >
                            Continue
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Success;
