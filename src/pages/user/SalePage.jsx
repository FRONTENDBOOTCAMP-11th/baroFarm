import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import HeaderIcon from "@components/HeaderIcon";
import SoldItem from "@components/SoldItem";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import useAxiosInstance from "@hooks/useAxiosInstance";

export default function SalePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const axios = useAxiosInstance();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "판매 내역",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  // useEffect(() => {
  //   const userCheck= () => {try {}} axios.get(`/users/${user._id}/type`);
  //   if (userCheck === "user") {
  //     navigate("/users/mypage");
  //   }
  // }, [user]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`/seller/products?sort={"createdAt": -1}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!user,
  });

  if (isLoading) {
    return <>로딩 중입니다...</>;
  }

  // const pastDate1 = new Date(data[0].createdAt).toLocaleDateString();
  // const pastDate2 = new Date(data[3].createdAt).toLocaleDateString();
  console.log(data);

  const groupedData = data.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString(); // 날짜만 추출 (YYYY.MM.DD)
    if (!acc[date]) acc[date] = []; // 날짜 키가 없으면 생성
    acc[date].push(item); // 날짜 키에 데이터 추가
    return acc;
  }, {});
  const groupedArray = Object.entries(groupedData).map(([date, items]) => ({
    date,
    items,
  }));

  console.log(groupedArray[1]);

  const SoldItemList = groupedArray.map((data) => {
    return (
      <div key={data.date} className="p-5 pb-0">
        <p className="font-bold text-lg pl-1">{data.date}</p>
        {data.items.map((item) => (
          <SoldItem key={item._id} item={item} />
        ))}
      </div>
    );
  });
  return (
    <>
      {data && <>{SoldItemList}</>}
      {!data && (
        <div className="text-center my-auto py-5">
          아직 등록된 물품이 없습니다.
        </div>
      )}
    </>
  );
}
