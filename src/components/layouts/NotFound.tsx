import images_source from "@/assets/get/images";
import { useState } from "react";
const NotFound = () => {
    const [data, setdata] = useState({
        anjay: "",
        agus: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setdata((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <section className="bg-gradient min-h-screen flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-1/3">
                {/* <img src="/assets/overlay.png" alt="" className='w-full h-full' /> */}
            </div>

            <div className="relative flex flex-col justify-center items-center w-full max-w-md md:max-w-lg px-4 sm:px-8">
                <div className="w-full bg-white shadow-md p-6 sm:p-10 text-center rounded-xl">
                    <img
                        //@ts-ignore
                        src={images_source['../notfound-logo.png'].default}
                        alt="Not Found Icon"
                        className="w-30 h-30  mx-auto mb-4"
                    />
                    <h1 className="font-semibold text-lg sm:text-2xl">
                        404
                    </h1>
                    <p className="text-sm sm:text-base mt-2">
                        Sorry, page not found.
                    </p>
                    <input type="text" name="agus" value={data.agus}
                        onChange={handleChange}
                    ></input>
                    <p>{data.agus}</p>
                    <a
                        href="/"
                        className="block w-3/4 mx-auto bg-green-600 text-white  py-3 mt-8 rounded-md"
                    >
                        Back to home
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
