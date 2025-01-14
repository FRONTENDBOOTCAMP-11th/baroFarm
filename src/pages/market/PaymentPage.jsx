import Button from "@components/Button";
import ProductToBuy from "@components/ProductToBuy";
import HeaderIcon from "@components/HeaderIcon";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import PaymentModal from "@components/PaymentModal";
import AddressModal from "@components/AddressModal";

export default function PaymentPage() {
  // axios instance
  const axios = useAxiosInstance();
  // 구매할 상품 목록 상태 관리
  const [paymentItems, setPaymentItems] = useState([]);
  // 헤더 상태 설정 함수
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);
  // 배송 메모 관리
  const [memo, setMemo] = useState({});
  // 현재 선택한 배송지 아이디
  const [addressId, setAddressId] = useState(0);
  // 현재 선택한 배송지
  const [currentAddress, setCurrentAddress] = useState();
  // 로그인한 유저 정보 가져오기
  const { user } = useUserStore();
  // targetRef가 보이면 결제버튼을 보이게 함
  const targetRef = useRef(null);
  // 결제 모달 창 상태
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  // 모달창 오픈시 body에 스크롤 X
  useEffect(() => {
    if (isPayModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPayModalOpen]);
  // 주소지 모달 창 상태
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 이전 페이지에서 넘어온 정보
  const location = useLocation();
  // 이전 페이지에서 넘어온 구매할 상품, 최종금액, 배송비
  const { selectedItems, totalFees, totalShippingFees } = location.state;

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

  // 로그인한 사용자 정보 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", `${user._id}`],
    queryFn: () => axios.get(`/users/${user._id}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  // 데이터 로딩 완료 후 기본 배송지를 유저의 기본 정보로 설정
  useEffect(() => {
    if (addressId === 0) {
      setCurrentAddress({
        userName: data?.name,
        phone: data?.phone,
        value: data?.address,
      });
    } else {
      setCurrentAddress(
        data?.extra?.addressBook?.find((item) => item.id === addressId)
      );
    }
  }, [data, addressId]);

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
    mutationFn: (itemIds) =>
      axios.delete(`/carts`, {
        // delete method에서 data는 config 객체 안에 담아서 보내야 함.
        data: {
          carts: itemIds,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["carts"] }),
    onError: (err) => console.error(err),
  });

  // 배송 메모 입력하기
  const postMemo = (e) => {
    setMemo((prevState) => {
      const newState = { ...prevState };

      if (e.target.name === "memo" && e.target.value !== "직접 입력하기") {
        delete newState.detail;
      }

      return { ...newState, [e.target.name]: e.target.value };
    });
  };

  // 물품 구매하기
  const queryClient = useQueryClient();
  const purchaseItem = useMutation({
    mutationFn: ({ _id, quantity }) =>
      axios.post("/orders", {
        products: [
          {
            _id: _id,
            quantity: quantity,
            memo: memo,
            address: currentAddress,
          },
        ],
      }),
    onSuccess: (res) => {
      // 구매 성공시
      // 장바구니에서 구매한 아이템 삭제
      console.log(res);
      let purchasedItems = [];
      // 구매 목록의 아이디를 배열에 담고
      selectedItems.forEach((item) => purchasedItems.push(item._id));
      // 배열을 삭제 요청에 전달
      deleteItem.mutate(purchasedItems);
      navigate("/complete", {
        state: { selectedItems, totalFees, memo, currentAddress },
      });
      // openModal(); // 모달창으로 안내
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
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        userData={data}
        addressId={addressId}
        setAddressId={setAddressId}
      />
      <section className="px-5 py-[14px]">
        <div>
          <h3 className="mb-3 text-sm font-bold">주문자 정보</h3>
          <div className="flex flex-col gap-5 px-5 py-6 bg-white border-2 border-bg-primary2/50 rounded-[10px] shadow-md mb-6">
            {/* 기본 배송지 렌더링 */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">
                  {addressId === 0
                    ? data?.name
                    : `${currentAddress?.userName} (${currentAddress?.name})`}
                </p>
                <Button onClick={() => setIsAddressModalOpen(true)}>
                  변경
                </Button>
              </div>
              <p className="text-xs text-gray4 font-medium">
                {addressId === 0
                  ? formatPhoneNumber(data?.phone)
                  : currentAddress?.phone}
              </p>
              <p className="text-xs font-medium">
                {addressId === 0 ? data?.address : currentAddress?.value}
              </p>
              <select
                id="memo"
                className="text-center bg-gray2 rounded-lg py-1 ps-3 pe-6 appearance-none focus:outline-none cursor-pointer bg-[url('/icons/icon_dropdown.svg')] bg-no-repeat bg-[center_right_0.5rem]"
                name="memo"
                onChange={postMemo}
              >
                <option value="null">배송메모를 선택하세요.</option>
                <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                <option value="부재시 미리 연락 부탁드려요">
                  부재시 미리 연락 부탁드려요
                </option>
                <option value="배송 전 미리 연락해주세요">
                  배송 전 미리 연락해주세요
                </option>
                <option value={"직접 입력하기"}>직접 입력하기</option>
              </select>
              {memo.memo === "직접 입력하기" && (
                <input
                  className="border border-gray3 rounded-md w-full px-2 py-1 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
                  placeholder="이 곳에 입력하세요."
                  name="detail"
                  onChange={postMemo}
                />
              )}
            </div>
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
                {totalShippingFees === 0
                  ? "무료"
                  : `${totalShippingFees.toLocaleString()}원`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3 py-3 text-lg font-bold">
          <span>총 결제 금액</span>
          <span>{(totalFees + totalShippingFees).toLocaleString()}원</span>
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
            setIsPayModalOpen(true);
          }}
        >
          {(totalFees + totalShippingFees).toLocaleString()}원 결제하기
        </Button>
        <PaymentModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          productData={location.state}
          purchaseItem={purchaseItem}
        />
      </section>
    </>
  );
}
