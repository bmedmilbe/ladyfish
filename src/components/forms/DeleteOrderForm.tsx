import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteOrder from "../../hooks/sharefund/useDeleteOrder";
import type { Order } from "../../hooks/useOrderBySuppliers";
import Spinner from "../Spinner";
import { supplierCopy } from "../../hooks/useGroupMembers";

interface Props {
  order: Order | undefined;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const DeleteOrderForm = ({ order, setFormOpen }: Props) => {
  const initialForm = {
    name: "",
    address: "",
    phone: "",
    email: "",
    nick_name: "",
    id: 0,
    balance: 0,
    order: "",
    supplier: supplierCopy,
    created_at: "",
    inserted_at: "",
    order_paid: false,
    payment_proof: "",
    receipt: "",
    order_number: "",
    value_paid: 0,
    total_price: 0,
    orderitems: [],
    orderpaymentproofs: [],
    orderreceipts: [],
  };

  const [error, setError] = useState<string>("");
  const nav = useNavigate();
  const supplier = order?.supplier.id;
  const [loading, setLoading] = useState<boolean>(false);

  const updateOrderPayment = useDeleteOrder(order);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    updateOrderPayment
      .mutateAsync({ ...initialForm })
      .then((res) => {
        console.log(res);
        nav(`/suppliers/${supplier}`);
        setLoading(false);
        setFormOpen(false);
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setError("Algo correu mal ao eliminar o pedido.");
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
        <h2 className="fs-4 text-center">Eliminar Pedido</h2>
        <p>Tem certeza que quer eliminar esse pedido?</p>

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

export default DeleteOrderForm;
