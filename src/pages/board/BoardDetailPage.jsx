import { useParams } from "react-router-dom";

export default function BoardDetailPage() {
  const { _id } = useParams();

  return <div>{`${_id}번 게시물입니다.`}</div>;
}
