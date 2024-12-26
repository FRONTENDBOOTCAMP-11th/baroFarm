// React와 라우터 관련
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// 컴포넌트
import HeaderIcon from "@components/HeaderIcon";
import Product from "@components/Product";

// 이미지
import productImage1 from "/images/Sample1.svg";
import productImage2 from "/images/Sample2.svg";

const productsData = [
  {
    id: 1,
    image: productImage1,
    title: "온도감",
    content: "촉촉함이 다른 카스테라 5종...",
    sale: "92%",
    price: "14,900원",
    rate: "⭐️ 4.9",
    review: "(2,210)",
  },
  {
    id: 2,
    image: productImage2,
    title: "강아지",
    content: "강아지 귀여워",
    sale: "12%",
    price: "24,900원",
    rate: "⭐️ 3.9",
    review: "(6,210)",
  },
  {
    id: 3,
    image: productImage1,
    title: "햄스터",
    content: "햄스터 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
  {
    id: 4,
    image: productImage2,
    title: "강아지",
    content: "강아지 귀여워",
    sale: "2%",
    price: "4,900원",
    rate: "⭐️ 0.9",
    review: "(210)",
  },
];

export default function SearchResultsPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back_thin" onClick={() => navigate("/")} />,
      title: "검색어",
    });
  }, []);

  return (
    <div>
      <div className="p-5 flex items-center font-semibold">
        <h2 className="text-base">총 4개</h2>
        <select
          className="ml-auto text-sm bg-gray2 rounded-xl p-1 ps-2 pr-4 text-center appearance-none bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[right_4px_center]"
          // 기능 구현이 된다면 최신순으로 수정할 것
          defaultValue="maxPrice"
          aria-label="정렬 기준 선택"
          name="sort"
        >
          <option value="maxPrice">높은 가격순</option>
          <option value="minPrice">낮은 가격순</option>
          <option value="rating">평점순</option>
          <option value="replies">후기 개수순</option>
          <option value="createdAt">최신순</option>
          <option value="buyQuantity">판매 수량순</option>
        </select>
      </div>
      {/* 검색 결과가 없을 때 */}
      <div className="p-5 text-sm text-center font-medium mt-3">
        <img className="block m-auto mb-2" src="/icons/icon_sad.svg" alt="검색 결과 없음을 나타내는 슬픈 표정" />
        <p>입력하신 검색어의 결과를 찾을 수 없습니다.</p>
        <p>다른 검색어로 시도하시거나 맞춤법을 확인해주세요.</p>
      </div>
      {/* 검색 결과가 있을 때*/}
      <section className="px-5 mb-4">
        <div className="flex flex-wrap justify-between">
          {productsData.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </section>
    </div>
  );
}
