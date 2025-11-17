import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddOrder from "../../hooks/sharefund/useAddOrder";
import { supplierCopy, type Supplier } from "../../hooks/useGroupMembers";
import Spinner from "../Spinner";

interface Props {
  supplier: Supplier | undefined;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const AddOrderForm = ({ supplier, setFormOpen }: Props) => {
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
    orderpaymentproofs: [],
    orderreceipts: [],
  };

  const nav = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value || null });
  };

  const addOrder = useAddOrder(supplier?.id || 0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    addOrder
      .mutateAsync({
        ...formData,
        supplier: formData.supplier ? formData.supplier : supplierCopy,
      })
      .then((res) => {
        // console.log(res);
        nav(`/suppliers/${supplier?.id}/orders/${res.id}`);
        setLoading(false);

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
        <h2 className="fs-4 text-center">Novo Pedido</h2>
        <div className="mb-3">
          <label htmlFor="created_at" className="form-label fw-bold">
            Data
          </label>
          <input
            type="date"
            className="form-control"
            id="created_at"
            value={formData.created_at}
            onChange={nextInput}
            placeholder="2025-06-24"
            autoComplete={undefined}
          />
        </div>

        {error && <div className="text-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Inserindo..." : "Inserir"}
          </button>

          <button
            className={`btn btn-secondary`}
            onClick={() => setFormOpen(false)}
          >
            Fechar
          </button>
        </div>
      </form>
    </>
  );
};

export default AddOrderForm;
