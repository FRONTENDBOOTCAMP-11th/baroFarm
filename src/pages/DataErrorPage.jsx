import { useRouteError } from "react-router-dom";
import logoImage from "/images/BaroFarmIcon.png";

export default function DataErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-btn-primary font-semibold text-5xl">Server Error</h1>
      <p className="text-gray5 text-center pt-4">
        서버에서 예상치 못한 오류가 발생했습니다. <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <img src={logoImage} className="w-[300px]" />
      <button className="text-white  bg-btn-primary px-6 py-2 rounded-md">
        메인으로
      </button>
    </div>
  );
}
