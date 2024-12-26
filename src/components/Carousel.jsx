import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Carousel() {
  return (
    <section className="flex h-[225px] bg-gray2 text-center mb-[10px]">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination, A11y, Autoplay]}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </section>
  );
}
