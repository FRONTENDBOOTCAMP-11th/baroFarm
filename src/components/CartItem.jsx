import Checkbox from "@components/Checkbox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

CartItem.propTypes = {
  _id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  register: PropTypes.func,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    seller_id: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    buyQuantity: PropTypes.number,
    image: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    extra: PropTypes.shape({
      sale: PropTypes.number,
    }),
  }).isRequired,
};

export default function CartItem({ _id, quantity, product, register }) {
  // 판매자 이름 상태관리
  const [seller, setSeller] = useState("");

  // 판매자 id로 이름 fetching
  const { data } = useQuery({
    queryKey: ["users", `${product.seller_id}`, "name"],
    queryFn: () =>
      axios.get(`https://11.fesp.shop/users/${product.seller_id}/name`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      }),
    select: (res) => res.data.item.name,
  });

  // 판매자 이름 상태 업데이트 (data가 업데이트 될 때 다시 화면 렌더링 필요)
  useEffect(() => {
    setSeller(data);
  }, [data]);

  return (
    <div className="mb-3">
      <div className="py-[10px] border-b border-gray2 text-[14px]">
        {seller}
      </div>
      <div className="pt-[10px] flex gap-3">
        <Checkbox name={`${_id}`} register={register(`${_id}`)} />
        <img
          src={`https://11.fesp.shop${product.image.path}`}
          alt="상품 이미지"
          className="size-[72px] object-cover"
        />
        <div>
          <p className="text-xs mb-1">{product.name}</p>
          <div className="flex items-center mb-2">
            <span className="text-xs font-semibold text-red1 mr-1">{`${product.extra.sale}%`}</span>
            <span className="text-[16px] font-extrabold">
              {product.price.toLocaleString()}원
            </span>
          </div>
          <div className="ring-1 ring-gray2 w-fit flex text-center items-center rounded-sm *:flex *:items-center *:justify-center *:text-sm">
            <button className="size-6 border-r border-gray2">-</button>
            <div className="px-2">{quantity}</div>
            <button className="size-6 border-l border-gray2">+</button>
          </div>
        </div>
        <button className="self-start">
          <img src="/icons/icon_x.svg" alt="닫기 버튼" />
        </button>
      </div>
    </div>
  );
}
