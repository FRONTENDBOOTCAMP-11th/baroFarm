import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function OrderCompletePage() {
  // 헤더 아이콘 설정
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    setHeaderContents({
      title: (
        <img
          src="/images/BaroFarmLogo.svg"
          alt="홈 버튼"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      ),
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  const location = useLocation();

  const { selectedItems, currentAddress, memo, totalFees } = location.state;

  const products = selectedItems.map((item) => {
    return (
      <div
        key={item._id}
        className="flex justify-between text-sm font-light pl-3 gap-5"
      >
        <p className="truncate">{item.product.name}</p>
        <span className="w-11 shrink-0 text-right text-gray4">{`${item.quantity}개`}</span>
      </div>
    );
  });

  return (
    <div>
      <article className="max-w-[350px] mt-[50px] mx-auto shadow-lg mb-[50px] pb-10">
        <section className="flex flex-col gap-5 justify-center items-center py-10 border-b-2 border-dashed">
          <div className="bg-btn-primary size-14 rounded-full flex justify-center items-center">
            <img
              src="/icons/icon_check.svg"
              alt="체크 아이콘"
              className="size-7"
            />
          </div>
          <p className="text-xl font-semibold">주문이 완료되었습니다</p>
        </section>
        <section className="flex flex-col gap-3 px-6 pt-6 pb-10 *:pb-3">
          <div className="flex justify-between items-center border-b">
            <span className="text-gray4">결제금액</span>
            <span className="text-xl text-btn-primary font-semibold">
              {`${totalFees.toLocaleString()}원`}
            </span>
          </div>
          <div className="space-y-2 border-b">
            <span className="text-gray4">주문상품</span>
            {products}
          </div>
          <div className="space-y-2 border-b">
            <span className="text-gray4">배송지</span>
            <div className="space-y-0.5 text-sm pl-3">
              <p>{`${currentAddress.userName} ${
                currentAddress.name ? `(${currentAddress.name})` : ""
              }`}</p>
              <p className="text-gray4">{currentAddress.phone}</p>
              <p>{currentAddress.value}</p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-gray4">배송메모</span>
            <p className="text-sm pl-3">{memo.memo ? memo.memo : "없음"}</p>
          </div>
        </section>
        <section className="px-4">
          <Button isBig={true} onClick={() => navigate("/")}>
            홈으로
          </Button>
        </section>
      </article>
    </div>
  );
}
