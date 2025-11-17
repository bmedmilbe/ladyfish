import React from "react";
import { NavLink } from "react-router-dom";
interface Props {
  name: React.ReactNode;
  value: string;
  link: string;
}

export const Sender = ({ name, value, link }: Props) => {
  return (
    <NavLink
      to={link}
      style={{
        textDecoration: "none",
        color: "rgb(214, 51, 132)",
        boxSizing: "border-box",
        display: "block",
        border: ".1rem solid rgba(0,0,0,.3)",
        borderRadius: ".5rem",
      }}
    >
      <div className="d-flex flex-row p-1">
        <img src="/supplier.png" width={60} height={60} />
        <div className="text-center w-100">
          <h3 className="fs-6">{name}</h3>
          <span className="btn btn-warning fw-bold">{value}</span>
        </div>
      </div>
    </NavLink>
  );
};
