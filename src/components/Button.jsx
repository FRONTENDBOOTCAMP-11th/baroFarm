import PropTypes from "prop-types";

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
  color = "btn-primary",
  width = 40,
  height = 25,
}) {
  return (
    <button
      className={`rounded-full w-[${width}px] h-[${height}px] bg-${color}`}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
