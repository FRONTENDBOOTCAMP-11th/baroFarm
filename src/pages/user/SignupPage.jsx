import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function SignupPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="x_thin" onClick={() => navigate("/users/login")} />,
      title: "회원가입",
    });
  }, []);

  return <UserForm buttonText="가입하기" />;
}
