import images_source from "@/assets/get/images";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/effect-coverflow";

const AuthSwiper = () => {
    return (
        <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-screen-xl mx-auto"
        >
            <SwiperSlide className="relative">
                <div className="relative overflow-hidden">
                    <img
                        //@ts-ignore
                        src={images_source['../auth-landing.png'].default}
                        alt="Auth Landing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[115px]"></div>
                </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="relative">
                <div className="relative w-full h-full overflow-hidden">
                    <img
                        //@ts-ignore
                        src={images_source['../register-landing.png'].default}
                        alt="Login Landing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[115px]"></div>
                    <div className="absolute bottom-[80px] left-[60px] z-10 font-medium text-white">
                        <p className="text-5xl mb-4">Yuk, #CariKerja di</p>
                        <p className="text-6xl">
                            <span className="text-primary">BKK </span> <span className="text-accents">SMKN 4</span>
                        </p>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="relative">
                <div className="relative w-full h-full overflow-hidden">
                    <img
                        //@ts-ignore
                        src={images_source['../register-landing.png'].default}
                        alt="Register Landing"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[115px]"></div>
                    <div className="absolute bottom-[80px] left-[60px] z-10 font-medium text-5xl text-white">
                        <p className="mb-3">Kami memiliki 12.000+ klien di</p>
                        <p>seluruh Indonesia.</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default AuthSwiper;
