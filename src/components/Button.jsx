import PropTypes from "prop-types";
import clsx from "clsx";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default function Button({
  children,
  type = "button",
  onClick: clickHandler,
  color = "#72BF78",
  width = 40,
  height = 25,
}) {
  // 동적인 클래스는 style 객체 활용
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
  };

  // 정적인 클래스만 사용
  const buttonClass = `rounded-full shrink-0`;

  return (
    <button
      className={buttonClass}
      style={style}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
