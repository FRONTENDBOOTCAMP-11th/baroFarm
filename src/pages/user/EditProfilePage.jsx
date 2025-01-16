import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function EditProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.user;
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { resetUser } = useUserStore();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "개인정보 수정",
    });
  }, []);

  const editUserInfo = useMutation({
    mutationFn: (formData) => {
      console.log(formData);
      return axios.patch(`/users/${data._id}`, formData);
    },
    onSuccess: () => {
      resetUser();
      alert(
        "프로필 정보 변경이 완료되었습니다. 설정 적용을 위해 로그아웃합니다"
      );
      queryClient.invalidateQueries({ queryKey: ["user", data._id] });
      navigate("/users/mypage");
    },
    onError: (err) => {
      console.error("회원 정보 변경 실패:", err);
    },
  });
  return (
    <UserForm
      buttonText="수정하기"
      userInfo={data}
      onSubmitUser={editUserInfo.mutate}
    />
  );
}
