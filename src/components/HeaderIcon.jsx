import PropTypes from "prop-types";

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// 장바구니에 임의로 아이템을 넣어 놓음.
const DUMMY_cart = ["item", "item"];

export default function HeaderIcon({ name, onClick }) {
  const iconPath = `/icons/icon_${name}.svg`;

  // 장바구니가 차 있는지 아닌지 확인하는 상태관리 변수
  let isFullCart = false;
  // 장바구니 아이콘이고, 장바구니가 차 있으면 상태를 변경
  if (name.startsWith("cart") && DUMMY_cart.length > 0) {
    isFullCart = true;
  }

  return (
    <button onClick={onClick} className="relative">
      <img src={iconPath} className="size-[34px]" />
      {isFullCart && (
        <span className="flex justify-center items-center text-xs text-white absolute size-4 bg-red1 rounded-full right-0 top-0">
          {DUMMY_cart.length}
        </span>
      )}
    </button>
  );
}
