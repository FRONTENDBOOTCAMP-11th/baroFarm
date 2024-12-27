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
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "cover",
        }}
      />
      <div className="absolute flex bottom-3 left-3 bg-white/80 rounded-lg px-3 py-1 items-center gap-2">
        <span className="text-red1 font-semibold text-lg pr-1">
          {item.sale}
        </span>
        <span className="text-[14px] line-clamp-1">
          {item.content} ({item.rate})
        </span>
      </div>
    </SwiperSlide>
  ));

  return (
    <section
      style={{ width: `${width}px`, height: `${height}px` }}
      className="flex text-center mb-[10px] relative"
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
        }}
        loop={true}
      >
        {slides}
      </Swiper>
    </section>
  );
}
