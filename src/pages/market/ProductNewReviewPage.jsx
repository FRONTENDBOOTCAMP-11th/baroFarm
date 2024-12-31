import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProductNewReviewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "후기 작성",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  return <h1>Product New Review Page</h1>;
}
