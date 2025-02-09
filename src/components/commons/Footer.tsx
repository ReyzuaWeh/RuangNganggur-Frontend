import OurRoute from "@utils/route"
import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <div className='shadow-lg bg-white relative bottom-0'>
            <div className='flex justify-between items-center px-4 py-8'>
                <div className='p-4 hidden md:block'>
                    <h1 className="font-semibold text-md sm:text-lg md:text-2xl">
                        <span className="text-accents">Ruang</span>Nganggur
                    </h1>
                </div>
                <div className='flex gap-10 md:flex-row flex-col text-sm mr-6'>
                    <div>
                        <p className='text-accents mb-2'>Company</p>
                        <ul className='flex flex-col gap-y-1'>
                            <li>
                                <NavLink to={OurRoute.DataRoute["About"]}>
                                    About Us
                                </NavLink>
                            </li>
                            <li>Blog</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-accents mb-2'>Contact Us</p>
                        <ul className='flex flex-col gap-y-1'>
                            <li>(022) 7303736</li>
                            <li>Jl. Kliningan No. 6</li>
                            <li>info@smkn4bdg.sch.id</li>
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