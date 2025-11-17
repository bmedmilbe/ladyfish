import { useState } from "react";
import AddProductForm from "../components/forms/AddProductForm";
import Spinner from "../components/Spinner";
import { useProducts } from "../hooks/ground/products/useProducts";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const { data: products, isLoading } = useProducts();
  const [formOpen, setFormOpen] = useState<boolean>();
  const nav = useNavigate();

  if (isLoading) return <Spinner />;
  return (
    <div>
      <h1 className="text-center title-text">Produtos</h1>

      {formOpen && <AddProductForm setFormOpen={setFormOpen} />}

      <div className="text-center">
        {!formOpen && (
          <button
            className={`btn btn-primary`}
            onClick={() => setFormOpen(!formOpen)}
          >
            Adicionar Produto
          </button>
        )}
        <hr />
        <div className="container">
          <div className="row">
            {products?.map((c, index) => (
              <div
                className="m-1 col-xl-3 col-md-3 col-sm-12 border border-1 rounded"
                key={index}
                onClick={() => nav(`/products/${c.id}`)}
              >
                <div className="p-1 d-flex justify-content-between align-items-center">
                  <span>{c.name}</span>
                  <span>
                    {c.price}/{c.measure.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
