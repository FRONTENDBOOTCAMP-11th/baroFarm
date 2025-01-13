import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import { useEffect, useState } from "react";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  useNavigate,
  useOutletContext,
  useParams,
  useLocation,
} from "react-router-dom";

export default function ProductNewReviewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const queryClient = useQueryClient();
  const axios = useAxiosInstance();

  const { _id, order_id } = useParams();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "후기 작성",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const [rating, setRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
  };

  const addReview = useMutation({
    mutationFn: async (item) => {
      let imageUrl = null;

      if (item.image && item.image[0]) {
        const formData = new FormData();
        formData.append("attach", item.image[0]);
        try {
          const uploadImg = await axios.post(`/files`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imageUrl = uploadImg.data.item[0].path; // 서버에서 반환된 이미지 URL
        } catch (error) {
          console.error(
            "Upload failed:",
            error.response?.data || error.message
          );
          throw new Error("Upload failed.");
        }
        const body = {
          order_id: order_id,
          product_id: _id,
          rating: rating,
          content: item.content,
          extra: {
            image: imageUrl,
          },
        };
        return axios.post(`/replies`, body);
      } else {
        throw new Error("이미지를 업로드해야 합니다");
      }
    },
    onSuccess: () => {
      alert("후기가 등록되었습니다.");
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["post", "review"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <>
      <NewPost
        isBoard={false}
        handleSubmit={handleSubmit(addReview.mutate)}
        register={register}
        handleRating={handleRating}
      ></NewPost>
    </>
  );
}
