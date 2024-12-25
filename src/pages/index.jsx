import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function MainPage() {
  // Outlet 컴포넌트로 전달받은 props.setHeadetContents 접근
  const { setHeadetContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadetContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: <img src="/images/BaroFarmLogo.svg" alt="홈 버튼" />,
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  return <>Main Page</>;
}
