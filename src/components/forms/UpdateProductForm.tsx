import React, { type FormEvent, useState } from "react";
import { type Product } from "../../hooks/ground/products/useProducts";
import {
  measureCopy,
  useMeasure,
} from "../../hooks/ground/products/useMeasure";
import useUpdateProduct from "../../hooks/sharefund/useUpdateProduct";
import useDeleteProduct from "../../hooks/sharefund/useDeleteProduct";
import { useNavigate } from "react-router-dom";
interface Props {
  product: Product;
}
const UpdateProductForm = ({ product }: Props) => {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: product.name,
    price: product.price,
    measure: product.measure,
    nick_name: product.nick_name,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const updateProduct = useUpdateProduct(product);
  const deleteProduct = useDeleteProduct(product);
  const nav = useNavigate();

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const { data: measures } = useMeasure();

  const [chosenMeasure, setChosenMeasure] = useState({
    id: 0,
    name: product.measure.name,
    title: product.measure.title,
  });
  const nextSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let pr = measures?.filter((p) => p.id == parseInt(e.target.value))[0];

    if (pr?.id) {
      setChosenMeasure(pr || measureCopy);
      setFormData({
        ...formData,
        [e.target.id]: pr?.id,
      });
    } else {
      setChosenMeasure(measureCopy);
      setFormData({
        ...formData,
        [e.target.id]: measureCopy,
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    if (formData.name == "") {
      setError("Insira o nome do produto.");
      setLoading(false);
      return;
    }
    setLoading(true);
    updateProduct
      .mutateAsync({
        ...formData,
        measure: formData.measure.id,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setFormData({
          ...formData,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal");
      });
  };
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
        <h1 className="fs-4 text-center">Alterar {product.name}</h1>
        <div className="mb-3">
          <label htmlFor="text" className="form-label fw-bold">
            Nome
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={nextInput}
            placeholder="Peixe Fumo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="measure" className="form-label fw-bold">
            Medida
          </label>
          <select
            className="form-select rounded-0  border-0 border-bottom shadow-none"
            name="measure"
            id="measure"
            required
            value={formData?.measure.id}
            onChange={nextSelect}
          >
            <option value={0}>Escolher...</option>
            {measures?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label fw-bold">
            Preço {chosenMeasure?.title ? `por ${chosenMeasure.title}` : ""}
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={nextInput}
            placeholder="34"
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <div className="p-2">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
          <div className="p-2">
            <span
              className="btn btn-danger"
              onClick={() => {
                deleteProduct.mutateAsync(product);
                nav("/products");
              }}
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateProductForm;
