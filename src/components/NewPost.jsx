import Button from "@components/Button";
import PropTypes from "prop-types";

NewPost.propTypes = {
  isBoard: PropTypes.bool,
  handleSubmit: PropTypes.func,
  register: PropTypes.func.isRequired,
};

export default function NewPost({ isBoard, handleSubmit, register }) {
  //사용시 use-hook-form의 register를 props로 보내야함

  return (
    <>
      <div className="flex flex-row mt-5 items-center">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="ProfileImage"
          className="w-6 h-6 rounded-full border border-btn-primary"
        />
        <span className="mx-[5px] text-sm">온도감</span>
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
        ></textarea>
        <br />
        {!isBoard && (
          <div>
            <p className="font-semibold">구매하신 상품은 만족하시나요?</p>
            <div className="flex flex-wrap justify-start my-3">
              <button className="border rounded-[10px] px-2 ">⭐️</button>
              <button className="border rounded-[10px] px-2">⭐️⭐️</button>
              <button className="border rounded-[10px] px-2">⭐️⭐️⭐️</button>
              <button className="border rounded-[10px] px-2">
                ⭐️⭐️⭐️⭐️
              </button>
              <button className="border rounded-[10px] px-2">
                ⭐️⭐️⭐️⭐️⭐️
              </button>
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
        <Button width="100%" height="45px" fontSize={24} type="submit">
          등록
        </Button>
      </form>
    </>
  );
}
