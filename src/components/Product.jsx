import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

Product.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default function Product({ productId }) {
  // console.log(productId);

  const navigate = useNavigate();

  const goDetailPage = () => {
    navigate(`/product/${productId}`);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axios.get(
        `https://11.fesp.shop/products/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
          },
        }
      );
      return response.data.item;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product</div>;

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
          <span className="font-extrabold text-lg">{product.price}</span>
        </div>
        <span className="font-semibold text-xs pr-2">
          ⭐️ {product.extra.rating}
        </span>
        <span className="text-gray4 font-regular text-xs ">
          ({product.replies.length})
        </span>
      </div>
    </section>
  );
}
