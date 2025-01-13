import createdTime from "@components/createdTime";
import useUserStore from "@zustand/useUserStore";
import PropTypes from "prop-types";

CommentItem.propTypes = {
  item: PropTypes.shape({
    createdAt: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      _id: PropTypes.number,
    }),
    content: PropTypes.string,
  }),
};

export default function CommentItem({ item }) {
  const { user } = useUserStore();
  console.log(item);

  const newDate = createdTime(item.createdAt);
  return (
    <>
      <div className="flex flex-row mt-5 px-[15px] items-center">
        <img
          src={`https://11.fesp.shop${item.user.image}`}
          alt="ProfileImage"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="mx-[5px] text-sm">{item.user.name}</span>
        <span className="text-[10px] ml-auto text-gray4 self-start">
          {newDate}
        </span>
      </div>
      <div className="flex pb-5 border-b-[1px] border-gray3/50 px-[15px]">
        <div className="mt-3 text-xs text-gray5 pl-5">{item.content}</div>
        {user._id === item.user._id && (
          <span className="ml-auto text-xs mt-auto flex-shrink-0">
            <button>삭제</button>
          </span>
        )}
      </div>
    </>
  );
}
