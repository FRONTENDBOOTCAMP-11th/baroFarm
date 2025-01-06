import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function BoardNewPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const isBoard = true;
  const queryClient = useQueryClient();

  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "새 글 작성",
    });
  }, []);

  const check = (item) => {
    console.log(item);
  };

  const addItem = useMutation({
    mutationFn: (item) => {
      const body = {
        title: item.title,
        content: item.content,
        type: "community",
      };
      return axios.post(`https://11.fesp.shop/posts`, body, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
          accept: "application/json",
          "client-id": "final04",
        },
      });
    },
    onSuccess: () => {
      alert("게시물이 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", "community"] });
      navigate(`/board`);
    },
    onError: () => {},
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
