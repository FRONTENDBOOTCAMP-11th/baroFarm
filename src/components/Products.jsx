import Product from "@components/Product";

export default function Products({ productsData }) {
  return (
    <div className="flex flex-wrap justify-between p-5 gap-5">
      {productsData.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}
