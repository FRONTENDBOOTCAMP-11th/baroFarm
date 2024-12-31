import PropTypes from "prop-types";

NewPost.propTypes = {
  formRef: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func,
  submit: PropTypes.func,
  register: PropTypes.func.isRequired,
};

export default function NewPost({ formRef, handleSubmit, register }) {
  //사용시 use-hook-form의 register를 props로 보내야함

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
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
      <label className="font-bold">이미지 첨부</label>
      <input
        type="file"
        id="attach"
        accept="image/*"
        placeholder="이미지를 선택하세요"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 mt-[10px]"
        name="attach"
        {...register("image")}
      />
    </form>
  );
}
