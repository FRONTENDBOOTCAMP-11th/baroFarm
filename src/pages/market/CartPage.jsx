import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function CartPage() {
  // Outlet 컴포넌트로 전달받은 props.setTitle에 접근
  const { setHeadetContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeadetContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "장바구니",
    });
  }, []);

  return <div>CartPage</div>;
}
