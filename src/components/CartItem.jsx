import PropTypes from "prop-types";

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  extra: PropTypes.shape({
    seller_name: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    discount: PropTypes.number,
  }),
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
};

export default function CartItem({ name, price, quantity, extra, image }) {
  return (
    <div className="mb-3">
      <div className="py-[10px] border-b border-gray2 text-[14px]">
        {extra.seller_name}
      </div>
      <div className="pt-[10px] flex gap-3">
        <input type="checkbox" className="self-start" />
        <img
          src={image.url}
          alt="상품 이미지"
          className="size-[72px] object-cover"
        />
        <div>
          <p className="text-xs mb-1">{name}</p>
          <p className="text-[10px] text-gray3 mb-1">{extra.option}</p>
          <div className="flex items-center mb-2">
            <span className="text-[12px] font-semibold text-red1 mr-1">{`${
              extra.discount * 100
            }%`}</span>
            <span className="text-[14px] font-extrabold">
              {price.toLocaleString()}원
            </span>
          </div>
          <div className="ring-1 ring-gray2 w-fit flex *:size-4 *:text-[10px] text-center items-center rounded-sm">
            <button>-</button>
            <div>{quantity}</div>
            <button>+</button>
          </div>
        </div>
        <button className="self-start">
          <img src="/icons/icon_x.svg" alt="닫기 버튼" />
        </button>
      </div>
    </div>
  );
}
