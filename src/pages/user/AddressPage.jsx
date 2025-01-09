import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function AddressPage() {
  // 로그인한 유저 아이디
  const [userId, setUserId] = useState();
  // 로그인한 유저의 주소록
  const [addressList, setAddressList] = useState();
  // axios instance
  const axios = useAxiosInstance();

  // 컴포넌트 렌더링 후 스토리지에 저장된 값으로 userId 상태 업데이트
  useEffect(() => {
    setUserId(JSON.parse(sessionStorage.getItem("user")).state.user._id);
  }, []);

  window.addEventListener("message", (event) => {
    console.log(event.data.message);
  });

  // useEffect(() => {
  //   const addressBook = data?.extra?.address;

  //   const addressItem = addressBook.map((item) => {
  //     return (
  //       <div
  //         key={item.id}
  //         className="[&:not(:last-child)]:border-b border-gray2 py-3"
  //       >
  //         <div className="flex mb-2 justify-between">
  //           <div className="flex flex-col gap-[2px]">
  //             <span className="text-base font-bold text-btn-primary">
  //               {`${data.name}(${item.name})`}
  //             </span>
  //           </div>
  //           <Button>선택</Button>
  //         </div>
  //         <p className="text-sm font-medium mb-2">{item.value}</p>
  //         <div className="flex gap-2">
  //           <Button isWhite={true} color="white">
  //             수정
  //           </Button>
  //           <Button isWhite={true} color="white">
  //             삭제
  //           </Button>
  //         </div>
  //       </div>
  //     );
  //   });

  //   setAddressList(addressItem);
  // }, [data]);

  // if (isLoading) {
  //   return (
  //     <div className="mt-0 mx-auto text-center">
  //       로딩중... <br />
  //       잠시만 기다려주세요
  //     </div>
  //   );
  // }
  // if (isError) {
  //   return (
  //     <div className="mt-0 mx-auto text-center">
  //       에러가 발생했습니다. <br />
  //       잠시 후 다시 시도해주세요.
  //     </div>
  //   );
  // }
  // // 데이터 없을시 null 반환하여 에러 방지
  // if (!data) return null;

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-[18px] font-semibold text-center mb-5">
        배송지 목록
      </h1>
      <section>addressList</section>
    </div>
  );
}
