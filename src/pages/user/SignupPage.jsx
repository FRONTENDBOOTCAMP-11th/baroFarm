import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SignupPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleSignup = async (data) => {
    try {
      console.log("회원가입 데이터:", data);
      // 여기에 회원가입 API 호출 추가
      // const response = await axios.post("/api/signup", data);

      // 성공 시 로그인 페이지로 이동
      navigate("/users/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="x_thin" onClick={() => navigate("/users/login")} />,
      title: "회원가입",
    });
  }, []);

  return <UserForm buttonText="가입하기" onSubmit={handleSignup} />;
}
