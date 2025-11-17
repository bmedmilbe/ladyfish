import React, { type FormEvent, useState } from "react";
import {
  ProductCopy,
  useProducts,
} from "../../hooks/ground/products/useProducts";
import useAddOrderItem from "../../hooks/sharefund/useAddOrderItem";
import type { Order } from "../../hooks/useOrderBySuppliers";
import Spinner from "../Spinner";

interface Props {
  order: Order | undefined;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const AddOrderItemForm = ({ order, setFormOpen }: Props) => {
  const initialForm = {
    id: 1,
    measure: "",
    product: ProductCopy,
    quantity: 0,
    price: 0,
    sub_total: 0,
  };
  const { data: products } = useProducts();
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value || null });
  };
  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setFormData({ ...formData, [e.target.id]: e.target.value || null });
    let pr = products?.filter((p) => p.id == parseInt(e.target.value))[0];
    setFormData({
      ...formData,
      measure: pr?.measure.title || "",
      price: pr?.price || 0,
      [e.target.id]: e.target.value || null,
    });
  };

  const addOrderItem = useAddOrderItem(order);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    addOrderItem
      .mutateAsync({
        ...formData,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormOpen(false);
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal ao Inserir o cliente.");
      });
  };

  if (loading) return <Spinner />;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "30rem",
          margin: "0 auto",
          border: ".1rem solid rgba(0,0,0,.3)",
          borderRadius: "1rem",
        }}
        className="mb-1 p-1"
      >
        <h2 className="fs-4 text-center">Adicionar Item</h2>
        <div className="mb-3">
          <label htmlFor="created_at" className="form-label fw-bold">
            Produto
          </label>
          <select
            className="form-select rounded-0  border-0 border-bottom shadow-none"
            name="product"
            id="product"
            value={formData?.product.id}
            onChange={nextSelect}
          >
            <option value={0}>Escolher...</option>
            {products?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        {formData.product?.id != 0 && (
          <>
            <div className="mb-3">
              <label htmlFor="measure" className="form-label fw-bold">
                Medida
              </label>
              <input
                type="text"
                className="form-control"
                id="measure"
                value={formData.measure}
                onChange={nextInput}
                placeholder=""
                autoComplete={undefined}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label fw-bold">
                Preço por {formData.measure}
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={formData.price}
                onChange={nextInput}
                placeholder="34"
                autoComplete={undefined}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label fw-bold">
                Quantidade em {formData.measure}
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={formData.quantity}
                onChange={nextInput}
                min={1}
                placeholder="34"
                autoComplete={undefined}
              />
            </div>
          </>
        )}
        {error && <div className="text-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <div className="p-2">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Inserindo..." : "Inserir"}
            </button>
          </div>
          <div className="p-2">
            <button
              className="btn btn-secondary"
              onClick={() => setFormOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddOrderItemForm;
