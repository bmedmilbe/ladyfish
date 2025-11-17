import { useState } from "react";
import useDeleteImage from "../hooks/sharefund/useDeleteImage";
import type { Order } from "../hooks/useOrderBySuppliers";
interface Props {
  image: string;
  order: Order;
  endpoint: string;
  id: number;
}

const ImagesDisplay = ({ image, order, endpoint, id }: Props) => {
  const [error, setError] = useState("");
  const deleteImage = useDeleteImage(order, endpoint, id);
  const handleDelete = () => {
    deleteImage
      .mutateAsync(order)
      .then((res) => {
        console.log(res);
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);

        setError("Algo correu mal ao eliminar o pedido.");
      });
  };

  return (
    <div className="col-xl-4 col-md-6 col-sm-12 ">
      <div className="position-relative border border-1 m-1 p-2 rounded">
        <img
          src={image}
          className="img-fluid w-100"
          style={{ margin: "1rem auto" }}
          alt={order.created_at}
        />
        <div className="position-absolute bottom-0 start-50 translate-middle-x p-2">
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm("Tem certeza que deseja apagar a imagem?"))
                handleDelete();
            }}
          >
            Apagar
          </button>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesDisplay;
