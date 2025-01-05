import HeaderIcon from "@components/HeaderIcon";
import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

export default function ProfilePage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.user;

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "프로필 상세",
    });
  }, []);

  return (
    <div className="pt-[60px] mb-[70px]">
      <div className="w-fit mx-auto text-center relative">
        <img
          src="/images/profile/Profile_sample_1.jpg"
          alt="프로필 이미지"
          className="w-[100px] h-[100px] rounded-full"
        />
        <button className="absolute right-0 bottom-[50px]">
          <img
            src="/icons/icon_camera.svg"
            alt="이미지 수정 아이콘"
            className="w-7 h-7"
          />
        </button>
        <div className="mt-[25px] mb-[30px] text-2xl font-bold">
          {data.extra.userName}
        </div>
      </div>
      <div className="flex flex-row gap-5 bg-gray1 mx-5 px-4 py-4 font-medium rounded-md relative">
        <section>
          이름 <br />
          성별 <br />
          이메일 <br />
          전화번호 <br />
          주소
        </section>
        <section className="text-gray5">
          {data.name} <br />
          {data.gender} <br />
          {data.email} <br />
          {data.phone} <br />
          {data.address}
        </section>
        <Link
          to={"/users/profile/edit"}
          className="flex w-7 h-7 items-center text-[14px] absolute right-2 top-2 group"
          state={{ user: data }}
        >
          <img
            src="/icons/icon_profileEdit_full.svg"
            className="h-10 ml-auto"
            alt="addProduct icon"
          />
          <div className="absolute w-auto box-border text-nowrap translate-y-6 px-1 bg-btn-primary text-white flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="">수정</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
