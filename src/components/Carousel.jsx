import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropTypes from "prop-types";

Carousel.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};

export default function Carousel({ width = 390, height, data }) {
  const slides = data.map((item, index) => (
    <SwiperSlide key={item.id}>
      <img
        src={item.image}
        alt={`${index}번 이미지`}
        className={`w-[${width}px] h-[${height}px] object-cover`}
      />
    </SwiperSlide>
  ));

  return (
    <section
      style={{ width: `${width}px`, height: `${height}px` }}
      className="flex text-center mb-[10px]"
    >
      <Swiper
        style={{ height: `${height}}px` }}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination, A11y, Autoplay]}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        {slides}
      </Swiper>
    </section>
  );
}
