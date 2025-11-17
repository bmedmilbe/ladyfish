import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddOrderForm from "../components/forms/AddOrderForm";
import DeleteSupplierForm from "../components/forms/DeleteSupplierForm";
import OrdersBySuppliers from "../components/OrdersBySuppliers";
import Spinner from "../components/Spinner";
import type { Supplier } from "../hooks/useGroupMembers";
import useSupplier from "../hooks/useSupplier";

const SupplierPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>(); // Destructure id directly with a type
  const navigate = useNavigate();

  // Parse the ID and handle cases where it's not a number
  const staffId = id ? parseInt(id, 10) : null;

  // Use a redirect if the ID is invalid
  if (staffId === null || isNaN(staffId)) {
    navigate("/");
    return null; // Don't render the component
  }

  // Use the parsed ID directly
  const { data: supplier, isLoading } = useSupplier<Supplier>(staffId);
  const [addFormOrderOpen, setAddOrderOpen] = useState<boolean>();
  const [deleteSupplierOpen, setDeleteSupplierOpen] = useState<boolean>();

  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 1000);
  }, []);
  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="d-flex flex-column" style={{ height: "80vh" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb m-2">
            <li className="breadcrumb-item">
              <span onClick={() => navigate("/")}>Fornecedores</span>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              {supplier?.name}
            </li>
          </ol>
        </nav>

        <div className="m-2 d-flex justify-content-between">
          <button
            className={`btn btn-primary`}
            onClick={() => {
              setDeleteSupplierOpen(false);
              setAddOrderOpen(!addFormOrderOpen);
            }}
          >
            Adicionar Pedido
          </button>
          <button
            className={`btn btn-danger`}
            onClick={() => {
              setAddOrderOpen(false);
              setDeleteSupplierOpen(!deleteSupplierOpen);
            }}
          >
            Eliminar {supplier?.name}
          </button>
        </div>

        {addFormOrderOpen && (
          <div>
            <AddOrderForm setFormOpen={setAddOrderOpen} supplier={supplier} />
          </div>
        )}
        {deleteSupplierOpen && (
          <div>
            <DeleteSupplierForm
              setFormOpen={setDeleteSupplierOpen}
              supplier={supplier}
            />
          </div>
        )}

        <hr />
        <h1 className="title-text text-center">Pedidos</h1>

        <div
          id="transactions"
          className="flex-grow-1 overflow-scroll overflow-x-hidden"
          ref={chatBoxRef}
        >
          <OrdersBySuppliers supplier={supplier} />
        </div>
      </div>
    </>
  );
};

export default SupplierPage;
