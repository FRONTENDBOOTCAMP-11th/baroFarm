import { Link } from "react-router-dom";
import forwardIcon from "/icons/icon_forward_thin.svg";

export default function MenuItem({ to, image, title }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between border-b-[1px] p-5"
    >
      <span className="flex items-center gap-2">
        <img src={image} className="w-10 rounded-full" />
        <span>{title}</span>
      </span>
      <img src={forwardIcon} />
    </Link>
  );
}
