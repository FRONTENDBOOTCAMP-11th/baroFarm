export default function SignupPage() {
  return (
    <form className="p-5 bg-slate-200">
      {/* 이메일 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="email">
          이메일
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-green1"
          type="email"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          required
        />
      </div>
      {/* 비밀번호 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="password">
          비밀번호
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-green1"
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          required
        />
      </div>
      {/* 비밀번호 확인 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="confirmPassword">
          비밀번호 확인
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-green1"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호를 한번 더 입력해주세요"
          required
        />
      </div>
      {/* 이름 */}
      <div className="mb-2.5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="userName">
          이름
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-green1"
          type="text"
          id="userName"
          name="userName"
          placeholder="이름을 입력해주세요"
          required
        />
      </div>
      {/* 휴대폰 */}
      <div className="mb-5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="phone">
          휴대폰
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 mb-2.5 outline-none focus:border-green1"
          type="tel"
          pattern="[0-9]*"
          id="phone"
          name="phone"
          placeholder="숫자만 입력해주세요"
          required
        />
      </div>
      {/* 회원 유형 */}
      <div className="flex items-center gap-5 text-sm mb-5">
        <p className="font-semibold">회원 유형</p>
        <div className="flex items-center gap-1">
          <input
            className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-green1 cursor-pointer"
            type="radio"
            id="memberType-buyer"
            name="memberType"
            value="buyer"
            required
          />
          <label className="cursor-pointer" htmlFor="memberType-buyer">
            구매회원
          </label>
          <input
            className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-green1 cursor-pointer ml-2.5"
            type="radio"
            id="memberType-seller"
            name="memberType"
            value="seller"
            checked
            required
          />
          <label className="cursor-pointer" htmlFor="memberType-seller">
            판매회원
          </label>
        </div>
      </div>
      {/* 주소 */}
      <div className="mb-5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="address">
          주소
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 mb-0.5 outline-none focus:border-green1"
          type="text"
          id="address"
          name="address"
          placeholder="주소를 입력해주세요"
          required
        />
        <span className="text-xs ml-1">배송지에 따라 상품 정보가 달라질 수 있습니다.</span>
      </div>
      {/* 닉네임 */}
      <div className="mb-5 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="name">
          닉네임
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 mb-0.5 outline-none focus:border-green1"
          type="text"
          id="name"
          name="name"
          placeholder="닉네임을 입력해주세요"
          required
        />
      </div>
      {/* 성별 */}
      <div className="flex items-center gap-5 text-sm mb-5">
        <p className="font-semibold">성별</p>
        <div className="flex items-center gap-1">
          <input
            className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-green1 cursor-pointer"
            type="radio"
            id="gender-male"
            name="gender"
            value="male"
            required
          />
          <label className="cursor-pointer" htmlFor="gender-male">
            남자
          </label>
          <input
            className="w-3.5 h-3.5 rounded-full appearance-none bg-gray2 checked:bg-green1 cursor-pointer ml-2.5"
            type="radio"
            id="gender-female"
            name="gender"
            value="female"
            required
          />
          <label className="cursor-pointer" htmlFor="gender-female">
            여자
          </label>
        </div>
      </div>
      {/* 생년월일 */}
      <div className="mb-6 text-sm">
        <label className="block mb-2.5 font-semibold" htmlFor="birth">
          생년월일
        </label>
        <input
          className="border-2 border-gray3 rounded-md w-full p-2 placeholder:font-thin placeholder:text-gray4 outline-none focus:border-green1"
          type="date"
          id="birth"
          name="birth"
          required
        />
      </div>
      {/* 가입하기 버튼 */}
      <button
        className="w-[18.75rem] h-[3.25rem] text-center text-xl rounded-2xl bg-green1 font-semibold block m-auto mb-1"
        type="submit"
      >
        가입하기
      </button>
    </form>
  )
}
