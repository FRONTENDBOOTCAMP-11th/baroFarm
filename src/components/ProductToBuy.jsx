import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";

ProductToBuy.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    extra: PropTypes.shape({
      saledPrice: PropTypes.number.isRequired,
    }),
    image: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    seller_id: PropTypes.number.isRequired,
  }),
  product_id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function ProductToBuy({ product, product_id, quantity }) {
  // 넘어온 데이터 기반으로 seller의 닉네임 fetching
  const { data } = useQuery({
    queryKey: ["users", `${product.seller_id}`, "name"],
    queryFn: () =>
      axios.get(`https://11.fesp.shop/users/${product.seller_id}/name`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
          // 임시로 하드 코딩한 액세스 토큰 사용
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  if (!data) return null;

  console.log(data);
  return (
    <div className="mb-3 [&:not(:last-child)]:pb-5 [&:not(:last-child)]:border-b border-gray2">
      <div className="text-sm font-bold">{data.item.name}</div>
      <div className="pt-2 flex gap-3">
        <img
          src={`https://11.fesp.shop/${product.image.path}`}
          alt="상품 이미지"
          className="size-[72px] object-cover"
        />
        <div className="flex flex-col text-xs mb-1">
          <div>
            <span>{product.name}</span>
            <span className="text-gray4"> / {quantity}개</span>
          </div>
          <span className="text-[16px] font-extrabold mt-auto">
            {(product.extra.saledPrice * quantity).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
