import Product from "@components/Product";
import PropTypes from "prop-types";

Products.propTypes = {
  productsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

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
