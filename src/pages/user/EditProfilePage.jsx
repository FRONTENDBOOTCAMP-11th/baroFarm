import HeaderIcon from "@components/HeaderIcon";
import UserForm from "@components/UserForm";
import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

export default function EditProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.user;

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "개인정보 수정",
    });
  }, []);

  return <UserForm buttonText="수정하기" userInfo={data} />;
}
