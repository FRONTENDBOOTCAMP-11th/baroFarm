import { useRouteError, useNavigate } from "react-router-dom";
import logoImage from "/images/BaroFarmIcon.png";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-btn-primary font-semibold text-5xl">Not Found</h1>
      <p className="text-gray5 text-center pt-4">
        페이지의 주소가 잘못 입력되었거나,
        <br /> 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <img src={logoImage} className="w-[300px]" />
      <button
        className="text-white  bg-btn-primary px-6 py-2 rounded-md"
        onClick={() => navigate(`/`)}
      >
        메인으로
      </button>
    </div>
  );
}
