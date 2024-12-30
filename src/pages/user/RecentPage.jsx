import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";

export default function RecentPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "최근 본 상품",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  return <></>;
}
