import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  Link,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import HeaderIcon from "@components/HeaderIcon";
import forwardIcon from "/icons/icon_forward.svg";

import PhotoReviewItem from "@components/PhotoReviewItem";
import ReviewItem from "@components/ReviewItem";

export default function ReviewPage() {
  const { setHeaderContents } = useOutletContext();

  const navigate = useNavigate();
  const { _id } = useParams();

  const [sortOrder, setSortOrder] = useState("best");

  const handleSort = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "후기",
    });
  }, []);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", _id, "reviews"],
    queryFn: async () => {
      const response = await axios.get(`https://11.fesp.shop/products/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      });
      return response.data.item;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product</div>;

  return (
    <>
      <section className="p-5 border-b-[1px] border-b-gray2">
        <p className="font-medium pb-2">전체 구매자 평점</p>
        <span className="font-semibold pr-2">
          {Array(Math.floor(product.rating)).fill("⭐️")}
        </span>
        <span className="font-extrabold">{product.rating.toFixed(1)}</span>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center justify-between">
          <span className="font-bold">사진 후기</span>
          {/* <Link
          to={`/product/${_id}/reviews/photo`}
          className="font-medium text-sm text-gray5 flex items-center"
        >
          더보기
          <img src={forwardIcon} className="w-3" />
        </Link> */}
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide pt-5">
          {product.replies
            .filter((review) => review.extra && review.extra.image)
            .map((review) => (
              <PhotoReviewItem key={review._id} image={review.extra.image} />
            ))}
        </div>
      </section>

      <section className="py-5">
        <p className="font-bold pl-5 pb-1">후기 {product.replies.length}개</p>
        {/* <button
          className={`pl-5 text-sm font-semibold ${
            sortOrder === "best" ? "text-bg-primary" : "text-gray4"
          }`}
          onClick={() => handleSort("best")}
        >
          평점순
        </button>
        <button
          className={`pl-2 text-sm font-semibold ${
            sortOrder === "new" ? "text-bg-primary" : "text-gray4"
          }`}
          onClick={() => handleSort("new")}
        >
          최신순
        </button> */}
        {product.replies.map((reply) => (
          <ReviewItem
            key={reply._id}
            reply={reply}
            productName={product.name}
          />
        ))}
      </section>
    </>
  );
}
