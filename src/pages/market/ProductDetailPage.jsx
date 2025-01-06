import { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  useOutletContext,
  Link,
  useParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import PurchaseModal from "@components/PurchaseModal";
import Modal from "@components/Modal";

import forwardIcon from "/icons/icon_forward.svg";
import cartIcon from "/icons/icon_cart_modal.svg";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

import HeaderIcon from "@components/HeaderIcon";
import ReviewBox from "@components/ReviewBox";

export default function ProductDetailPage() {
  const { _id } = useParams();

  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const purchaseModalRef = useRef();
  const modalRef = useRef();

  const openPurchaseModal = () => {
    purchaseModalRef.current.open();
  };

  const openModal = () => {
    modalRef.current.open();
    purchaseModalRef.current.close();
  };

  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(1);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCount = (sign) => {
    if (sign === "plus") setCount((count) => count + 1);
    else if (sign === "minus" && count > 1) setCount((count) => count - 1);
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "카테고리",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", _id],
    queryFn: async () => {
      const response = await axios.get(`https://11.fesp.shop/products/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      });
      return response.data.item;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product</div>;

  const formattedPrice = Intl.NumberFormat().format(product.price);

  return (
    <>
      <img
        alt={product.name}
        className="w-[390px] h-[390px] object-cover"
        src={`https://11.fesp.shop${product.mainImages[0]?.path}`}
      />
      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center gap-[10px] pb-5">
          <img
            alt={product.name}
            src={`https://11.fesp.shop${product.seller.image}`}
            className="w-[25px] h-[25px] rounded-full"
          />
          <span className="font-semibold ">{product.seller.name}</span>
        </div>

        <p>{product.name}</p>

        <span className="font-semibold text-xs pr-2">
          ⭐️ {product.rating ? product.rating.toFixed(1) : 0}
        </span>
        <span className="text-xs">{product.replies.length}개 후기</span>

        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">
            {product.sale}
          </span>
          <span className="font-extrabold text-lg">{formattedPrice}원</span>
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div className="flex items-center justify-between">
          <span className="font-bold">후기 {product.replies.length}개</span>
          {product.replies.length > 0 ? (
            <Link
              to={`/product/${product._id}/reviews`}
              className="font-medium text-sm text-gray5 flex items-center"
            >
              전체보기
              <img src={forwardIcon} className="w-3" />
            </Link>
          ) : undefined}
        </div>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide">
          {product.replies.map((reply) => (
            <ReviewBox
              key={reply._id}
              option={product.name}
              content={reply.content}
            />
          ))}
        </div>
      </section>

      <section className="p-5 border-b-8 border-b-gray1">
        <div dangerouslySetInnerHTML={{ __html: product.content }} />
      </section>
      <footer className="h-[100px] p-5 border-t border-gray1 flex items-center justify-between fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white">
        <button onClick={handleLike} className="pl-2">
          <img
            src={isLiked ? likeIcon.active : likeIcon.default}
            className="w-10"
          />
          <span className="text-sm font-medium">찜</span>
        </button>
        <button
          onClick={openPurchaseModal}
          className="w-[280px] text-lg text-white bg-btn-primary p-4 rounded-[10px]"
        >
          구매하기
        </button>
      </footer>

      <PurchaseModal ref={purchaseModalRef}>
        <p className="text-sm font-semibold">개수 선택</p>
        <div className="text-sm border border-gray3 rounded-[10px] p-5">
          <p>{product.name}</p>
          <div className="flex gap-2 items-center mt-5">
            <button
              className="w-6 h-6 bg-gray2 rounded-[5px]  text-white flex items-center justify-center"
              onClick={() => handleCount("minus")}
            >
              -
            </button>
            <span className="w-10 h-6 border rounded-[5px] flex items-center justify-center">
              {count}
            </span>
            <button
              className="w-6 h-6 bg-gray2 rounded-[5px]  text-white flex items-center justify-center"
              onClick={() => handleCount("plus")}
            >
              +
            </button>
            <span className="ml-auto text-base font-semibold">
              {Intl.NumberFormat().format(product.price * count)}원
            </span>
          </div>
        </div>
        <div className="bg-gray1 border-y border-gray3 border-t py-3 flex justify-center">
          <p className="">
            상품 금액 {Intl.NumberFormat().format(product.price * count)} 원 +
            배송비 {product.shoppingFees} 원
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 text-lg text-btn-primary p-3 rounded-[10px] border border-btn-primary"
            onClick={openModal}
          >
            장바구니
          </button>
          <button
            className="flex-1 text-lg text-white bg-btn-primary p-3 rounded-[10px]"
            onClick={() => navigate("/payment")}
          >
            구매하기
          </button>
        </div>
      </PurchaseModal>
      <Modal ref={modalRef}>
        <p className="text-center text-lg font-">
          <strong className="font-semibold">장바구니</strong>에 <br /> 상품을
          담았어요
        </p>
        <img src={cartIcon} className="w-[66px]" />
        <Link to="/cart">
          <span className="font-light border-b border-b-black">바로가기</span>
        </Link>
      </Modal>
    </>
  );
}
