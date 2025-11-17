import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteSupplier from "../../hooks/sharefund/useDeleteSupplier";
import { type Supplier } from "../../hooks/useGroupMembers";
import Spinner from "../Spinner";

interface Props {
  supplier: Supplier | undefined;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const DeleteSupplierForm = ({ supplier, setFormOpen }: Props) => {
  const initialForm = {
    id: 0,
    supplier: supplier,
    created_at: "",
    inserted_at: "",
    order_paid: false,
    payment_proof: "",
    receipt: "",
    order_number: "",
    value_paid: 0,
    total_price: 0,
    balance: 0,
    orderitems: [],
    name: "",
    address: "",
    phone: "",
    email: "",
    nick_name: "",
  };

  const nav = useNavigate();
  const [formData] = useState(initialForm);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSupplier = useDeleteSupplier(supplier);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    deleteSupplier
      .mutateAsync({
        ...formData,
      })
      .then((res) => {
        console.log(res);
        nav(`/`);
        setLoading(false);
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal ao eliminar o fornecedor.");
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
        <h2 className="fs-4 text-center">Eliminar Fornecedor</h2>
        <p>Tem certeza que quer eliminar esse fornecedor?</p>

        {error && <div className="text-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <div className="p-2">
            <button className="btn btn-danger" disabled={loading}>
              {loading ? "Eliminando..." : "Sim, Eliminar"}
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

export default DeleteSupplierForm;
