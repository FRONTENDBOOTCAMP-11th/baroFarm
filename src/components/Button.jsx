import PropTypes from "prop-types";
import clsx from "clsx";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
  isBig: PropTypes.bool,
};

export default function Button({
  children,
  type = "button",
  onClick: clickHandler,
  color = "#72BF78",
  isBig = false,
}) {
  // 동적인 클래스는 style 객체 활용
  const style = {
    backgroundColor: color,
  };

  const baseClasses =
    "flex items-center justify-center rounded-md shrink-0 text-white";
  const sizeClasses = isBig
    ? "w-full py-3 text-xl font-bold"
    : "py-1 px-3 text-sm font-semibold";

  const classes = clsx(baseClasses, sizeClasses);

  return (
    <button
      className={classes}
      style={style}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
