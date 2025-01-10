import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function EditProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.user;
  const axios = useAxiosInstance();
  0;
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "개인정보 수정",
    });
  }, []);

  const editUserInfo = useMutation({
    mutationFn: (formData) => axios.patch(`/users/${data._id}`, formData),
    onSuccess: (res) => {
      console.log(res);
      const newName = res.data.item.name;
      // 현재 유저 스토어에 기록되어 있는 내용을 재갱신
      setUser({ ...user, name: newName });
      alert("프로필 정보 변경이 완료되었습니다.");
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
