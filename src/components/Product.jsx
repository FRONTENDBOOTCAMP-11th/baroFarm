import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

Product.propTypes = {
  _id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  mainImages: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  extra: PropTypes.shape({
    sale: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  price: PropTypes.number.isRequired,
  replies: PropTypes.number.isRequired, // 댓글 배열
};

export default function Product(product) {
  // console.log(product);

  const navigate = useNavigate();

  const goDetailPage = () => {
    navigate(`/product/${product._id}`);
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
          alt={product.name}
          src={`https://11.fesp.shop${product.mainImages[0]?.path}`}
        />
        <button
          className="absolute bottom-3 right-3 bg-white p-1.5 rounded-full shadow-bottom"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <img
            className="w-5"
            src={isLiked ? likeIcon.active : likeIcon.default}
          />
        </button>
      </div>
      <div className="pl-[5px] pt-[10px]">
        <span className="font-semibold pt-[10px] text-sm">
          {product.seller.name}
        </span>
        <p className="text-xs line-clamp-1">{product.name}</p>
        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">
            {product.extra.sale}%
          </span>
          <span className="font-extrabold text-lg">
            {Intl.NumberFormat().format(product.price)}원
          </span>
        </div>
        <span className="font-semibold text-xs pr-2">
          ⭐️ {product.extra.rating}
        </span>
        <span className="text-gray4 font-regular text-xs ">
          ({product.replies})
        </span>
      </div>
    </section>
  );
}
