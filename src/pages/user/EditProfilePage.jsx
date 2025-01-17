import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import ErrorPage from "@pages/ErrorPage";
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
      const { value, detailValue, ...userData } = formData;
      console.log(data.address);
      if (data.address && !value) {
        const body = {
          ...userData,
        };
        console.log(body);
        return axios.patch(`/users/${data._id}`, body);
      }
      const body = {
        ...userData,
        address: `${value ? value : ""} ${detailValue ? detailValue : ""}`,
      };
      console.log(body);
      return axios.patch(`/users/${data._id}`, body);
    },
    onSuccess: () => {
      resetUser();
      alert("프로필 정보 변경이 완료되었습니다.");
      alert("설정 적용을 위해 로그아웃합니다. 다시 로그인해주세요.");
      queryClient.invalidateQueries({ queryKey: ["user", data._id] });
      navigate("/users/mypage");
    },
    onError: (err) => {
      console.error("회원 정보 변경 실패:", err);
      return <ErrorPage />;
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
