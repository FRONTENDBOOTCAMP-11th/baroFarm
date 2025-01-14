import PropTypes from "prop-types";
import productImage from "/images/Sample1.svg";

SoldItem.propTypes = {
  item: PropTypes.shape().isRequired,
};

export default function SoldItem({ item }) {
  console.log(item, "데이터");
  const productSelling = item.quantity - item.buyQuantity > 0 ? true : false;
  return (
    <section className="flex gap-5 py-3 items-center">
      <img
        src={"https://11.fesp.shop" + item.mainImages[0].path}
        className=" w-[100px] h-[100px] aspect-square object-cover rounded-md"
      />
      <div className="text-sm">
        <p className="font-semibold break-keep">{item.name}</p>
        <p className="text-xs  text-gray5 py-1 pb-3">
          {/* {productSelling
            ? "현재 판매 중" */}
          {new Date(item.updatedAt).toLocaleString("ko-kr", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "short",
          }) + " 판매 완료"}
        </p>
        <span className="text-red1 font-semibold pr-1">{item.extra.sale}%</span>
        <span className="font-semibold">
          {item.extra.saledPrice.toLocaleString()} 원
        </span>
        {/* 판매된 갯수 */}
        <span className="ml-4">{item.buyQuantity}개</span> 판매
        <div>
          남은 수량: <span>{item.quantity - item.buyQuantity}</span>개
        </div>
      </div>
    </section>
  );
}
