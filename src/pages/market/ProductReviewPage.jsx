import { useParams } from "react-router-dom";

export default function ProductReviewPage() {
  const { _id } = useParams();

  return <div>{`${_id}번 상품 리뷰입니다.`}</div>;
}
