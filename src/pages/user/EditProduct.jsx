import HeaderIcon from "@components/HeaderIcon";
import ProductInfoForm from "@components/ProductInfoForm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setHeaderContents } = useOutletContext();

  useEffect(() => {
    setHeaderContents({
      leftChild: <HeaderIcon name="back" onClick={() => navigate(-1)} />,
      title: "상품 정보 수정",
      rightChild: (
        <>
          <HeaderIcon name="home_empty" onClick={() => navigate("/")} />
        </>
      ),
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => axios.get(`/products/${id}`),
    select: (res) => res.data.item,
    staleTime: 1000 * 10,
  });

  const patchProduct = useMutation({
    mutationFn: (formData) => {
      axios.patch(`/seller/products/${id}`, formData);
    },
    onSuccess: () => {
      alert("상품 정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      navigate("/users/sale");
    },
    onError: (err) => {
      console.err(err);
      alert("에러 메시지: ", err);
    },
  });

  if (isLoading) {
    return;
  }

  console.log(data);

  return (
    <ProductInfoForm
      register={register}
      handlesubmit={handleSubmit(patchProduct.addmutate)}
      errors={errors}
      price={price}
      setPrice={setPrice}
      isEdit={true}
      editInfo={data}
    ></ProductInfoForm>
  );
}
