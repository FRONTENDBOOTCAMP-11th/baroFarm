import productImage from "/images/Sample1.svg";

export default function SoldItem() {
  return (
    <section className="flex gap-5 border-b-[0.5px] border-gray2 py-3">
      <img
        src={productImage}
        className=" w-[100px] h-[100px] object-cover rounded-md"
      />
      <div className="py-3 text-sm">
        <p className="font-semibold ">너구리 앵그리 121g, 5개</p>
        <p className="text-xs  text-gray5 py-1 pb-3"> 12/31(화) 판매 완료</p>
        <span className="font-semibold">4,280 원</span>
        {/* 판매된 갯수 */}
        <span className="ml-4">1개</span> 판매
        <div>
          남은 수량: <span>249</span>개
        </div>
      </div>
    </section>
  );
}
