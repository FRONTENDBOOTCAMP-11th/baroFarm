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

  if (!reviewData || reviewData.length === 0) {
    return (
      <>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray4">
          구매 내역이 없습니다.
        </p>
      </>
    );
  }

  const groupedData = reviewData.reduce((acc, order) => {
    const date = order.createdAt.split(" ")[0]; // "YYYY.MM.DD" 형식의 날짜 추출
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div className="p-5 pb-0">
      {Object.entries(groupedData).map(([date, orders]) => (
        <div key={date} className="mb-5">
          <p className="font-bold text-lg pl-1">{date}</p>
          {orders.map((order) =>
            order.products.map((product) => (
              <PurchaseItem
                key={product._id}
                orderId={order._id}
                product={product}
                date={order.createdAt}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
}
