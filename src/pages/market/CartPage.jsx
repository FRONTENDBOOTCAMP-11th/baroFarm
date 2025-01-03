import Button from "@components/Button";
import CartItem from "@components/CartItem";
import Checkbox from "@components/Checkbox";
import HeaderIcon from "@components/HeaderIcon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

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
        _id: 2,
        name: "[소스증정] 반값!! 고니알탕 (겨울 기획상품) 2",
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

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuygnOydtOyngCIsImVtYWlsIjoidTFAbWFya2V0LmNvbSIsImltYWdlIjoiL2ZpbGVzL2ZpbmFsMDQvdXNlci1qYXlnLndlYnAiLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTczNTg3NzI2OCwiZXhwIjoxNzM1OTYzNjY4LCJpc3MiOiJGRVNQIn0.h7gzgUydFaOpaWqYsMwPC2BvztrzsgUiHPPyuBjaSVs";

export default function CartPage() {
  // 구매할 물품 폼 제출
  const { register, handleSubmit } = useForm();
  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);

  // targetRef가 보이면 결제버튼을 보이게 함
  const targetRef = useRef(null);

  // 헤더 상태 설정 함수
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 헤더 상태 설정
  useEffect(() => {
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

  const totalShippingFees =
    DUMMY_CARTS_ITEMS.cost.shippingFees ===
    DUMMY_CARTS_ITEMS.cost.discount.shippingFees
      ? "무료"
      : DUMMY_CARTS_ITEMS.cost.shippingFees;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["carts"],
    queryFn: () =>
      axios.get("https://11.fesp.shop/carts", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
          // 임시로 액세스 토큰 사용
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
          delay: 500,
        },
      }),
    onSuccess: (data) => console.log(data),
    onError: (res) => console.log(res),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  if (isLoading) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  // 데이터 없을시 null 반환하여 에러 방지
  if (!data) return null;

  console.log(data);

  const cartItems = data.map((item) => (
    <CartItem key={item._id} {...item} register={register} />
  ));

  // 선택된 아이템의 아이디를 배열에 담음
  const selectItem = (formData) => {
    const selectedItems = Object.keys(formData).filter((key) => formData[key]);
    // 선택된 아이템의 아이디가 담긴 배열을 구매 페이지로 전송
    navigate("/payment", { state: { selectedItems } });
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <>
          <section className="py-[14px] px-5 flex gap-[6px] items-center border-b border-gray2">
            <label
              className="flex items-center cursor-pointer relative gap-2 grow"
              htmlFor="checkAll"
            >
              <Checkbox id="checkAll" name="checkAll" />
              전체 선택 (1/2)
            </label>
            <Button>삭제</Button>
          </section>
          <form onSubmit={handleSubmit(selectItem)}>
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
              <Button isBig={true} type="submit">
                {DUMMY_CARTS_ITEMS.cost.total.toLocaleString()}원 구매하기
              </Button>
            </section>
          </form>
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
