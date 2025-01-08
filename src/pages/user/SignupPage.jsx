import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SignupPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const axios = useAxiosInstance();
  const handleSignup = useMutation({
    mutationFn: (formData) => axios.post("/users", formData),
    onSuccess: (res) => {
      console.log("회원가입 성공 데이터:", res.data);
      alert("회원가입이 완료되었습니다.");
      navigate("/users/login");
    },
    onError: (err) => {
      console.error("회원가입 실패:", err);
      alert("회원가입에 실패했습니다.");
      navigate("/users/signup");
    },
  });

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="x_thin" onClick={() => navigate("/users/login")} />,
      title: "회원가입",
    });
  }, []);

  return <UserForm buttonText="가입하기" onSubmitUser={handleSignup.mutate} />;
}
