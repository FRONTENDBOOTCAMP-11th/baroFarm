import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

// image
import productImage1 from "/images/Sample1.svg";
import productImage2 from "/images/Sample2.svg";
import Product from "@components/Product";

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

export default function MainPage() {
  // Outlet 컴포넌트로 전달받은 props.setHeadetContents 접근
  const { setHeadetContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadetContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: <img src="/images/BaroFarmLogo.svg" alt="홈 버튼" />,
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  return (
    <div>
      <section className="flex h-[225px] bg-gray2 text-center mb-[10px]">
        특가상품 캐러셀
      </section>
      <section className="px-5 mb-4">
        <h2 className="text-xl mb-3">
          관심있는 <span className="font-bold">카테고리</span> 선택하기
        </h2>
        <div className="category-div grid grid-cols-4 gap-y-[6px] gap-x-[14px] text-[14px] *:flex *:flex-col *:text-center">
          <div>
            <img src="/images/menu/Fruit_full.svg" alt="제철 과일 카테고리" />
            <span>제철 과일</span>
          </div>
          <div>
            <img src="/images/menu/Vegetable_full.svg" alt="채소 카테고리" />
            <span>채소</span>
          </div>
          <div>
            <img src="/images/menu/Kimchi_full.svg" alt="김치 카테고리" />
            <span>김치</span>
          </div>
          <div>
            <img src="/images/menu/Livestock_full.svg" alt="축산물 카테고리" />
            <span>축산물</span>
          </div>
          <div>
            <img src="/images/menu/Seefood_full.svg" alt="수산물 카테고리" />
            <span>수산물</span>
          </div>
          <div>
            <img src="/images/menu/Simple_full.svg" alt="간편식품 카테고리" />
            <span>간편식품</span>
          </div>
          <div>
            <img src="/images/menu/Ricecake_full.svg" alt="떡 카테고리" />
            <span>떡</span>
          </div>
          <div>
            <img src="/images/menu/Rice_full.svg" alt="쌀/잡곡 카테고리" />
            <span>쌀/잡곡</span>
          </div>
        </div>
      </section>
      <section className="px-5 mb-4">
        <div className="flex justify-between">
          <h2 className="text-xl">
            지금 최고 <span className="font-bold">인기 상품!</span>
          </h2>
          <div className="flex gap-1 items-start relative *:relative *:top-1">
            <span className="text-xs">더보기</span>
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {productsData.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </section>
      <section className="px-5 mb-4">
        <div className="flex justify-between">
          <h2 className="text-xl">
            따끈따끈한 <span className="font-bold">신상품!</span>
          </h2>
          <div className="flex gap-1 items-start relative *:relative *:top-1">
            <span className="text-xs">더보기</span>
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {productsData.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </section>
      <section className="px-5 mb-4">
        <div className="flex justify-between">
          <h2 className="text-xl">
            이 맛이야! <span className="font-bold">제철 음식</span>
          </h2>
          <div className="flex gap-1 items-start relative *:relative *:top-1">
            <span className="text-xs">더보기</span>
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
