import HeaderIcon from "@components/HeaderIcon";
import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

export default function ProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const url = "https://11.fesp.shop";

  const queryClient = useQueryClient();

  const location = useLocation();
  const id = location.state.id;

  /// store에서 user 상태를 초기화하는 함수 가져오기
  const resetUser = useUserStore((store) => store.resetUser);

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "프로필 상세",
    });
  }, []);

  // 이미지 파일 유효성 검사
  const checkImg = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg",
    ]; // 허용 MIME 타입
    if (!validTypes.includes(file.type)) {
      return true;
    }
    return false;
  };

  const addProfileImg = useMutation({
    mutationFn: async (item) => {
      console.log("item", item);
      let imageUrl = null;

      // 이미지 파일 확인 절차
      if (checkImg(item.image[0])) {
        throw new Error(
          "유효하지 않은 파일입니다. 이미지 파일을 업로드 해주십시오.\n\n유효한 파일: jpeg, jpg, png, gif, webp, svm"
        );
      }
      // 이미지 첨부는 필수이므로 이미지 첨부가 되어있지 않다면 아예 생성되지 않음
      if (item.image && item.image[0]) {
        const formData = new FormData();
        formData.append("attach", item.image[0]);
        try {
          const uploadImg = await axios.post(`/files`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imageUrl = uploadImg.data.item[0].path; // 서버에서 반환된 이미지 URL
        } catch (error) {
          console.error(
            "Image upload failed:",
            error.response?.data || error.message
          );
          throw new Error("Image upload failed.");
        }
        const body = {
          image: imageUrl,
        };
        return axios.patch(`/users/${id}`, body);
      }
    },
    onSuccess: () => {
      alert("프로필 이미지 설정 성공!\n설정 적용을 위해 로그아웃합니다");
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      resetUser();
      navigate("/users/mypage");
    },
    onError: (error) => {
      alert(`에러: ${error.message}`);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    addProfileImg.mutate({ image: [file] });
  };

  const setProfileImg = () => {
    if (confirm("프로필 이미지를 변경하시겠습니까?"))
      document.getElementById("profileImgChange").click();
  };

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => axios.get(`/users/${id}`),
    select: (res) => res.data.item,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="pt-[60px] mb-[70px]">
      <div className="w-fit mx-auto text-center relative">
        <img
          id="profileImg"
          src={
            userData?.image
              ? url + userData.image
              : "/images/profile/ProfileImage_Sample.svg"
          }
          alt="Profile Image"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <button className="absolute right-0 -bottom-2" onClick={setProfileImg}>
          <img
            src="/icons/icon_camera.svg"
            alt="이미지 수정 아이콘"
            className="w-7 h-7"
          />
        </button>
        <input
          id="profileImgChange"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="mt-[25px] mb-[30px] mx-auto max-w-fit text-2xl font-bold">
        {userData?.name ? userData.name : "닉네임 없음"}
      </div>
      <div className="flex flex-row gap-5 bg-gray1 mx-5 px-4 py-4 font-medium rounded-md relative">
        <section className="min-w-[65px]">
          이름 <br />
          이메일 <br />
          전화번호 <br />
          주소
        </section>
        <section className="text-gray5 break-keep">
          {userData?.extra?.userName ? userData.extra.userName : "미입력"}{" "}
          <br />
          {userData?.email
            ? userData.email
            : userData.type === "email"
            ? "미입력"
            : "Kakao"}
          <br />
          {userData?.phone ? userData.phone : "미입력"} <br />
          {userData?.address ? userData.address : "미입력"}
        </section>
        <Link
          to={"/users/profile/edit"}
          className="flex w-7 h-7 items-center text-[14px] absolute right-2 top-2 group"
          state={{ user: userData }}
        >
          <img
            src="/icons/icon_profileEdit_full.svg"
            className="h-10 ml-auto"
            alt="addProduct icon"
          />
          <div className="absolute w-auto box-border text-nowrap -translate-x-8 px-1 bg-btn-primary text-white flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="">수정</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
