import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SignupPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleSignup = async (formData) => {
    try {
      const { data } = await axios.post("https://11.fesp.shop/users", formData, {
        headers: {
          "client-id": "final04",
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      console.log("회원가입 데이터:", data);
      alert("회원가입이 완료되었습니다.");
      navigate("/users/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
      navigate("/users/signup");
    }
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="x_thin" onClick={() => navigate("/users/login")} />,
      title: "회원가입",
    });
  }, []);

  return <UserForm buttonText="가입하기" onSubmitUser={handleSignup} />;
}
