export default function ReviewItem({ reply }) {
  return (
    <div className="p-5 border-b-8 border-b-gray1">
      <p className="text-sm font-semibold">{reply.name}</p>
      <span className="text-xs font-semibold pr-2">{reply.rate}</span>
      <span className="text-[10px] font-normal text-gray5">{reply.date}</span>

      <div className="relative mt-3">
        <span className="absolute w-full border-[0.5px] border-gray-3"></span>
      </div>

      <p className="mt-7 text-sm font-medium text-gray4">
        옵션: {reply.option}
      </p>
      <p className="mt-1 text-sm font-medium ">{reply.content}</p>
    </div>
  );
}
