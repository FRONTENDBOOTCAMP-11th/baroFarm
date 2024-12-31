import PropTypes from "prop-types";

CartItemPayment.propTypes = {
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

export default function CartItemPayment({
  name,
  price,
  quantity,
  extra,
  image,
}) {
  return (
    <div className="mb-3 [&:not(:last-child)]:pb-5 [&:not(:last-child)]:border-b border-gray2">
      <div className="text-sm font-bold">{extra.seller_name}</div>
      <div className="pt-2 flex gap-3">
        <img
          src={image.url}
          alt="상품 이미지"
          className="size-[72px] object-cover"
        />
        <div className="flex flex-col">
          <p className="text-xs mb-1">{name}</p>
          <p className="text-xs text-gray3 mb-1">{extra.option}</p>
          <span className="text-[16px] font-extrabold mt-auto">
            {price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
}
