import { useEffect, useState } from "react";
import type { OrderItem } from "../hooks/useOrderBySuppliers";

interface Props {
  orderItem: OrderItem;
  handleDelete: (transaction?: OrderItem) => void;
}
const ItemValue = ({ orderItem: item, handleDelete }: Props) => {
  const [currentTransaction, setCurrentTransaction] = useState<OrderItem>();

  useEffect(() => {
    setCurrentTransaction(item);
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
        <span className={`text-success`}>
          £{formatNumberWithCommas(item.sub_total || 0)}
        </span>
      </span>
      <span className="badge text-dark" id={`hf${currentTransaction?.id}`}>
        Preço: £{formatNumberWithCommas(item.price)}/{item.measure} | Qtd:{" "}
        {formatNumberWithCommas(item.quantity)}
        {item.measure}
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

export default ItemValue;
