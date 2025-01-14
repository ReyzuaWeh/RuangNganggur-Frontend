const Logout = () => {
    return (
        <>
            <section className='bg-gradient min-h-screen flex items-center justify-center'>
                {/* <div className='absolute top-0 left-0 w-full h-1/3'>
          <img src="/assets/overlay.png" alt="" className='w-full h-full' />
        </div> */}

                <div className='relative flex flex-col justify-center items-center w-full max-w-md md:max-w-lg px-4 sm:px-8'>
                    <div className="w-full bg-white shadow-md p-6 sm:p-10 text-center rounded-xl">
                        <img
                            src="/assets/logout-icon.png"
                            alt="Logout Icon"
                            className='w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4'
                        />
                        <h1 className='font-semibold text-lg sm:text-2xl'>You are logged out.</h1>
                        <p className='text-sm sm:text-base mt-2'>You need to login back again</p>

                        <a
                            href="/auth/login"
                            className='block w-full btn-primary  py-3 mt-8 rounded-full'
                        >
                            Login
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Logout
