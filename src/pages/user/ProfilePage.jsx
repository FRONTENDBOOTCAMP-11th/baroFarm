import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const data = {
    name: "김아무개",
    gender: "남",
    age: 42,
    email: "kimamuge@gmail.com",
    phone: "000-1111-2222",
    extra: {
      userName: "온도감",
    },
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "마이 페이지",
      rightChild: (
        <>
          <HeaderIcon name="search" onClick={() => navigate("/search")} />
          <HeaderIcon name="cart_empty" onClick={() => navigate("/cart")} />
        </>
      ),
    });
  }, []);

  return (
    <div className="pt-[18px] mb-[70px] relative">
      <div className="w-fit mx-auto text-center">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="프로필 이미지"
          className="w-[100px] h-[100px] rounded-full"
        />
        <div className="mt-[25px] mb-[30px] text-2xl font-bold">
          {data.extra.userName}
        </div>
      </div>
      <div className="flex flex-row gap-5 bg-gray5/20 mx-5 px-4 py-[5px] font-medium">
        <section>
          이름 <br />
          성별 <br />
          나이 <br />
          이메일 <br />
          전화번호
        </section>
        <section className="text-gray5">
          {data.name} <br />
          {data.gender} <br />
          {data.age} <br />
          {data.email} <br />
          {data.phone}
        </section>
      </div>
    </div>
  );
}
