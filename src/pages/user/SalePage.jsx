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

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`/seller/products?sort={"createdAt": -1}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!user,
    isError: navigate("/users/mypage"),
  });

  if (isLoading) {
    return <>로딩 중입니다...</>;
  }

  if (isError) {
    navigate("/users/mypage");
  }

  const pastDate1 = new Date(data[0].createdAt).toLocaleDateString();
  const pastDate2 = new Date(data[3].createdAt).toLocaleDateString();
  console.log(pastDate1 === pastDate2);

  const SoldItemList = data.map((item) => {
    <SoldItem />;
  });
  return (
    <>
      {data && (
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
      )}
      {!data && (
        <div className="text-center my-auto py-5">
          아직 등록된 물품이 없습니다.
        </div>
      )}
    </>
  );
}
