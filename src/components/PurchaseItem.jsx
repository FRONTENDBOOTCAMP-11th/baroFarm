import PhotoReviewItem from "@components/PhotoReviewItem";
import { Link } from "react-router-dom";

export default function PurchaseItem(product) {
  const isReviewed = false;

  console.log(product);
  return (
    <section className="flex gap-5 border-b-[0.5px] border-gray2 py-3">
      <PhotoReviewItem />
      <div className="py-3 text-sm w-full relative">
        <p className="font-semibold">너구리 앵그리 121g, 5개</p>
        <p className="text-xs  text-gray5 py-1 pb-3"> 📦 12/31(화) 배송 완료</p>
        <span className="font-semibold">4,280 원</span>
        <span className="ml-4">1개</span>
        <Link
          to={isReviewed ? "/product/1/reviewed" : "/product/1/reviews/new"}
          className="text-xs absolute bottom-4 right-0 border-b border-gray5 text-gray5 hover:text-btn-primary hover:border-b-btn-primary"
        >
          {isReviewed ? "후기 보기" : "후기 작성"}
        </Link>
      </div>
    </section>
  );
}
