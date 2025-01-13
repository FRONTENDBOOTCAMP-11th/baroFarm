import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useOutletContext } from "react-router-dom";

import axios from "axios";

import HeaderIcon from "@components/HeaderIcon";

import productImage from "/images/Sample1.svg";
import PurchaseItem from "@components/PurchaseItem";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

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

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchase"],
    queryFn: async () => {
      const response = await axios.get(
        `https://11.fesp.shop/orders?sort={"createdAt": -1}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "client-id": "final04",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      return response.data.item;
    },
  });

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
