import { useEffect, useState } from "react";
import type { Order } from "../hooks/useOrderBySuppliers";

interface Props {
  transaction: Order;
  handleDelete: (transaction?: Order) => void;
}
const OrderValue = ({ transaction, handleDelete }: Props) => {
  const [currentTransaction, setCurrentTransaction] = useState<Order>();

  useEffect(() => {
    setCurrentTransaction(transaction);
  }, [currentTransaction]);
  const [buttonsOpen, setButtonsOpen] = useState(false);

  const formatNumberWithCommas = (number: number) => {
    if (typeof number !== "number") {
      return "Invalid input. Please provide a number.";
    }

    if (Math.abs(number) < 1000) {
      return number.toString(); // No commas needed for numbers less than 1000
    }

    return number.toLocaleString(); // Use toLocaleString() for easy comma formatting
  };

  return (
    <>
      <span
        className={`fw-bold fs-4`}
        style={{ cursor: "pointer" }}
        onClick={() => setButtonsOpen(!buttonsOpen)}
      >
        <span
          className={`btn btn-${
            (transaction.total_price || 0) - (transaction.value_paid || 0) > 0
              ? "danger"
              : "success"
          }`}
        >
          £
          {formatNumberWithCommas(
            (transaction.total_price || 0) - (transaction.value_paid || 0)
          )}{" "}
        </span>
      </span>
      <span className="badge text-success" id={`hf${currentTransaction?.id}`}>
        Total: £{formatNumberWithCommas(transaction.total_price)} | Pago: £
        {formatNumberWithCommas(transaction.value_paid || 0)}
      </span>
      {buttonsOpen && (
        <div className="d-flex justify-content-center border">
          <button
            onClick={() => handleDelete(currentTransaction)}
            className="m-1 btn btn-danger btn-sm"
          >
            Apagar
          </button>
        </div>
      )}
    </>
  );
};

export default OrderValue;
