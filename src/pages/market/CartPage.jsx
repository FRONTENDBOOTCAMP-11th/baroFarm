import CartItem from "@components/CartItem";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
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
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "장바구니",
    });
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
    <div className="mb-[100px]">
      {cartItems.length > 0 ? (
        <>
          <section className="py-[14px] flex gap-[6px] items-center border-b border-gray2">
            <input type="checkbox" id="checkAll" />
            <label htmlFor="checkAll">전체 선택 (1/2)</label>
            <button className="ml-auto bg-gray3 px-3 py-1">삭제</button>
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
          <section className="px-5 py-8 bg-gray1 shadow-top">
            <button className="bg-btn-primary py-3 w-full text-white text-xl font-bold rounded-lg">
              {DUMMY_CARTS_ITEMS.cost.total.toLocaleString()}원 결제하기
            </button>
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
