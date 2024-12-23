export default function CartPage() {
  return (
    <div className="mb-[100px]">
      <section className="py-[14px] flex gap-[6px] items-center border-b border-gray2">
        <input type="checkbox" id="checkAll" />
        <label htmlFor="checkAll">전체 선택 (1/2)</label>
        <button className="ml-auto bg-gray3 px-3 py-1">삭제</button>
      </section>
      <section className="px-5 pb-4 border-b-4 border-gray2">
        <div className="mb-3">
          <div className="py-[10px] border-b border-gray2 text-[14px]">
            팔도다옴
          </div>
          <div className="pt-[10px] flex gap-3">
            <input type="checkbox" className="self-start" />
            <img
              src="/images/sample/food.svg"
              alt="상품 이미지"
              className="size-[72px] object-cover"
            />
            <div>
              <p className="text-xs mb-1">
                [소스증정] 반값!! 고니알탕 (겨울 기획상품)
              </p>
              <p className="text-[10px] text-gray3 mb-1">고니알탕 500g * 4팩</p>
              <div className="flex items-center mb-2">
                <span className="text-[12px] font-semibold text-red1 mr-1">
                  9%
                </span>
                <span className="text-[14px] font-extrabold">14,900원</span>
              </div>
              <div className="ring-1 ring-gray2 w-fit flex *:size-4 *:text-[10px] text-center items-center rounded-sm">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
            </div>
            <button className="self-start">
              <img src="/icons/icon_x.svg" alt="닫기 버튼" />
            </button>
          </div>
        </div>
        <div className="mb-3">
          <div className="py-[10px] border-b border-gray2 text-[14px]">
            팔도다옴
          </div>
          <div className="pt-[10px] flex gap-3">
            <input type="checkbox" className="self-start" />
            <img
              src="/images/sample/food.svg"
              alt="상품 이미지"
              className="size-[72px] object-cover"
            />
            <div>
              <p className="text-xs mb-1">
                [소스증정] 반값!! 고니알탕 (겨울 기획상품)
              </p>
              <p className="text-[10px] text-gray3 mb-1">고니알탕 500g * 4팩</p>
              <div className="flex items-center mb-2">
                <span className="text-[12px] font-semibold text-red1 mr-1">
                  9%
                </span>
                <span className="text-[14px] font-extrabold">14,900원</span>
              </div>
              <div className="ring-1 ring-gray2 w-fit flex *:size-4 *:text-[10px] text-center items-center rounded-sm">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
            </div>
            <button className="self-start">
              <img src="/icons/icon_x.svg" alt="닫기 버튼" />
            </button>
          </div>
        </div>
      </section>
      <section className="px-5 py-3">
        <div className="border-b border-gray2">
          <div className="text-xs flex justify-between mb-3">
            <span className="text-gray4">총 상품 금액</span>
            <span>29,800원</span>
          </div>
          <div className="text-xs flex justify-between mb-3">
            <span className="text-gray4">배송비</span>
            <span>무료</span>
          </div>
        </div>
        <div className="flex justify-between mb-3 py-3 text-[16px] font-bold">
          <span>총 결제 금액</span>
          <span>29,800원</span>
        </div>
      </section>
      <section className="px-5 py-8 bg-gray1 shadow-top">
        <button className="bg-btn-primary py-3 w-full text-white text-xl font-bold rounded-lg">
          22,700원 결제하기
        </button>
      </section>
    </div>
  );
}
