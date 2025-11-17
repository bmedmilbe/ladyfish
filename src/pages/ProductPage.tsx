import { useNavigate, useParams } from "react-router-dom";
import UpdateProductForm from "../components/forms/UpdateProductForm";
import Spinner from "../components/Spinner";
import {
  ProductCopy,
  type Product,
} from "../hooks/ground/products/useProducts";
import useProduct from "../hooks/useProduct";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); // Destructure id directly with a type
  const navigate = useNavigate();

  // Parse the ID and handle cases where it's not a number
  const productId = id ? parseInt(id, 10) : null;

  // Use a redirect if the ID is invalid
  if (productId === null || isNaN(productId)) {
    navigate("/");
    return null; // Don't render the component
  }

  // Use the parsed ID directly
  const { data: product, isLoading } = useProduct<Product>(productId);

  if (isLoading) return <Spinner />;

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <span onClick={() => navigate("/products")}>Produtos</span>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            {product?.name}
          </li>
        </ol>
      </nav>

      <hr />

      <UpdateProductForm product={product || ProductCopy} />
    </>
  );
};

export default ProductPage;
