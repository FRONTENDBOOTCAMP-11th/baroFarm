import PropTypes from "prop-types";

Header.propTypes = {
  leftChild: PropTypes.node,
  title: PropTypes.node.isRequired,
  rightChild: PropTypes.node,
};

export default function Header({ leftChild, title, rightChild }) {
  return (
    <header className="flex h-[70px] px-5 items-center justify-between border-b border-gray3 *:flex">
      <div className="shrink-0 w-[25%] *:size-[34px]">{leftChild}</div>
      <div className="justify-center grow w-[50%] text-[18px] font-semibold *:h-[70px]">
        {title}
      </div>
      <div className="shrink-0 w-[25%] gap-[10px] justify-end *:size-[34px] *:flex">
        {rightChild}
      </div>
    </header>
  );
}
