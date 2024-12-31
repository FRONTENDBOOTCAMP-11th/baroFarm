import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";

import productImage from "/images/Sample1.svg";
import PurchaseItem from "@components/PurchaseItem";

export default function PurchasePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "구매 내역",
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
        <PurchaseItem />
        <PurchaseItem />
        <PurchaseItem />
      </div>
      <div className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">2024. 12. 30</p>
        <PurchaseItem />
        <PurchaseItem />
        <PurchaseItem />
      </div>
      <div className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">2024. 12. 30</p>
        <PurchaseItem />
        <PurchaseItem />
        <PurchaseItem />
      </div>
    </>
  );
}
