import images_source from '@/assets/get/images';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
//@ts-ignore
import 'swiper/css';
//@ts-ignore
import 'swiper/css/autoplay';

const SwiperComponent = () => {
    const images = [
        //@ts-ignore
        images_source['../slide-1.png'].default,
        //@ts-ignore
        images_source['../slide-2.png'].default,
        //@ts-ignore
        images_source['../slide-3.png'].default,
        //@ts-ignore
        images_source['../slide-4.png'].default,
        //@ts-ignore
        images_source['../slide-5.png'].default,
    ];

    return (
        <Swiper
            slidesPerView={'auto'}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            className="swiper-container mt-10"

            modules={[Autoplay]}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} className="swiper-slide" style={{ width: 'auto', height: '50vh', flexShrink: 0 }}>
                    <img
                        src={image}
                        alt={`slide-${index}`}
                        className="swiper-image"
                        style={{
                            width: '100%',
                            height: '100%',

                        }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperComponent;