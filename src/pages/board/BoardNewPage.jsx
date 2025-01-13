import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BoardNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const isBoard = true;
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const axios = useAxiosInstance();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "새 글 작성",
    });
  }, []);

  const addItem = useMutation({
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
            "Image upload failed:",
            error.response?.data || error.message
          );
          throw new Error("Image upload failed.");
        }
        const body = {
          content: item.content,
          type: "community",
          image: imageUrl,
        };
        return axios.post(`/posts`, body);
      } else {
        throw new Error("이미지를 업로드해야 합니다");
      }
    },
    onSuccess: (res) => {
      console.log("data", res.data);
      alert("게시물이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", "community"] });
      navigate(`/board`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="relative mx-5">
      <NewPost
        isBoard={isBoard}
        handleSubmit={handleSubmit(addItem.mutate)}
        register={register}
      ></NewPost>
    </div>
  );
}
