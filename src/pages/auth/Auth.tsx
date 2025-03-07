import images_source from '@/assets/get/images'
import AuthLayout from '@components/AuthLayout'
import OurRoute from '@utils/route'
const Auth = () => {
    return (
        <AuthLayout>
            <div className="flex flex-col justify-center items-center flex-grow px-6">
                <div className="font-semibold text-primary text-center">
                    {/* @ts-ignore */}
                    <img src={images_source["../logo-horizontal.png"].default} className="w-full" />
                </div>
                <div className="w-full sm:w-3/4 justify-between flex flex-col sm:flex-row gap-6">
                    <a
                        href={`${OurRoute.DataRoute["Register Role"]}employer`}
                        className="relative w-full text-nowrap bg-accents text-center text-white px-10 py-4 rounded-full text-base sm:text-lg group"
                    >
                        Employer
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Untuk mitra perusahaan
                        </span>
                    </a>
                    <a
                        href={`${OurRoute.DataRoute["Register Role"]}jobseeker`}
                        className="relative w-full text-nowrap bg-primary text-white text-center px-10 py-4 rounded-full text-base sm:text-lg group"
                    >
                        Job Seeker
                        <span className="absolute left-1/2 -top-10 -translate-x-1/2 px-2 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            Untuk alumni SMKN 4 BANDUNG
                        </span>
                    </a>

                </div>
                <div className="w-full text-center pt-5">
                    Already have account? <a href={OurRoute.DataRoute["Login"]} className="text-center text-primary underline font-semibold mt-4">Login</a>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Auth
