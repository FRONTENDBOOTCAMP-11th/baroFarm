import Button from "@components/Button";
import CartItem from "@components/CartItem";
import HeaderIcon from "@components/HeaderIcon";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const DUMMY_CARTS_ITEMS = {
  ok: 1,
  item: [
    {
      _id: 1,
      product_id: 1,
      quantity: 2,
      createdAt: "2024.04.01 08:36:39",
      updatedAt: "2024.04.01 08:36:39",
      product: {
        _id: 1,
        name: "[소스증정] 반값!! 고니알탕 (겨울 기획상품)",
        price: 14900,
        seller_id: 2,
        quantity: 1,
        buyQuantity: 310,
        image: {
          url: "/images/sample/food.svg",
          fileName: "sample-dog.jpg",
          orgName: "스턴트 독.jpg",
        },
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC03", "PC0301"],
          sort: 5,
          seller_name: "팔도다옴",
          option: "고니알탕 500g * 4팩",
          discount: 0.09,
        },
      },
    },
    {
      _id: 2,
      product_id: 1,
      quantity: 2,
      createdAt: "2024.04.01 08:36:39",
      updatedAt: "2024.04.01 08:36:39",
      product: {
        _id: 1,
        name: "[소스증정] 반값!! 고니알탕 (겨울 기획상품)",
        price: 14900,
        seller_id: 2,
        quantity: 1,
        buyQuantity: 310,
        image: {
          url: "/images/sample/food.svg",
          fileName: "sample-dog.jpg",
          orgName: "스턴트 독.jpg",
        },
        extra: {
          isNew: true,
          isBest: true,
          category: ["PC03", "PC0301"],
          sort: 5,
          seller_name: "팔도다옴",
          option: "고니알탕 500g * 4팩",
          discount: 0.09,
        },
      },
    },
  ],
  cost: {
    products: 29800,
    shippingFees: 2500,
    discount: {
      products: 0,
      shippingFees: 2500,
    },
    total: 29800,
  },
};

const DUMMY_EMPTY_CARTS = {
  ok: 1,
  item: [],
};

export default function CartPage() {
  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);
  // targetRef가 보이면 결제버튼을 보이게 함
  const targetRef = useRef(null);

  // 헤더 상태 설정 함수
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    // 헤더 상태 설정
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "장바구니",
    });

    // 스크롤에 따라 결제버튼 보이게 하기
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 타겟이 보이면 버튼 표시 상태 변경
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      },
      {
        // 뷰포트를 기준으로 감지
        root: null,
        // 10%만 보이면 트리거
        threshold: 0.1,
      }
    );

    const targetElement = targetRef.current;

    // 조건부 렌더링으로 targetRef가 사용하는 요소가 동적으로 생성되거나 사라질 경우에 에러를 발생시키지 않기 위해 조건문으로 검사 필요.
    if (targetElement) {
      observer.observe(targetElement);
    }

    // 컴포넌트 언마운트시 옵저버 해제 (메모리 누수 방지)
    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, []);

  const cartItems = DUMMY_CARTS_ITEMS.item.map((item) => (
    <CartItem key={item._id} {...item.product} />
  ));

  const totalShippingFees =
    DUMMY_CARTS_ITEMS.cost.shippingFees ===
    DUMMY_CARTS_ITEMS.cost.discount.shippingFees
      ? "무료"
      : DUMMY_CARTS_ITEMS.cost.shippingFees;

  return (
    <div className="">
      {cartItems.length > 0 ? (
        <>
          <section className="py-[14px] px-5 flex gap-[6px] items-center border-b border-gray2">
            <input type="checkbox" id="checkAll" />
            <label htmlFor="checkAll" className="grow">
              전체 선택 (1/2)
            </label>
            <Button width="44px" height="25px">
              삭제
            </Button>
          </section>
          <section className="px-5 pb-4 border-b-4 border-gray2">
            {cartItems}
          </section>
          <section className="px-5 py-3">
            <div className="border-b border-gray2">
              <div className="text-xs flex justify-between mb-3">
                <span className="text-gray4">총 상품 금액</span>
                <span>
                  {DUMMY_CARTS_ITEMS.cost.products.toLocaleString()}원
                </span>
              </div>
              <div className="text-xs flex justify-between mb-3">
                <span className="text-gray4">배송비</span>
                <span>{totalShippingFees}</span>
              </div>
            </div>
            <div className="flex justify-between mb-3 py-3 text-[16px] font-bold">
              <span>총 결제 금액</span>
              <span>{DUMMY_CARTS_ITEMS.cost.total.toLocaleString()}원</span>
            </div>
          </section>
          <div
            ref={targetRef}
            style={{ height: "1px", background: "transparent" }}
          ></div>
          <section
            className={clsx(
              "max-w-[390px] mx-auto px-5 py-8 bg-gray1 shadow-top fixed left-0 right-0 transition-all duration-150 ease-in-out",
              showButton ? "bottom-0 opacity-100" : "-bottom-24 opacity-0"
            )}
          >
            <Link to="/payment">
              <button className="bg-btn-primary py-3 w-full text-white text-xl font-bold rounded-lg">
                {DUMMY_CARTS_ITEMS.cost.total.toLocaleString()}원 구매하기
              </button>
            </Link>
          </section>
        </>
      ) : (
        <>
          <section className="pt-[100px] flex flex-col gap-[10px] items-center text-[14px]">
            <span className="text-gray4">담은 상품이 없습니다.</span>
            <span className="text-bg-primary underline">쇼핑하러 가기</span>
          </section>
        </>
      )}
    </div>
  );
}
