import Button from "@components/Button";
import HeaderIcon from "@components/HeaderIcon";
import NewPost from "@components/NewPost";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/useUserStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

export default function BoardEditPage() {
  const { setHeaderContents } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  const { _id } = useParams();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "게시글 수정하기",
    });
  }, []);

  // Zustand store에서 user 상태를 가져옴
  const user = useUserStore((store) => store.user);
  // 익명의 사용자가 편집 페이지에 접근하는 것을 방지
  // 작성자가 아닌 타인미 편집하는 것을 방지
  useEffect(() => {
    if (!user || user._id !== data.user._id) {
      navigate("/");
    }
  }, [user]);

  const checkImg = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg",
    ]; // 허용 MIME 타입
    if (!validTypes.includes(file.type)) {
      return true;
    }
    return false;
  };

  const editPost = useMutation({
    mutationFn: async (item) => {
      let imageUrl = null;

      // 이미지 변경을 진행했을 경우 처음 등록할 때와 같이 업로드를 진행한 후 body에 imgURL을 추가
      // 단, 이미지 업로드는 필수가 아님
      if (item.image && item.image[0]) {
        if (checkImg(item.image[0])) {
          throw new Error(
            "jpeg, jpg, png, gif, webp, svg 파일을 업로드해야 합니다."
          );
        }
        const formData = new FormData();
        formData.append("attach", item.image[0]);
        try {
          const uploadImg = await axios.post(`/files`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imageUrl = uploadImg.data.item[0].path; // 서버에서 반환된 이미지 URL
          const body = {
            content: item.content,
            image: imageUrl,
          };
          return axios.patch(`/posts/${_id}`, body);
        } catch (error) {
          console.error(
            "Image upload failed:",
            error.response?.data || error.message
          );
          throw new Error("Image upload failed.");
        }
      } else {
        const body = {
          content: item.content,
        };
        return axios.patch(`/posts/${_id}`, body);
      }
    },
    onSuccess: () => {
      alert("게시물이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", _id] });
      navigate(`/board/${_id}`);
    },
    onError: (err) => {
      console.error(err);
      alert(err);
    },
  });

  return (
    <NewPost
      isBoard={true}
      handleSubmit={handleSubmit(editPost.mutate)}
      register={register}
      editInfo={data.content}
    />
  );
}
