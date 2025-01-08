import Button from "@components/Button";
import CartItem from "@components/CartItem";
import Checkbox from "@components/Checkbox";
import HeaderIcon from "@components/HeaderIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function CartPage() {
  // 구매할 물품 선택을 위한 폼
  const { register, handleSubmit } = useForm();
  // 결제 버튼 보이기 상태
  const [showButton, setShowButton] = useState(false);
  // 최종 상품 금액을 따로 상태로 관리
  const [totalFees, setTotalFees] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPayFees, setTotalPayFees] = useState(0);
  // 체크된 상품의 아이디를 담은 배열 상태 관리
  const [checkedItemsIds, setCheckedItemsIds] = useState([]);

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
  }, []);

  // 장바구니 목록 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ["carts"],
    queryFn: () =>
      axios.get("https://11.fesp.shop/carts", {
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
    select: (res) => res.data,
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

  // 장바구니 상품 삭제
  const queryClient = useQueryClient();
  const deleteItem = useMutation({
    mutationFn: (_id) => {
      const ok = confirm("상품을 삭제하시겠습니까?");
      if (ok)
        axios.delete(`https://11.fesp.shop/carts/${_id}`, {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            // 임시로 하드 코딩한 액세스 토큰 사용
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
    },
    onSuccess: () => {
      alert("상품이 삭제되었습니다.");
      // 캐시된 데이터 삭제 후 리렌더링
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => console.error(err),
  });

  // 장바구니 수량 변경
  const updateItem = useMutation({
    mutationFn: ({ _id, quantity }) =>
      axios.patch(
        `https://11.fesp.shop/carts/${_id}`,
        {
          // 보낼 데이터
          quantity: quantity,
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
      // 캐시된 데이터 삭제 후 리렌더링
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => console.error(err),
  });

  // 장바구니 아이템 체크하기
  const toggleCartItemCheck = (targetId) => {
    // 체크한 상품을 장바구니 데이터에서 찾음
    const cartItem = data.item.find((item) => item._id === targetId);

    // 체크한 상품의 product_id를 checkedCartItems 상태에 추가/제거
    setCheckedItemsIds((prevCheckedIds) => {
      const isAlreadyChecked = prevCheckedIds.includes(cartItem.product_id);

      if (isAlreadyChecked) {
        return prevCheckedIds.filter((id) => id !== cartItem.product_id);
      }
      return [...prevCheckedIds, cartItem.product_id];
    });
  };

  // 선택한 아이템, 데이터가 변경될 때 상품 금액, 할인 금액 다시 계산
  useEffect(() => {
    // 체크한 상품이 없다면 총금액, 할인금액을 0으로 설정하고 빠져나감
    if (checkedItemsIds.length === 0) {
      setTotalFees(0);
      setDiscount(0);
      return;
    }

    const { subtotal, totalDiscount } = checkedItemsIds.reduce(
      (acc, checkedId) => {
        // 장바구니에서 아이템 찾기
        const currentCartItem = data.item.find(
          (item) => item.product_id === checkedId
        );

        // 해당 아이템의 총 합산 금액 구하기
        const itemTotal =
          currentCartItem.quantity * currentCartItem.product.price;

        // 해당 아이템의 할인 금액 구하기
        const itemDiscount =
          currentCartItem.quantity *
          (currentCartItem.product.price -
            currentCartItem.product.extra.saledPrice);

        return {
          subtotal: acc.subtotal + itemTotal, // 상품 금액 합계
          totalDiscount: acc.totalDiscount + itemDiscount, // 할인 금액 합계
        };
      },
      // 초기값 설정
      { subtotal: 0, totalDiscount: 0 }
    );

    setTotalFees(subtotal);
    setDiscount(totalDiscount);
  }, [checkedItemsIds, data?.item]);

  // 총 결제금액 업데이트
  useEffect(() => {
    setTotalPayFees(totalFees - discount);
  }, [totalFees, discount]);

  if (isLoading) {
    return (
      <div className="mt-0 mx-auto text-center">
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }
  if (isError) {
    return (
      <div className="mt-0 mx-auto text-center">
        에러가 발생했습니다. <br />
        잠시 후 다시 시도해주세요.
      </div>
    );
  }
  // 데이터 없을시 null 반환하여 에러 방지
  if (!data) return null;
  console.log(data);

  // 최종 배송비 계산
  const totalShippingFees =
    data.cost.shippingFees - data.cost.discount.shippingFees;

  const itemList = data.item.map((item) => (
    <CartItem
      key={item._id}
      {...item}
      register={register}
      deleteItem={deleteItem}
      updateItem={updateItem}
      toggleCartItemCheck={toggleCartItemCheck}
    />
  ));

  // 체크한 아이템의 데이터가 담긴 배열을 구매 페이지로 전송
  const selectItem = () => {
    if (checkedItemsIds.length === 0) {
      alert("구매할 물품을 선택하세요");
      return;
    }

    // 결제 페이지로 체크한 상품의 데이터 넘기기
    const selectedItems = checkedItemsIds.map((id) =>
      // 각각의 id 마다 checkedItemsIds에 담긴 id와 같은 상품을 장바구니에서 찾아서 리턴
      data.item.find((item) => item.product_id === id)
    );

    navigate("/payment", {
      // seletedItems : 체크한 아이템의 아이디가 딤긴 배열
      // totalFees : 최종 상품 금액
      // totalShippingFees : 최종 배송비
      state: {
        selectedItems,
        totalFees: totalPayFees,
        totalShippingFees,
      },
    });
  };

  return (
    <div>
      {itemList.length > 0 ? (
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
              {itemList}
            </section>
            <section className="px-5 py-3">
              <div className="border-b border-gray2">
                <div className="text-xs flex justify-between mb-3">
                  <span className="text-gray4">총 상품 금액</span>
                  <span>{totalFees.toLocaleString()}원</span>
                </div>
                <div className="text-xs flex justify-between mb-3">
                  <span className="text-gray4">할인 금액</span>
                  <span className="text-red1">
                    {discount.toLocaleString()}원
                  </span>
                </div>
                <div className="text-xs flex justify-between mb-3">
                  <span className="text-gray4">배송비</span>
                  <span>
                    {totalShippingFees === 0 ? "무료" : totalShippingFees}
                  </span>
                </div>
              </div>
              <div className="flex justify-between mb-3 py-3 text-[16px] font-bold">
                <span>총 결제 금액</span>
                <span>
                  {(totalPayFees + totalShippingFees).toLocaleString()}원
                </span>
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
                {totalPayFees.toLocaleString()}원 구매하기
              </Button>
            </section>
          </form>
        </>
      ) : (
        <>
          <section className="pt-[100px] flex flex-col gap-[10px] items-center text-[14px]">
            <span className="text-gray4">담은 상품이 없습니다.</span>
            <Link to="/" className="text-bg-primary underline">
              쇼핑하러 가기
            </Link>
          </section>
        </>
      )}
    </div>
  );
}
