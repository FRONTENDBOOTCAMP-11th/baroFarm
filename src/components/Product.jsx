import { useNavigate, useParams } from "react-router-dom";

export default function Product({
  id,
  image,
  title,
  content,
  sale,
  price,
  rate,
  review,
}) {
  return (
    <section className="flex-col py-5 w-[165px]">
      <img
        className="h-[165px] rounded-lg object-cover alt={title}"
        src={image}
      />
      <div className="pl-[5px] pt-[10px]">
        <span className="font-semibold pt-[10px] text-sm">{title}</span>
        <p className="text-xs">{content}</p>
        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">{sale}</span>
          <span className="font-extrabold text-lg">{price}</span>
        </div>
        <span className="font-semibold text-xs pr-2">{rate}</span>
        <span className="text-gray4 font-regular text-xs ">{review}</span>
      </div>
    </section>
  );
}
