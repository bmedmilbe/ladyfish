import React, { type FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { type UserLogin } from "../services/authServices";

const LoginForm = () => {
  const [formData, setFormData] = useState<UserLogin>({
    phone: undefined,
    password: undefined,
  });

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const userLogin = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    userLogin.mutate(formData);
    // console.log(userLogin.isSuccess);

    // Send data to server (e.g., using fetch)
    // console.log(data);
  };
  return (
    <>
      <h1 className="fs-4 text-center">Entrar no sistema</h1>
      {userLogin.error && (
        <div className="alert alert-danger">{userLogin.error.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
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
          </div>
          <div className="col-sm-12 d-flex justify-content-center">
            <button
              className="btn btn-primary my-3"
              disabled={userLogin.isLoading}
            >
              {userLogin.isLoading ? "Entrando..." : "Entrar no sistema"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
