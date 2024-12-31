import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

export default function Product({
  id,
  image,
  title,
  content,
  sale,
  price,
  rate,
  review,
}) {
  const navigate = useNavigate();

  const goDetailPage = () => {
    navigate(`/product/${id}`);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <section
      className="flex flex-col w-[165px] cursor-pointer"
      onClick={goDetailPage}
    >
      <div className="relative">
        <img
          className="h-[165px] rounded-lg object-cover"
          alt={title}
          src={image}
        />
        <button
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-bottom"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <img src={isLiked ? likeIcon.active : likeIcon.default} />
        </button>
      </div>
      <div className="pl-[5px] pt-[10px]">
        <span className="font-semibold pt-[10px] text-sm">{title}</span>
        <p className="text-xs line-clamp-1">{content}</p>
        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">{sale}</span>
          <span className="font-extrabold text-lg">{price}</span>
        </div>
        <span className="font-semibold text-xs pr-2">{rate}</span>
        <span className="text-gray4 font-regular text-xs ">{review}</span>
      </div>
    </section>
  );
}
