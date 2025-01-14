import { useEffect, useState, useRef } from "react";
import {
  useNavigate,
  useOutletContext,
  Link,
  useParams,
} from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useLikeToggle } from "@hooks/useLikeToggle";
import { useCategory } from "@hooks/useCategory";

import PurchaseModal from "@components/PurchaseModal";
import Modal from "@components/Modal";
import ReviewBox from "@components/ReviewBox";

import forwardIcon from "/icons/icon_forward.svg";
import cartIcon from "/icons/icon_cart_modal.svg";
import HeaderIcon from "@components/HeaderIcon";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function ProductDetailPage() {
  const { _id } = useParams();

  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.get(`https://11.fesp.shop/products/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data.item;
    },
  });

  const { isLiked, handleLike } = useLikeToggle(product);
  const categoryTitle = useCategory(product);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: categoryTitle,
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, [product, categoryTitle]);

  const purchaseModalRef = useRef();
  const modalRef = useRef();

  const openPurchaseModal = () => {
    purchaseModalRef.current.open();
  };

  const openModal = () => {
    modalRef.current.open();
    purchaseModalRef.current.close();
  };

  const [count, setCount] = useState(1);
  const purchaseItem = [product];

  const handleCount = (sign) => {
    if (sign === "plus") setCount((count) => count + 1);
    else if (sign === "minus" && count > 1) setCount((count) => count - 1);
  };

  const cartItem = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://11.fesp.shop/carts`,
        {
          product_id: _id,
          quantity: count,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.item;
    },
    onSuccess: () => {
      openModal();
    },
    onError: (error) => {
      console.error("Error adding to cart", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error loading product</div>;

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
          <span className="text-gray4 font-semibold pr-1">
            {product.extra.sale}%
          </span>
          <span className="font-semibold text-gray3 line-through">
            {product.price.toLocaleString()}원
          </span>
          <p className="font-extrabold text-xl text-btn-primary">
            {product.extra.saledPrice.toLocaleString()}원
          </p>
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
              {(product.extra.saledPrice * count).toLocaleString()}원
            </span>
            <span className="text-[12px] text-red1 mt-[3px]">
              (-
              {(
                (product.price - product.extra.saledPrice) *
                count
              ).toLocaleString()}
              원 할인)
            </span>
          </div>
        </div>
        <div className="bg-gray1 border-y border-gray3 border-t py-3 flex justify-center">
          <p>
            상품 금액 {(product.extra.saledPrice * count).toLocaleString()} 원 +
            배송비 {product.shippingFees.toLocaleString()} 원
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <button
            className="flex-1 text-lg text-btn-primary p-3 rounded-[10px] border border-btn-primary"
            onClick={() => cartItem.mutate()}
          >
            장바구니
          </button>
          <button
            className="flex-1 text-lg text-white bg-btn-primary p-3 rounded-[10px]"
            onClick={() =>
              navigate("/payment", {
                state: {
                  selectedItems: purchaseItem,
                  totalFees: product.extra.saledPrice * count,
                  totalShippingFees: product.shippingFees,
                  buyQuantity: parseInt(count),
                },
              })
            }
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
