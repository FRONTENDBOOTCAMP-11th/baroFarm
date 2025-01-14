import PhotoReviewItem from "@components/PhotoReviewItem";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

PurchaseItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  orderId: PropTypes.number.isRequired,
};

export default function PurchaseItem({ orderId, product, date }) {
  const isReviewed = false;
  const [year, month, day] = date.split(".");
  const arriveDate = `${month}/${day.split(" ")[0]}`;
  console.log(product);
  return (
    <section className="flex gap-5 border-b-[0.5px] border-gray2 py-3 items-center">
      <PhotoReviewItem image={product.image.path} />
      <div className="py-3 text-sm w-full relative">
        <p className="font-semibold">{product.name}</p>
        <p className="text-xs  text-gray5 py-1 pb-3">
          📦 {arriveDate} 구매 완료
        </p>
        <span className="font-semibold">
          {(
            (product.extra?.saledPrice ?? product.price) * product.quantity
          ).toLocaleString()}
          원
        </span>
        <span className="ml-4">{product.quantity}개</span>
        <Link
          to={
            isReviewed
              ? `/product/${product._id}/reviewed`
              : `/product/${product._id}/reviews/new/${orderId}`
          }
          className="text-xs absolute bottom-4 right-0 border-b border-gray5 text-gray5 hover:text-btn-primary hover:border-b-btn-primary"
        >
          {isReviewed ? "후기 보기" : "후기 작성"}
        </Link>
      </div>
    </section>
  );
}
