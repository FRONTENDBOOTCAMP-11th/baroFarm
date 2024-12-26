import { useNavigate, useParams } from "react-router-dom";

export default function ProductBig({
  id,
  image,
  title,
  content,
  sale,
  price,
  rate,
  review,
}) {
  const navigate = useNavigate();

  const goDetailPage = () => {
    navigate(`/product/${id}`);
  };
  return (
    <section
      className="flex flex-col shrink-0 py-5 w-[201px]"
      onClick={goDetailPage}
    >
      <img
        className="h-[279px] rounded-lg object-cover"
        alt={title}
        src={image}
      />
      <div className="pl-[5px] pt-[10px]">
        <span className="font-semibold pt-[10px] text-sm">{title}</span>
        <p className="text-xs line-clamp-1">{content}</p>
        <div className="pt-1">
          <span className="text-red1 font-semibold text-base pr-1">{sale}</span>
          <span className="font-extrabold text-lg">{price}</span>
        </div>
        <span className="font-semibold text-xs pr-2">{rate}</span>
        <span className="text-gray4 font-regular text-xs">{review}</span>
      </div>
    </section>
  );
}