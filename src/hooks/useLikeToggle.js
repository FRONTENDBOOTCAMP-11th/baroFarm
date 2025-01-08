import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export const useLikeToggle = (product) => {
  const [isLiked, setIsLiked] = useState(product.myBookmarkId || false);
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries(["products"], product.extra.category);
    },
    onError: (error) => {
      console.error("찜 추가 실패: ", error);
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `https://11.fesp.shop/bookmarks/${product.myBookmarkId}`,
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
      queryClient.invalidateQueries(["products"], product.extra.category);
    },
    onError: () => {
      console.error("좋아요 삭제 실패: ", error);
    },
  });

  const handleLike = () => {
    if (isLiked && product.myBookmarkId) {
      removeLike();
    } else {
      addLike();
    }
  };

  return {
    isLiked,
    handleLike,
  };
};
