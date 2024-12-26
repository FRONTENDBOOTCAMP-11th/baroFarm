import { useEffect } from "react";
import {
  useNavigate,
  useOutletContext,
  useParams,
  Link,
} from "react-router-dom";

import productImage1 from "/images/Sample1.svg";
import forwardIcon from "/icons/icon_forward.svg";

import HeaderIcon from "@components/HeaderIcon";
import ReviewItem from "@components/ReviewBox";

export default function ProductDetailPage() {
  // const { _id } = useParams();
  // _id 사용해서 데이터 가져오기

  const productsData = {
    // example
    id: 1,
    image: productImage1,
    title: "온도감",
    option: "촉촉함이 다른 카스테라 5종...",
    content:
      "대만 카스테라를 너무 좋아하던 1인으로서 이 카스테라 정말 맛있네요",
    sale: "92%",
    price: "14,900원",
    rate: "⭐️ 4.9",
    review: "2,210",
    productContent:
      '\n          <div class="product-detail">\n            <p>레고 테크닉 42151 부가티 볼리드 상세 설명</p>\n          </div>',
  };

  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "제철과일",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

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

        <p>{productsData.option}</p>

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
          <Link
            to={`/product/${productsData.id}/reviews`}
            className="font-medium text-sm text-gray5 flex items-center"
          >
            전체보기
            <img src={forwardIcon} className="w-3" />
          </Link>
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide">
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
          <ReviewItem
            option={productsData.option}
            content={productsData.content}
          />
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div
          dangerouslySetInnerHTML={{ __html: productsData.productContent }}
        />
      </section>
    </>
  );
}
