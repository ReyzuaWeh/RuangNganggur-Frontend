import AuthSwiper from '@components/AuthSwiper'
const Auth = () => {
    return (
        <>
            <section className="bg-gradient flex flex-col lg:flex-row w-full">
                <div className=" lg:block h-[95vh] w-full lg:w-1/2 p-16">
                    {/* <img 
            src="/assets/auth-landing.png" 
            alt="Auth Landing" 
            className="h-full w-full" 
          /> */}
                    <AuthSwiper />
                </div>

                <div className="w-full lg:w-1/2 h-screen flex flex-col">

                    <div className="flex flex-col justify-center items-center flex-grow px-6">
                        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl text-primary text-center">
                            <span className="text-yellow-400">Ruang</span>Nganggur
                        </h1>


                        <div className="w-full sm:w-3/4 flex justify-between flex-col sm:flex-row gap-6 mt-14">
                            <a
                                href='/auth/register/employer'
                                className="w-full bg-accents text-center text-white px-10 py-4 rounded-full text-base sm:text-lg">
                                Employer
                            </a>
                            <a
                                href='/auth/register/jobseeker'
                                className="w-full bg-primary text-white text-center px-10 py-4 rounded-full text-base sm:text-lg">
                                Job Seeker
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Auth
