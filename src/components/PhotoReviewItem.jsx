import productImage1 from "/images/Sample1.svg";

export default function PhotoReviewItem() {
  return (
    <img
      src={productImage1}
      className="w-[100px] h-[100px] object-cover rounded-md"
    />
  );
}
