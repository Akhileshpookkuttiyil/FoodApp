// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";

// Import images
import HeroImg1 from "../../../../assets/img/hero1.png";
import HeroImg2 from "../../../../assets/img/hero2.png";
import HeroImg3 from "../../../../assets/img/hero3.png";
import HeroImg4 from "../../../../assets/img/hero4.png";
import HeroImg5 from "../../../../assets/img/hero5.png";

import { Autoplay, EffectCards } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      loop={true}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectCards]}
      className="mySwiper"
    >
      {[HeroImg1, HeroImg2, HeroImg3, HeroImg4, HeroImg5].map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Hero Img-${index + 1}`}
            className="w-full aspect-square object-contain object-center"
            loading="lazy" // Lazy loading for better performance
            onError={(e) => (e.target.src = "/path/to/default-image.png")} // Fallback image
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
