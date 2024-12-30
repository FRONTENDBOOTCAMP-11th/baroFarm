import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import HeaderIcon from "@components/HeaderIcon";
import Product from "@components/Product";
import ProductBig from "@components/ProductBig";
import Carousel from "@components/Carousel";

// image
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

const images = [
  "/images/menu/Fruit.svg",
  "/images/menu/Kimchi.svg",
  "/images/menu/Livestock.svg",
  "/images/menu/Rice.svg",
  "/images/menu/Ricecake.svg",
  "/images/menu/Seafood.svg",
  "/images/menu/Simple.svg",
  "/images/menu/Vegetable.svg",
  "/images/sample/food.svg",
];

const categories = [
  { title: "제철 과일", image: "/images/menu/Fruit.svg" },
  { title: "채소", image: "/images/menu/Vegetable.svg" },
  { title: "김치", image: "/images/menu/Kimchi.svg" },
  { title: "축산물", image: "/images/menu/Livestock.svg" },
  { title: "수산물", image: "/images/menu/Seafood.svg" },
  { title: "간편식품", image: "/images/menu/Simple.svg" },
  { title: "떡", image: "/images/menu/Ricecake.svg" },
  { title: "쌀/잡곡", image: "/images/menu/Rice.svg" },
];

export default function MainPage() {
  // Outlet 컴포넌트로 전달받은 props.setHeaderContents 접근
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
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

  const categoryIcons = categories.map((item, index) => (
    <div key={index}>
      <img src={item.image} alt={`${item.title} 카테고리`} />
      <span>{item.title}</span>
    </div>
  ));

  // 임시 이미지. 나중에 게시글에서 가져올 예정.
  const storyImages = images.map((item, index) => (
    <img key={index} src={item} />
  ));

  return (
    <div>
      <Carousel height={225} data={productsData} />
      <section className="px-5 mb-4">
        <h2 className="text-xl mb-3">
          관심있는 <span className="font-bold">카테고리</span> 선택하기
        </h2>
        <div className="category-div grid grid-cols-4 gap-y-[6px] gap-x-[14px] text-[14px] *:flex *:flex-col *:text-center">
          {categoryIcons}
        </div>
      </section>
      <section className="px-5 mb-4">
        <div className="flex justify-between">
          <h2 className="text-xl">
            지금 최고 <span className="font-bold">인기 상품! 🔥</span>
          </h2>
          <Link to="/search/best" className="text-xs flex gap-1 items-start ">
            더보기
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </Link>
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
            따끈따끈한 <span className="font-bold">신상품! ⏰</span>
          </h2>
          <Link to="/search/new" className="text-xs flex gap-1 items-start ">
            더보기
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </Link>
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
            이 맛이야! <span className="font-bold">제철 음식 🍂</span>
          </h2>
          <Link
            to="/search/seasonal"
            className="text-xs flex gap-1 items-start "
          >
            더보기
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </Link>
        </div>
        <div className="flex overflow-scroll gap-3">
          {productsData.map((product) => (
            <ProductBig key={product.id} {...product} />
          ))}
        </div>
      </section>
      <section className="mb-4">
        <div className="flex justify-between px-5 mb-4">
          <h2 className="text-xl">
            나만의 <span className="font-bold">요리 스토리 🥘</span>
          </h2>
          <div className="flex gap-1 items-start relative *:relative *:top-1">
            <Link to="/board" className="text-xs">
              커뮤니티 가기
            </Link>
            <button>
              <img
                src="/icons/icon_move.svg"
                alt="더보기 버튼"
                className="size-4"
              />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 px-5 gap-1 *:size-[120px] *:object-cover">
          {storyImages}
        </div>
      </section>
      <section className="flex flex-col gap-1 px-5 bg-bg-primary3 text-white text-sm py-5">
        <p className="font-semibold">(주) 농담 사업자 정보</p>
        <p>
          (주)농담 | 대표자 : 넝담~ <br />
          사업자 등록번호 : 023-25-59672 <br />
          주소 : 서울 강남구 옆집의 옆집 234로 무천타워 2층 <br />
          대표번호 : 1588-1028 <br />
          메일 : nongDam@nongDam.co.kr
        </p>
        <p className="font-semibold">고객센터 1800-1800</p>
        <p className="mb-[58px]">
          누구보다 빠르게 남들과는 다르게 상담해 드립니다.
        </p>
        <p>이용약관 | 개인정보처리방침 | 게시글 수집 및 이용 안내</p>
      </section>
    </div>
  );
}
