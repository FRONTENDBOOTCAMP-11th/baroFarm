import Product from "@components/Product";

export default function Products({ productsData }) {
  // console.log(productsData);
  return (
    <div className="flex flex-wrap justify-between p-5 gap-5">
      {productsData.map((product) => (
        <Product key={product._id} productId={product._id} />
      ))}
    </div>
  );
}
