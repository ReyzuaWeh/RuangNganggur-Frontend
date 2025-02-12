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
                        className="w-full text-nowrap bg-accents text-center text-white px-10 py-4 rounded-full text-base sm:text-lg">
                        Employer
                    </a>
                    <a
                        href={`${OurRoute.DataRoute["Register Role"]}jobseeker`}
                        className="w-full text-nowrap bg-primary text-white text-center px-10 py-4 rounded-full text-base sm:text-lg">
                        Job Seeker
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
