import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { _id } = useParams();

  return <div>{`${_id}번 상품입니다.`}</div>;
}
