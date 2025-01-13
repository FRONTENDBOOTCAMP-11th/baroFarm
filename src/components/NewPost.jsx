import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import PropTypes from "prop-types";
import { useState } from "react";

const starIcon = {
  active: "/icons/icon_star_full.svg",
  default: "/icons/icon_star_empty.svg",
};

NewPost.propTypes = {
  isBoard: PropTypes.bool,
  handleSubmit: PropTypes.func,
  register: PropTypes.func.isRequired,
  editInfo: PropTypes.string,
};

export default function NewPost({ isBoard, handleSubmit, register, editInfo }) {
  const [selectedStar, setSelectedStar] = useState(0);
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  const handleClick = (index) => setSelectedStar(index);

  const { data } = useQuery({
    queryKey: ["user", user?._id],
    queryFn: () => axios.get(`/users/${user._id}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!user,
  });

  if (!data) {
    //이 아래에는 로딩 페이지
    return;
  }

  return (
    <div className="p-5">
      <div className="flex flex-row items-center">
        <img
          src={
            data.image
              ? `https://11.fesp.shop${data.image}`
              : "/images/profile/ProfileImage_Sample.svg"
          }
          alt="ProfileImage"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="mx-[5px] text-sm">{data.name}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          id="content"
          className="w-full mt-[10px] mb-[25px] h-[200px] p-3 border-gray3 border-[1px] bg-gray2/20 focus:outline-btn-primary rounded-md"
          placeholder="본문 내용을 입력해주세요."
          {...register("content", {
            required: "본문 내용을 입력해주세요",
          })}
          defaultValue={editInfo ? editInfo : null}
        ></textarea>
        <br />

        {!isBoard && (
          <div>
            <p className="font-semibold">구매하신 상품은 만족하시나요?</p>
            <div className="flex flex-wrap justify-start my-3 mt-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <img
                  key={index}
                  src={
                    selectedStar >= index ? starIcon.active : starIcon.default
                  }
                  alt={`${index} star`}
                  className="w-8 cursor-pointer -mr-1"
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
        )}

        <label className="font-bold">이미지 첨부</label>
        <input
          type="file"
          id="attach"
          accept="image/*"
          placeholder="이미지를 선택하세요"
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 mt-[10px] mb-[25px]"
          name="attach"
          {...register("image")}
        />
        <button className="w-full bg-btn-primary p-3 rounded-lg text-white text-lg ">
          등록
        </button>
      </form>
    </div>
  );
}
