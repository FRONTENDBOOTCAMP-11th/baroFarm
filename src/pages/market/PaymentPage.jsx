import Button from "@components/Button";
import ProductToBuy from "@components/ProductToBuy";
import HeaderIcon from "@components/HeaderIcon";
import Modal from "@components/Modal";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function PaymentPage() {
  // 구매할 상품 목록 상태 관리
  const [paymentItems, setPaymentItems] = useState([]);
  // 헤더 상태 설정 함수
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  // 기본 배송지 상태 임시 토글 기능
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);

  // targetRef가 보이면 결제버튼을 보이게 함
  const targetRef = useRef(null);
  // 모달 창 선택
  const modalRef = useRef();
  const openModal = () => {
    modalRef.current.open();
  };

  // 이전 페이지에서 넘어온 정보
  const location = useLocation();
  // 이전 페이지에서 넘어온 구매할 상품
  const selectedItems = location.state.selectedItems;
  // 이전 페이지에서 넘어온 최종 금액
  const totalFees = location.state.totalFees;
  const totalShippingFees = location.state.totalShippingFees;
  console.log(location);

  // 구매할 상품 컴포넌트 동적 렌더링
  useEffect(() => {
    const itemsToBuy = selectedItems?.map((item) => (
      <ProductToBuy key={item.product_id} {...item} />
    ));
    setPaymentItems(itemsToBuy);
  }, []);

  // 헤더 상태 설정
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "주문/결제",
    });
  }, []);

  const user = {
    _id: 4,
  };
  // 로그인한 사용자 정보 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", `${user._id}`],
    queryFn: () =>
      axios.get(`https://11.fesp.shop/users/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
          // 임시로 하드 코딩한 액세스 토큰 사용
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        params: {
          delay: 500,
        },
      }),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

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
  }, [data]);

  // 장바구니 아이템 삭제 함수
  const deleteItem = useMutation({
    mutationFn: (itemsId) =>
      axios.delete(
        `https://11.fesp.shop/carts`,

        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            // 임시로 하드 코딩한 액세스 토큰 사용
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          // delete method에서 data는 config 객체 안에 담아서 보내야 함.
          data: {
            carts: itemsId,
          },
        }
      ),
    onError: (err) => console.error(err),
  });

  // 물품 구매하기
  const queryClient = useQueryClient();
  const purchaseItem = useMutation({
    mutationFn: ({ _id, quantity }) =>
      axios.post(
        "https://11.fesp.shop/orders",
        {
          products: [
            {
              _id: _id,
              quantity: quantity,
            },
          ],
        },
        {
          // request config
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            // 임시로 하드 코딩한 액세스 토큰 사용
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      ),
    onSuccess: () => {
      // 구매 성공시
      // 장바구니에서 구매한 아이템 삭제
      let purchasedItems = [];
      // 구매 목록의 아이디를 배열에 담고
      selectedItems.forEach((item) => purchasedItems.push(item._id));
      // 배열을 삭제 요청에 전달
      deleteItem.mutate(purchasedItems);
      // 장바구니에 캐시된 데이터 삭제 하고
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      openModal(); // 모달창으로 안내
    },
    onError: (err) => console.error(err),
  });

  if (!data) return null;

  // 유저 정보에 있던 폰 번호를 폰 번호 형식으로 변경
  const formatPhoneNumber = (number) => {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <>
      <Modal ref={modalRef}>
        <img src="/images/Star.png" className="w-[66px]" />
        <p className="text-center text-lg">
          <span className="font-semibold">
            총 {totalFees.toLocaleString()}원
          </span>
          <br />
          <strong className="font-semibold">결제</strong>가 완료되었어요
        </p>
        <Link to="/cart">
          <span className="font-light border-b border-b-black">
            더 쇼핑하러 가기
          </span>
        </Link>
      </Modal>
      <section className="px-5 py-[14px]">
        <div>
          <h3 className="mb-3 text-sm font-bold">주문자 정보</h3>
          {/* <button
            className="bg-blue-200 p-1 rounded-lg mb-2"
            onClick={() =>
              setIsDefaultAddress((prevState) => (prevState = !prevState))
            }
          >
            기본 배송지 정보 토글 버튼 ({isDefaultAddress ? "있음" : "없음"})
          </button> */}

          <div className="flex flex-col gap-5 px-5 py-6 bg-white border-2 border-bg-primary2/50 rounded-[10px] shadow-md mb-6">
            {isDefaultAddress ? (
              <>
                {/* 기본 배송지가 있을 때 표시할 UI */}
                <div className="flex flex-col gap-[6px]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{data?.name}</p>
                    <Button>변경</Button>
                  </div>
                  <p className="text-xs text-gray4 font-medium">
                    {formatPhoneNumber(data?.phone)}
                  </p>
                  <p className="text-xs font-medium">{data?.address}</p>
                  <select
                    id="memo"
                    className="text-center bg-gray2 rounded-lg py-1 ps-3 pe-6 appearance-none focus:outline-none cursor-pointer bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem]"
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
                        className="grow ring-1 ring-gray3 h-[34px] rounded-[5px] bg-white px-2 text-sm placeholder:text-gray2 focus:outline-none focus:ring-1 focus:ring-btn-primary disabled:bg-gray2 disabled:placeholder:text-gray4"
                        disabled
                        placeholder="주소를 입력하세요."
                      />
                      <Button>주소 검색</Button>
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
                      className="text-center w-[253px] bg-gray2 rounded-lg py-1 ps-3 pe-6 appearance-none focus:outline-none cursor-pointer bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem]"
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
            <div className="text-sm flex justify-between mb-3">
              <span className="text-gray4">총 상품 금액</span>
              <span>{totalFees.toLocaleString()}원</span>
            </div>
            <div className="text-sm flex justify-between">
              <span className="text-gray4">배송비</span>
              <span>
                {totalShippingFees === 0 ? "무료" : totalShippingFees}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3 py-3 text-lg font-bold">
          <span>총 결제 금액</span>
          <span>{totalFees.toLocaleString()}원</span>
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
        <Button
          isBig={true}
          onClick={() => {
            selectedItems.forEach((item) =>
              purchaseItem.mutate({
                _id: item.product_id,
                quantity: item.quantity,
              })
            );
          }}
        >
          {totalFees.toLocaleString()}원 결제하기
        </Button>
      </section>
    </>
  );
}
