import PropTypes from "prop-types";
import clsx from "clsx";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.number,
};

export default function Button({
  children,
  type = "button",
  onClick: clickHandler,
  color = "#72BF78",
  fontSize = 12,
}) {
  // 동적인 클래스는 style 객체 활용
  const style = {
    backgroundColor: color,
    fontSize: fontSize,
  };

  return (
    <button
      className="flex text-center items-center rounded-md shrink-0 text-white font-semibold px-3 py-1"
      style={style}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
