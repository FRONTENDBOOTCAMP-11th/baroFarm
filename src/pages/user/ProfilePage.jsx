import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const data = {
    name: "김아무개",
    gender: "남",
    email: "kimamuge@gmail.com",
    phone: "000-1111-2222",
    auth: "판매자",
    extra: {
      userName: "온도감",
    },
  };

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "프로필 상세",
    });
  }, []);

  return (
    <div className="pt-[18px] mb-[70px]">
      <div className="w-fit mx-auto text-center relative">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="프로필 이미지"
          className="w-[100px] h-[100px] rounded-full border border-btn-primary"
        />
        <Link
          to={"/users/profile/edit"}
          className="flex items-center text-[14px] my-[24px] absolute right-0 top-[25%] group"
        >
          <img
            src="/icons/icon_profileEdit_full.svg"
            className="h-10 ml-auto"
            alt="addProduct icon"
          />
          <div className="absolute w-auto box-border text-nowrap translate-y-8 translate-x-4 px-1 bg-btn-primary text-white flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="">프로필 수정</p>
          </div>
        </Link>
        <div className="mt-[25px] mb-[30px] text-2xl font-bold">
          {data.extra.userName}
        </div>
      </div>
      <div className="flex flex-row gap-5 bg-gray5/20 mx-5 px-4 py-[5px] font-medium">
        <section>
          이름 <br />
          성별 <br />
          이메일 <br />
          전화번호
        </section>
        <section className="text-gray5">
          {data.name} <br />
          {data.gender} <br />
          {data.email} <br />
          {data.phone}
        </section>
      </div>
    </div>
  );
}
