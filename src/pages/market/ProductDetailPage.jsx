import { useParams } from "react-router-dom";
import productImage1 from "/images/Sample1.svg";
import forwardIcon from "/icons/icon_forward_thin.svg";

export default function ProductDetailPage() {
  // const { _id } = useParams();
  // _id 사용해서 데이터 가져오기

  const productsData = {
    // example
    id: 1,
    image: productImage1,
    title: "온도감",
    content: "촉촉함이 다른 카스테라 5종...",
    sale: "92%",
    price: "14,900원",
    rate: "⭐️ 4.9",
    review: "2,210",
  };

  return (
    <>
      <img src={productsData.image} />
      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center gap-[10px] pb-5">
          <img
            src={productsData.image}
            className="w-[25px] h-[25px] rounded-full"
          />
          <span className="font-semibold ">{productsData.title}</span>
        </div>

        <p>{productsData.content}</p>

        <span className="font-semibold text-xs pr-2">{productsData.rate}</span>
        <span className="text-xs">{productsData.review}개 후기</span>

        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">
            {productsData.sale}
          </span>
          <span className="font-extrabold text-lg">{productsData.price}</span>
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center justify-between">
          <span className="font-bold">후기 {productsData.review}개</span>
          <span className="font-medium text-sm text-gray5">전체보기 ></span>
        </div>
        <div className="mt-5 p-5 border border-gray3 rounded-[10px]">
          <p className="font-medium text-xs text-gray4 pb-1">
            옵션: {productsData.content}
          </p>
          <p className="font-medium text-sm text-gray5">
            대만 카스테라를 너무 좋아하던 1인으로서 이 카스테라 정말 맛있네요
            대만 카스테라가 빛의 속도로
          </p>
        </div>
      </section>
    </>
  );
}
