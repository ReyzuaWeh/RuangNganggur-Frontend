const Footer = () => {
    return (
        <div className='shadow-lg bg-white relative bottom-0'>
            <div className='flex justify-between items-center px-4 py-8'>
                <div className='p-4'>
                    <h1 className="font-semibold text-md sm:text-lg md:text-2xl">
                        <span className="text-accents">Ruang</span>Nganggur
                    </h1>
                </div>
                <div className='flex gap-10 text-sm mr-6'>
                    <div>
                        <p className='text-accents mb-2'>Company</p>
                        <ul className='flex flex-col gap-y-1'>
                            <li>About Us</li>
                            <li>Blog</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-accents mb-2'>Contact Us</p>
                        <ul className='flex flex-col gap-y-1'>
                            <li>Email</li>
                            <li>Hotmail</li>
                        </ul>
                    </div>
                </div>

            </div>
            <hr className='border w-full' />
            <div className='p-4 flex justify-center'>
                <p className='opacity-50 text-sm'>© 2024 RuangNganggur. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer