import LandingLayout from '@components/LandingLayout'

const Applicant = () => {
    return (
        <LandingLayout>
            <div className='bg-white '>
                <div className='h-[69.9vh] flex flex-col justify-center items-center text-lg'>
                    <img src="/assets/locked.png" alt="Locked Page" />
                    <p>Sorry This Page is Not Available</p>
                    <p>Please Sign In As Employee To Access This Page</p>
                </div>
            </div>
        </LandingLayout>
    )
}

export default Applicant