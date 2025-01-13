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

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`/seller/products?sort={"createdAt": -1}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!user,
  });

  if (isLoading) {
    return <>로딩 중입니다...</>;
  }
  const pastDate = new Date(data[0].createdAt).toLocaleDateString();
  console.log(data, "date: ", pastDate);

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
