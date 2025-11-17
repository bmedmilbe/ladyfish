import React, { useEffect } from "react";
import { day, month, year } from "../services/dates";
import useOrderBySuppliers, { type Order } from "../hooks/useOrderBySuppliers";
import OrderValue from "./OrderValue";
import type { Supplier } from "../hooks/useGroupMembers";
import { useNavigate } from "react-router-dom";
interface Props {
  supplier?: Supplier;
}
const OrdersBySuppliers = ({ supplier }: Props) => {
  const query_param = {
    is_charge: undefined,
    completed: undefined,
    friend: undefined,
    friend_paid: undefined,
    search: undefined,
  };
  const navigate = useNavigate();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useOrderBySuppliers(query_param, supplier?.id || 0);

  // const deleteTransaction = useDeleteOrder(supplier?.id || 0);

  const handleDelete = (order?: Order) => {
    if (!order) return;
    // console.log(transaction);
    if (confirm("Tem certeza que quer apagar?")) {
      // deleteTransaction.mutate(order);
    }
  };
  const orderBySupplier = data?.pages
    .slice()
    .reverse()
    .map(({ results }) => results.slice().reverse());

  const remainFromDatabase = supplier?.balance || 0;

  useEffect(() => {}, [remainFromDatabase]);

  return (
    <>
      {hasNextPage && (
        <button
          className="btn btn-warning w-100"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
        >
          {isFetchingNextPage ? "Carregando..." : "Ver mais antigos"}
        </button>
      )}

      <div>
        {orderBySupplier?.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((order) => (
              <div
                className="d-flex align-items-center  border m-1  rounded bg-light"
                style={{ width: "100%", cursor: "pointer" }}
                key={order.id}
                onClick={() =>
                  navigate(`/suppliers/${supplier?.id}/orders/${order.id}`)
                }
              >
                <div className="p-2 flex-grow-1 fw-bold fs-4">
                  {day(order.created_at)}-{month(order.created_at)}-
                  {year(order.created_at)}
                </div>
                <div
                  className="p-2 d-flex flex-column text-center"
                  style={{ width: "11rem" }}
                >
                  <OrderValue transaction={order} handleDelete={handleDelete} />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default OrdersBySuppliers;
