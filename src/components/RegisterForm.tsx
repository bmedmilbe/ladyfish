import React, { type FormEvent, useState } from "react";
import useAuthRegister from "../hooks/useAuthRegister";
import useCustomersCreate from "../hooks/useCustomersCreate";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    phone: "",
    re_phone: "",
    // password: "",
    first_name: "",
    last_name: "",
    username: "",
    pathner: 2,
  });
  const [error, setError] = useState<string>("");
  const [created, setCreated] = useState<string>("");

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const userRegister = useAuthRegister();
  const customerAdd = useCustomersCreate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    // console.log(formData);
    // return;
    setError("");
    setCreated("");
    if (formData.phone !== formData.re_phone) {
      setError("Número de telemóvel estão diferente");
      return;
    }

    userRegister
      .mutateAsync({
        ...formData,
        username: formData.phone,
      })
      .then(() => {
        setCreated("Registro efetuado com sucesso!");
      })
      .catch((err) => {
        if (
          err.response.data.phone[0] == "user with this phone already exists."
        ) {
          customerAdd
            .mutateAsync({ ...formData, phone: formData.phone })
            .then((res2) => console.log(res2))
            .catch((err) => {
              console.log(err);
            });
        }
      });

    // Send data to server (e.g., using fetch)
    // console.log(data);
  };
  return (
    <>
      <h1 className="fs-4 text-center">Registrar no sistema</h1>
      {userRegister.error && (
        <div className="alert alert-danger">
          Parece que já estás registrado.{" "}
          <a href="/login">Clique aqui para entrar</a>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {created && (
        <div className="alert alert-success">
          {created} <a href="/login">Clique aqui para entrar</a>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label text-center">
                Nome
              </label>
              <input
                className="form-control text-center"
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label text-center">
                Sobrenome
              </label>
              <input
                className="form-control text-center"
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-center">
                Telemóvel
              </label>
              <input
                className="form-control text-center"
                type="phone"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={nextInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label text-center">
                Repitição de Telemóvel
              </label>
              <input
                className="form-control text-center"
                type="phone"
                name="re_phone"
                id="re_phone"
                value={formData.re_phone}
                onChange={nextInput}
              />
            </div>
          </div>
          {/* <div className="col-sm-12 col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-center">
                PIN
              </label>
              <input
                className="form-control text-center"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={nextInput}
              />
            </div>
          </div> */}
          <div className="col-sm-12 d-flex justify-content-center">
            <button
              className="btn btn-primary my-3"
              disabled={userRegister.isLoading}
            >
              {userRegister.isLoading ? "Registando..." : "Criar conta"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
