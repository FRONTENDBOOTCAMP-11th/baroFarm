import PropTypes from "prop-types";

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function HeaderIcon({ name, onClick }) {
  const iconPath = `/icons/icon_${name}.svg`;

  return (
    <button onClick={onClick}>
      <img src={iconPath} className="size-[34px]" />
    </button>
  );
}
