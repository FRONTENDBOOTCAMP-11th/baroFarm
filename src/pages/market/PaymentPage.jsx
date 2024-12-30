import Button from "@components/Button";
import CartItemPayment from "@components/CartItemPayment";
import HeaderIcon from "@components/HeaderIcon";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
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

export default function PaymentPage() {
  // 헤더 상태 설정 함수
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 기본 배송지 상태 임시 토글 기능
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  console.log(isDefaultAddress);

  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);
  // targetRef가 보이면 결제버튼을 보이게 함
  const targetRef = useRef(null);

  const paymentItems = DUMMY_CARTS_ITEMS.item.map((item) => (
    <CartItemPayment key={item._id} {...item.product} />
  ));

  // 배송비 계산
  const totalShippingFees =
    DUMMY_CARTS_ITEMS.cost.shippingFees ===
    DUMMY_CARTS_ITEMS.cost.discount.shippingFees
      ? "무료"
      : DUMMY_CARTS_ITEMS.cost.shippingFees;

  // 헤더 상태 설정
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "주문/결제",
    });
  }, []);

  // 스크롤에 따라 결제버튼 보이게 하기
  useEffect(() => {
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

  return (
    <>
      <section className="px-5 py-[14px] mb-10">
        <div>
          <h3 className="mb-3 text-sm font-bold">주문자 정보</h3>
          <button
            className="bg-blue-200 p-1 rounded-lg mb-2"
            onClick={() =>
              setIsDefaultAddress((prevState) => (prevState = !prevState))
            }
          >
            기본 배송지 정보 토글 버튼 ({isDefaultAddress ? "있음" : "없음"})
          </button>

          <div className="flex flex-col gap-5 px-5 py-6 bg-white border-2 border-bg-primary2/50 rounded-[10px] shadow-md mb-6">
            {isDefaultAddress ? (
              <>
                {/* 기본 배송지가 있을 때 표시할 UI */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">김호나우지뉴(집)</p>
                    <Button width={30} height={20}>
                      변경
                    </Button>
                  </div>
                  <p className="text-xs text-gray4 font-medium">
                    010-0000-0000
                  </p>
                  <p className="text-xs font-medium">
                    서울특별시 XX구 XX동 XX3길 62-1, 104호
                  </p>
                  <select
                    id="memo"
                    className="ring-1 ring-gray3 h-[34px] rounded-[5px] bg-white px-2 text-sm focus:outline-none focus:ring-1 focus:ring-btn-primary"
                  >
                    <option value="null">배송메모를 선택하세요.</option>
                    <option value="문 앞에 놓아주세요">
                      문 앞에 놓아주세요
                    </option>
                    <option value="부재시 미리 연락 부탁드려요">
                      부재시 미리 연락 부탁드려요
                    </option>
                    <option value="배송 전 미리 연락해주세요">
                      배송 전 미리 연락해주세요
                    </option>
                    <option>직접 입력하기</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                {/* 기본 배송지가 없을 때 표시할 UI */}
                <form className="flex flex-col gap-[10px]">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="name"
                      className="text-xs text-gray4 font-medium shrink-0"
                    >
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="ring-1 ring-gray3 w-[253px] h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary"
                      placeholder="이름을 입력하세요."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="text-xs text-gray4 font-medium shrink-0"
                    >
                      휴대폰
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="ring-1 ring-gray3 w-[253px] h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary"
                      placeholder="휴대폰 번호를 입력하세요."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="text-xs text-gray4 font-medium shrink-0"
                    >
                      주소
                    </label>
                    <div className="flex w-[253px] gap-[10px]">
                      <input
                        type="text"
                        id="phone"
                        className="ring-1 ring-gray3 w-[263px] h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary disabled:bg-gray2 disabled:placeholder:text-gray4"
                        disabled
                        placeholder="주소를 입력하세요."
                      />
                      <Button width={78} height={34}>
                        주소 검색
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="phone"
                      className="text-xs text-gray4 font-medium shrink-0"
                    >
                      상세주소
                    </label>
                    <input
                      type="text"
                      id="phone"
                      className="ring-1 ring-gray3 w-[253px] h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary"
                      placeholder="상세주소(동・층・호수 등)를 입력해주세요."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray4 font-medium shrink-0"></div>
                    <select
                      id="memo"
                      className="ring-1 ring-gray3 w-[253px] h-[34px] rounded-[5px] bg-white px-2 text-sm focus:outline-none focus:ring-1 focus:ring-btn-primary"
                    >
                      <option value="null">배송메모를 선택하세요.</option>
                      <option value="문 앞에 놓아주세요">
                        문 앞에 놓아주세요
                      </option>
                      <option value="부재시 미리 연락 부탁드려요">
                        부재시 미리 연락 부탁드려요
                      </option>
                      <option value="배송 전 미리 연락해주세요">
                        배송 전 미리 연락해주세요
                      </option>
                      <option>직접 입력하기</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray4 font-medium shrink-0"></div>
                    <input
                      type="text"
                      id="postMemo"
                      className="ring-1 ring-gray3 w-[253px] h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary"
                      placeholder="이 곳에 입력하세요."
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray4 font-medium shrink-0"></div>
                    <div className="flex gap-2 w-[253px] text-sm">
                      <input type="checkbox" id="saveAddress" />
                      <label htmlFor="saveAddress">
                        이 주소를 기본 배송지로 저장
                      </label>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold">주문 상품 (총 2건)</h3>
          <div className="px-6 py-5 bg-white border-2 border-bg-primary2/50 rounded-[10px] shadow-md mb-6">
            {paymentItems}
          </div>
        </div>
        <div className="border-b border-gray2 mb-3">
          <h3 className="mb-3 text-sm font-bold">결제 정보</h3>
          <div className="px-6 py-5 bg-white border-2 border-bg-primary2/50 rounded-[10px] shadow-md mb-6">
            <div className="text-xs flex justify-between mb-3">
              <span className="text-gray4">총 상품 금액</span>
              <span>{DUMMY_CARTS_ITEMS.cost.products.toLocaleString()}원</span>
            </div>
            <div className="text-xs flex justify-between">
              <span className="text-gray4">배송비</span>
              <span>{totalShippingFees}</span>
            </div>
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
        <button className="bg-btn-primary py-3 w-full text-white text-xl font-bold rounded-lg">
          {DUMMY_CARTS_ITEMS.cost.total.toLocaleString()}원 결제하기
        </button>
      </section>
    </>
  );
}
