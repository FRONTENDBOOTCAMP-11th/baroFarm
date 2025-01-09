import Button from "@components/Button";
import PGButton from "@components/PGButton";
import useAxiosInstance from "@hooks/useAxiosInstance";
import PortOne from "@portone/browser-sdk/v2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

AddressModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  userData: PropTypes.shape({
    address: PropTypes.string.isRequired,
    extra: PropTypes.shape({
      address: PropTypes.array,
    }).isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
  }).isRequired,
};

export default function AddressModal({ isOpen, onClose, userData }) {
  // 신규 배송지 입력 폼 토글 상태
  const [isOpenForm, setIsOpenForm] = useState(false);
  // axios instance
  const axios = useAxiosInstance();

  // 전달 받은 유저 데이터를 변수에 할당
  const defaultAddress = userData.address;
  const addressBook = userData.extra.address;
  const userName = userData.name;

  // 신규 배송지 입력을 받기 위한 reack-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  // 배송지 추가
  const queryClient = useQueryClient();
  const addAddress = useMutation({
    mutationFn: (formData) => {
      const newAddress = {
        extra: {
          address: [
            ...addressBook,
            {
              id: addressBook[addressBook.length - 1].id + 1,
              userName: formData.userName,
              name: formData.name,
              value: formData.value,
            },
          ],
        },
      };
      const ok = confirm("주소를 등록하시겠습니까?");
      if (ok) axios.patch(`/users/${userData._id}`, newAddress);
    },
    onSuccess: () => {
      alert("신규 주소가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsOpenForm(false);
    },
  });

  // 배송지 삭제
  const deleteAddress = useMutation({
    mutationFn: (targetId) => {
      const filteredAddressList = addressBook.filter(
        (item) => item.id !== targetId
      );
      const newAddressList = {
        extra: {
          address: filteredAddressList,
        },
      };
      console.log("addressBook", addressBook);
      console.log("newAddressList", newAddressList);
      const ok = confirm("이 주소를 삭제하시겠습니까?");
      if (ok) axios.patch(`/users/${userData._id}`, newAddressList);
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // 상태가 변경되면 모달 닫기
  if (!isOpen) return null;

  console.log(userData);

  // 회원가입시 입력한 기본 배송지 렌더링
  const RenderDefaultAddress = () => {
    return (
      <div className="[&:not(:last-child)]:border-b border-gray2 py-3">
        <div className="flex mb-2 justify-between">
          <div className="flex flex-col gap-[2px]">
            <span className="text-base font-bold text-btn-primary">
              {`${userName}`}
            </span>
          </div>
          <Button>선택</Button>
        </div>
        <p className="text-sm font-medium mb-2">{defaultAddress}</p>
      </div>
    );
  };

  // extra.address 속성에 있는 주소 목록으로 추가 주소 렌더링
  const addressItem = addressBook?.map((item) => {
    return (
      <div
        key={item.id}
        className="[&:not(:last-child)]:border-b border-gray2 py-3"
      >
        <div className="flex mb-2 justify-between">
          <div className="flex flex-col gap-[2px]">
            <span className="text-base font-bold text-btn-primary">
              {`${userName}(${item.name})`}
            </span>
          </div>
          <Button>선택</Button>
        </div>
        <p className="text-sm font-medium mb-2">{item.value}</p>
        <div className="flex gap-2">
          <Button isWhite={true} color="white">
            수정
          </Button>
          <Button
            isWhite={true}
            color="white"
            onClick={() => deleteAddress.mutate(item.id)}
          >
            삭제
          </Button>
        </div>
      </div>
    );
  });

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* 모달창 */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">배송지 목록</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* 배송지 추가 버튼 */}
        <Button isBig={true} isWhite={true} onClick={() => setIsOpenForm(true)}>
          + 배송지 신규입력
        </Button>

        {/* 배송지 신규 입력 폼 */}
        {isOpenForm && (
          <form
            onSubmit={handleSubmit(addAddress.mutate)}
            className="my-4 bg-gray1 p-3 rounded-lg"
          >
            <div className="mb-2.5 text-sm">
              <label className="block mb-2.5 font-semibold" htmlFor="email">
                받는 사람
              </label>
              <input
                className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
                type="text"
                id="userName"
                placeholder="받는 사람을 입력해주세요."
                {...register("userName")}
              />
            </div>
            <div className="mb-2.5 text-sm">
              <label className="block mb-2.5 font-semibold" htmlFor="email">
                배송지명
              </label>
              <input
                className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
                type="text"
                id="name"
                placeholder="배송지명을 입력해주세요."
                {...register("name")}
              />
            </div>
            <div className="mb-2.5 text-sm mt-2.5">
              <label className="block mb-2.5 font-semibold" htmlFor="email">
                주소
              </label>
              <input
                className="border border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-btn-primary"
                type="text"
                id="value"
                placeholder="주소를 입력해주세요."
                {...register("value")}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="submit">저장</Button>
              <Button isWhite={true} onClick={() => setIsOpenForm(false)}>
                취소
              </Button>
            </div>
          </form>
        )}

        {/* 배송지 목록 */}
        <>
          <RenderDefaultAddress />
          {addressItem}
        </>
      </div>
    </div>,
    document.body
  );
}
