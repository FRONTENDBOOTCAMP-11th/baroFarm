import useUserStore from "@zustand/useUserStore";
import PropTypes from "prop-types";

CommentItem.propTypes = {
  item: PropTypes.shape(),
};

export default function CommentItem({ item }) {
  const { user } = useUserStore();
  console.log(item);
  return (
    <div className="px-[15px] ">
      <div className="flex flex-row mt-5">
        <img
          src={`https://11.fesp.shop${item.user.image}`}
          alt="ProfileImage"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="mx-[5px] text-sm">{item.user.name}</span>
        <span className="text-[10px] mt-[6px] ml-auto text-gray4">3분 전</span>
      </div>
      <div className="flex pb-5 border-b-[1px] border-gray3/50">
        <div className="mt-3 text-xs text-gray5">{item.content}</div>
        {user._id === item.user._id && (
          <span className="ml-auto text-xs mt-auto">
            <button>수정</button> | <button>삭제</button>
          </span>
        )}
      </div>
    </div>
  );
}
