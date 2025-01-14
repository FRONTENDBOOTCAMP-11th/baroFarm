import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useLikeToggle } from "@hooks/useLikeToggle";
import Button from "@components/Button";

const likeIcon = {
  default: "/icons/icon_likeHeart_no.svg",
  active: "/icons/icon_likeHeart_yes.svg",
};

ProductSmall.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mainImages: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
      })
    ).isRequired,
    extra: PropTypes.shape({
      sale: PropTypes.number.isRequired,
      saledPrice: PropTypes.number.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
  }),
  bookmarkId: PropTypes.number.isRequired,
};

export default function ProductSmall({ product, bookmarkId }) {
  const navigate = useNavigate();

  const goDetailPage = () => {
    navigate(`/product/${product._id}`);
  };

  const { isLiked, handleLike } = useLikeToggle(product);

  return (
    <section
      className="flex flex-col cursor-pointer *:self-center"
      onClick={goDetailPage}
    >
      <div className="relative">
        <img
          className="h-[135px] rounded-lg object-cover w-full"
          alt={product.name}
          src={`https://11.fesp.shop${product.mainImages[0]?.path}`}
        />
        <button
          className="absolute bottom-3 right-3 bg-white p-1.5 rounded-full shadow-bottom"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <img
            className="w-5"
            src={isLiked ? likeIcon.active : likeIcon.default}
          />
        </button>
      </div>
      <div className="pl-[5px] pt-[10px]">
        <p className="text-xs line-clamp-1">{product.name}</p>
        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">
            {product.extra.sale}%
          </span>
          <span className="font-extrabold text-lg">
            {product.extra.saledPrice.toLocaleString()}원
          </span>
        </div>
      </div>
      <Button isWhite={true}>장바구니에 추가</Button>
    </section>
  );
}
