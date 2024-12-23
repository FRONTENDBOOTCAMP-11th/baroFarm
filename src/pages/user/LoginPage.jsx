export default function LoginPage() {
  return (
    <div className="p-5 bg-slate-200">
      {/* 로고 영역 */}
      <div className="m-auto w-[300px] h-[300px]">
        <img className="block w-full" src="/images/Logo1_old.svg" alt="바로팜 로고 이미지" />
      </div>

      {/* 폼 영역 */}
      <form>
        <div className="border-b-4 border-gray2 mb-8 focus-within:border-b-green-400">
          <input type="text" placeholder="이메일" className="placeholder:text-gray4 w-full outline-none" />
        </div>
        <div className="border-b-4  border-gray2 mb-4 focus-within:border-b-green-400">
          <input type="password" placeholder="비밀번호" className="placeholder:text-gray4 w-full outline-none" />
        </div>
        <label className="mb-8 flex items-center gap-1 cursor-pointer font-medium">
          <input className="w-5 h-5 mr-1 rounded-full appearance-none bg-gray2 checked:bg-green-400" type="checkbox" />
          <span>로그인 저장 정보</span>
        </label>
      </form>

      {/* 버튼 그룹 */}
      <div className="mb-5 w-[18.75rem] h-[3.25rem] m-auto">
        <button className="w-[18.75rem] h-[3.25rem] text-center text-xl rounded-full  bg-green-400 font-semibold">
          로그인
        </button>
      </div>
      <div className="mb-10 w-[18.75rem] h-[3.25rem] m-auto">
        <button className="w-[18.75rem] h-[3.25rem] text-center text-xl rounded-full bg-yellow1 font-semibold">
          카카오로 3초 만에 로그인
        </button>
      </div>
      <div className="mb-5 w-[18.75rem] h-[3.25rem] m-auto">
        <button className="w-[18.75rem] h-[3.25rem] text-center text-xl rounded-2xl bg-green-400 font-semibold">
          회원가입
        </button>
      </div>
    </div>
  )
}
