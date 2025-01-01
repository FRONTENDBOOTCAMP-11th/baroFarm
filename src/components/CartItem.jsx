import Checkbox from "@components/Checkbox";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

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
  _id: PropTypes.number.isRequired,
  setCartItemsId: PropTypes.func.isRequired,
};

export default function CartItem({
  name,
  price,
  quantity,
  extra,
  image,
  _id,
  setCartItemsId,
}) {
  // 체크 박스 선택시 아이템을 구매 페이지로 넘길것인지에 대한 로직
  const findItem = () => {
    setCartItemsId((prevState) => {
      const hasItem = prevState.includes(_id);
      console.log(prevState);
      if (!hasItem) {
        return [...prevState, _id];
      } else {
        return prevState.filter((item) => item !== _id);
      }
    });
  };

  return (
    <div className="mb-3">
      <div className="py-[10px] border-b border-gray2 text-[14px]">
        {extra.seller_name}
      </div>
      <div className="pt-[10px] flex gap-3">
        <Checkbox onClick={findItem} />
        <img
          src={image.url}
          alt="상품 이미지"
          className="size-[72px] object-cover"
        />
        <div>
          <p className="text-xs mb-1">{name}</p>
          <p className="text-xs text-gray3 mb-1">{extra.option}</p>
          <div className="flex items-center mb-2">
            <span className="text-xs font-semibold text-red1 mr-1">{`${
              extra.discount * 100
            }%`}</span>
            <span className="text-[16px] font-extrabold">
              {price.toLocaleString()}원
            </span>
          </div>
          <div className="ring-1 ring-gray2 w-fit flex text-center items-center rounded-sm *:flex *:items-center *:justify-center *:size-6 *:text-sm">
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
