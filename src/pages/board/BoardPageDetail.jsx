import PropTypes from "prop-types";
import { Link } from "react-router-dom";

BoardPageDetail.propTypes = {
  item: PropTypes.shape(),
};

export default function BoardPageDetail({ item }) {
  console.log(item.user.image);
  return (
    <div className="relative">
      <Link to={"1"}>
        <div className="flex flex-row mt-5 items-center">
          <img
            src={`https://11.fesp.shop${item.user.image}`}
            alt="ProfileImage"
            className="w-6 h-6 rounded-full"
          />
          <span className="mx-[5px] text-sm">{item.user.name}</span>

          <span className="ml-auto text-xs self-start">
            댓글 {item.repliesCount}개
          </span>
        </div>
        <div className="mx-[5px] mt-[30px]">{item.content}</div>
        <img
          className="relative mt-10 rounded-md"
          src={`https://11.fesp.shop${item.image}`}
        />
        <div className="text-[10px] text-gray4 text-right mb-5 mt-1">
          {item.updatedAt}
        </div>
      </Link>
      <div className="h-[7px] bg-gray1 -mx-5"></div>
    </div>
  );
}
