import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useOutletContext,
  Link,
} from "react-router-dom";

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

  const replies = [
    {
      id: 1,
      name: "떡보 369",
      rate: "⭐️⭐️⭐️⭐️⭐️",
      date: "2024.12.18",
      option: "오리지널 카스테라 530g",
      content:
        "대만 카스테라를 좋아하던 1인으로서 이 카스테라 정말 맛있네요 카스테라가 빛의 속도로 없어지는게 아쉬워요 ㅠㅠ",
    },
    {
      id: 2,
      name: "떡보 369",
      rate: "⭐️⭐️⭐️⭐️⭐️",
      date: "2024.12.18",
      option: "오리지널 카스테라 530g",
      content:
        "대만 카스테라를 좋아하던 1인으로서 이 카스테라 정말 맛있네요 카스테라가 빛의 속도로 없어지는게 아쉬워요 ㅠㅠ",
    },
    {
      id: 3,
      name: "떡보 369",
      rate: "⭐️⭐️⭐️⭐️⭐️",
      date: "2024.12.18",
      option: "오리지널 카스테라 530g",
      content:
        "대만 카스테라를 좋아하던 1인으로서 이 카스테라 정말 맛있네요 카스테라가 빛의 속도로 없어지는게 아쉬워요 ㅠㅠ",
    },
  ];

  return (
    <>
      <section className="p-5 border-b-[1px] border-b-gray2">
        <p className="font-medium pb-2">전체 구매자 평점</p>
        <span className="font-semibold pr-2">⭐️⭐️⭐️⭐️⭐️</span>
        <span className="font-extrabold">4.8</span>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center justify-between">
          <span className="font-bold">사진 후기</span>
          <Link
            to={`/product/1/reviews/photo`}
            className="font-medium text-sm text-gray5 flex items-center"
          >
            더보기
            <img src={forwardIcon} className="w-3" />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide pt-5">
          <PhotoReviewItem />
          <PhotoReviewItem />
          <PhotoReviewItem />
          <PhotoReviewItem />
          <PhotoReviewItem />
          <PhotoReviewItem />
        </div>
      </section>

      <section className="py-5">
        <p className="font-bold pl-5 pb-1">후기 2,210개</p>
        <button
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
        </button>
        {replies.map((reply) => (
          <ReviewItem key={reply.id} reply={reply} />
        ))}
      </section>
    </>
  );
}
