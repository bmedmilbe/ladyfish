import React, { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAddSupplier from "../../hooks/sharefund/useAddSupplier";
import Spinner from "../Spinner";

interface Props {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const AddSupplierForm = ({ setFormOpen }: Props) => {
  const initialForm = {
    name: "",
    address: "",
    phone: "",
    email: "",
    nick_name: "",
    id: 0,
    balance: 0,
  };

  const nav = useNavigate();
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value || null });
  };

  const addSupplier = useAddSupplier();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    addSupplier
      .mutateAsync({
        ...formData,
      })
      .then((res) => {
        console.log(res);
        nav(`/suppliers/${res.id}`);
        setLoading(false);

        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Algo correu mal ao adicionar o cliente.");
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
        <h2 className="fs-4 text-center">Novo Fornecedor</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={nextInput}
            placeholder="Ninga Fish Trade"
            autoComplete={undefined}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nick_name" className="form-label">
            Vulgo
          </label>
          <input
            type="text"
            className="form-control"
            id="nick_name"
            value={formData.nick_name}
            onChange={nextInput}
            placeholder="Ninga"
            autoComplete={undefined}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tel" className="form-label">
            Telefone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={formData.phone}
            onChange={nextInput}
            placeholder="0143257764"
            autoComplete={undefined}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={nextInput}
            placeholder="name@example.com"
            autoComplete={undefined}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={nextInput}
            placeholder="85 King Street, Great Yarmouth, NR30 1EP"
            autoComplete={undefined}
          />
        </div>
        {error && <div className="text-danger">{error}</div>}

        <div className="d-flex justify-content-between">
          <div className="p-2">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={() => setFormOpen(false)}
              className="btn btn-secondary"
              disabled={loading}
            >
              Fechar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSupplierForm;
