import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddOrderItemForm from "../components/forms/AddOrderItemForm";
import AddPaymentForm from "../components/forms/AddPaymentForm";
import DeleteOrderForm from "../components/forms/DeleteOrderForm";
import ItemsInOrder from "../components/ItemsInOrder";
import Spinner from "../components/Spinner";
import useOrder from "../hooks/useOrder";
import type { Order } from "../hooks/useOrderBySuppliers";
import { day, month, year } from "../services/dates";
import ImagesDisplay from "../components/ImagesDisplay";

const OrderPage = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { id, order_id } = useParams<{ id: string; order_id: string }>(); // Destructure id directly with a type
  const navigate = useNavigate();
  const [addItemFormOpen, setAddItemFormOpen] = useState<boolean>();
  const [addPaymentOpen, setAddPaymentOpen] = useState<boolean>();
  const [deleleFormOpen, setDeleleFormOpen] = useState<boolean>();

  // Parse the ID and handle cases where it's not a number
  const supplierId = id ? parseInt(id, 10) : null;
  const orderId = order_id ? parseInt(order_id, 10) : null;

  // Use a redirect if the ID is invalid
  if (
    supplierId === null ||
    isNaN(supplierId) ||
    orderId === null ||
    isNaN(orderId)
  ) {
    navigate("/");
    return null; // Don't render the component
  }

  // Use the parsed ID directly
  const { data: order, isLoading } = useOrder<Order>(supplierId, orderId);
  // const { data: supplier, isLoading } = useOrder<Order>(supplierId,orderId);

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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb m-2">
          <li className="breadcrumb-item">
            <span onClick={() => navigate("/")}>Fornecedores</span>
          </li>
          <li className="breadcrumb-item">
            <span onClick={() => navigate("/suppliers/" + order?.supplier.id)}>
              {order?.supplier.name}
            </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {day(order?.created_at || "")}-{month(order?.created_at || "")}-
            {year(order?.created_at || "")}
          </li>
        </ol>
      </nav>

      <div className="border border-danger rounded p-2 m-2 d-flex justify-content-between">
        <span>
          Pedido: <span className="fw-bold">£{order?.total_price}</span>
        </span>
        <span>
          Pago: <span className="fw-bold">£{order?.value_paid || 0}</span>
        </span>
        <span>
          Em Dívida:{" "}
          <span className="fw-bold">
            £{(order?.total_price || 0) - (order?.value_paid || 0)}
          </span>
        </span>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className={`btn btn-primary`}
          onClick={() => {
            setDeleleFormOpen(false);
            setAddPaymentOpen(false);
            setAddItemFormOpen(!addItemFormOpen);
          }}
        >
          Adicionar Item
        </button>
        <button
          className={`btn btn-success`}
          onClick={() => {
            setDeleleFormOpen(false);
            setAddItemFormOpen(false);
            setAddPaymentOpen(!addPaymentOpen);
          }}
        >
          Pagamento
        </button>
        <button
          className={`btn btn-danger`}
          onClick={() => {
            setAddItemFormOpen(false);
            setAddPaymentOpen(false);
            setDeleleFormOpen(!deleleFormOpen);
          }}
        >
          Eliminar {day(order?.created_at || "")}-
          {month(order?.created_at || "")}-{year(order?.created_at || "")}
        </button>
      </div>
      <div>
        {addItemFormOpen && (
          <AddOrderItemForm setFormOpen={setAddItemFormOpen} order={order} />
        )}
        {addPaymentOpen && (
          <AddPaymentForm setFormOpen={setAddPaymentOpen} order={order} />
        )}
        {deleleFormOpen && (
          <DeleteOrderForm setFormOpen={setDeleleFormOpen} order={order} />
        )}
      </div>
      {(order?.orderitems.length || 0) > 0 && (
        <h1 className="text-center title-text">Itens Pedidos</h1>
      )}

      <div
        id="transactions"
        className="flex-grow-1 overflow-scroll overflow-x-hidden"
        ref={chatBoxRef}
      >
        <ItemsInOrder order={order} />
      </div>
      {(order?.orderpaymentproofs.length || 0) > 0 && (
        <div className="mx-auto m-2 container">
          <h2 className="text-center sub-titles">Comprovativos de Pagamento</h2>
          <div className="row">
            {order?.orderpaymentproofs.map((p) => (
              <ImagesDisplay
                endpoint="orderpaymentproof"
                id={p.id}
                order={order}
                image={p.payment_proof}
              />
            ))}
          </div>
        </div>
      )}
      {(order?.orderreceipts.length || 0) > 0 && (
        <div className="mx-auto m-2 container">
          <h2 className="text-center sub-titles">Faturas</h2>
          <div className="row">
            {order?.orderreceipts.map((p) => (
              <ImagesDisplay
                endpoint="orderrecepts"
                id={p.id}
                order={order}
                image={p.receipt}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
