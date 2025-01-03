// React와 라우터 관련
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// 컴포넌트
import HeaderIcon from "@components/HeaderIcon";
import Products from "@components/Products";

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
      leftChild: <HeaderIcon name="back" onClick={() => navigate("/")} />,
      title: "검색어",
    });
  }, []);

  return (
    <div>
      <div className="p-5 flex items-center font-semibold">
        <h2>총 4개</h2>
        <div className="ml-auto text-sm">
          <select
            className=" text-center bg-gray2 rounded-lg py-1 ps-3 pe-6 appearance-none focus:outline-none cursor-pointer
    bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem]"
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
      </div>
      {/* 검색 결과 없을 때와 있을 때의 조건부 렌더링 */}
      {productsData.length === 0 ? (
        <div className="p-5 text-sm text-center font-medium mt-3">
          <img className="block m-auto mb-2" src="/icons/icon_sad.svg" alt="검색 결과 없음을 나타내는 슬픈 표정" />
          <p>입력하신 검색어의 결과를 찾을 수 없습니다.</p>
          <p>다른 검색어로 시도하시거나 맞춤법을 확인해주세요.</p>
        </div>
      ) : (
        <Products productsData={productsData} />
      )}
    </div>
  );
}
