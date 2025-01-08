import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import PropTypes from "prop-types";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
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

  const [isLiked, setIsLiked] = useState(product.bookmarks || false);
  // mybookmarkid 사용

  const { mutate: addLike } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://11.fesp.shop/bookmarks/product`,
        {
          target_id: product._id,
        },
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.item;
    },

    onSuccess: () => {
      setIsLiked(true);
      // 캐시된거 제거하기
    },
    onError: () => {
      console.error("찜 추가 실패: ", error);
    },
  });

  const {
    data: likeItem,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["like", product._id],
    queryFn: async () => {
      const response = await axios.get(
        `https://11.fesp.shop/bookmarks/product/${product._id}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.item;
    },
    enabled: !!isLiked,
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://11.fesp.shop/bookmarks/${likeItem?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setIsLiked(false);
    },
    onError: () => {
      console.error("좋아요 삭제 실패: ", error);
    },
  });

  const handleLike = () => {
    if (isLiked && likeItem?._id) {
      removeLike();
    } else {
      addLike();
    }
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
            {product.extra.saledPrice.toLocaleString()}원
          </span>
        </div>
        <span className="font-semibold text-xs pr-2">
          ⭐️ {product.rating ? product.rating.toFixed(1) : 0}
        </span>
        <span className="text-gray4 font-regular text-xs ">
          ({product.replies})
        </span>
      </div>
    </section>
  );
}
