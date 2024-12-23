import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return <div>{`${category} 카테고리 페이지입니다.`}</div>;
}
