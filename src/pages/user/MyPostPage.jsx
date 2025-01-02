import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";

export default function MyPost() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const myPosts = useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "내가 작성한 글",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  return (
    <>
      <div className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">2024. 12. 30</p>
        <SoldItem />
        <SoldItem />
        <SoldItem />
      </div>
      <div className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">2024. 12. 29</p>
        <SoldItem />
        <SoldItem />
        <SoldItem />
      </div>
      <div className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">2024. 12. 28</p>
        <SoldItem />
        <SoldItem />
        <SoldItem />
      </div>
    </>
  );
}
