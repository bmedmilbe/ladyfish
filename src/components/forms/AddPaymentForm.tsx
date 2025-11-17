import React, { type FormEvent, useState } from "react";
import useUpdateOrderPayment from "../../hooks/sharefund/useUpdateOrderPayment";
import { supplierCopy } from "../../hooks/useGroupMembers";
import type { Order } from "../../hooks/useOrderBySuppliers";
import Spinner from "../Spinner";
import useoOrderPaymentProof from "../../hooks/useoOrderPaymentProof";
import useOrderReceipt from "../../hooks/useOrderReceipt";

interface Props {
  order: Order | undefined;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

const AddPaymentForm = ({ order, setFormOpen }: Props) => {
  const initialForm = {
    id: 0,
    supplier: order?.supplier,
    created_at: "",
    inserted_at: "",
    order_paid: false,
    payment_proof: "",
    receipt: "",
    order_number: "",
    value_paid: order?.value_paid || 0,
    total_price: 0,
    balance: 0,
    orderitems: [],
    orderpaymentproofs: [],
    orderreceipts: [],
    
  };
  const [formData, setFormData] = useState(initialForm);

  const [error, setError] = useState<string>("");
  const [updated, setUpdated] = useState<string>("");
  const [imageTop, setImageTop] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const nextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value || null });
  };

  const updateOrderPayment = useUpdateOrderPayment(order);
  const orderPaymentProof = useoOrderPaymentProof(order);
  const orderReceipt = useOrderReceipt(order);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    updateOrderPayment
      .mutateAsync({
        ...formData,
        supplier: formData.supplier ? formData.supplier : supplierCopy,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        // setFormOpen(false);
        setUpdated(`Pagamento atualizado para £${res.value_paid}.`);
        setError(""); // Clear any errors
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setUpdated("");

        setError("Algo correu mal ao Inserir o cliente.");
      });
  };

  if (loading) return <Spinner />;
  // Assuming this is within a functional React component

  // 1. Define the asynchronous handler function outside of the JSX
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    uploadTo: string
  ) => {
    // Check if a file was actually selected
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      console.warn("No file selected or files array is empty.");
      return; // Exit if no file is found
    }

    // 2. Prepare the FormData payload
    const formData = new FormData();
    // Ensure the key 'image' matches what your server expects
    formData.append(uploadTo, selectedFile, selectedFile.name);

    try {
      // 3. Call the asynchronous mutation function
      if (uploadTo == "payment_proof")
        await orderPaymentProof.mutateAsync(formData);
      if (uploadTo == "receipt") await orderReceipt.mutateAsync(formData);

      // Log success and optionally clear the input value
      setImageTop(`✅ File ${selectedFile.name} uploaded successfully!`);
      event.target.value = ""; // Clear input for re-uploading the same file
    } catch (error) {
      // 4. Handle errors from the mutation/API call
      setImageTop("❌ Image upload failed:");
      console.error("❌ Image upload failed:", error);
      // You might want to display an error message to the user here
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "30rem",
          margin: ".5rem auto",
          border: ".1rem solid rgba(0,0,0,.3)",
          borderRadius: "1rem",
        }}
        className="mb-1 p-1"
        encType="multipart/form-data"
      >
        <h2 className="fs-4 text-center">Inserir Pagamento</h2>

        <div className="mb-3">
          <label htmlFor="value_paid" className="form-label fw-bold">
            Valor Pago (£)
          </label>
          <input
            type="number"
            className="form-control"
            id="value_paid"
            value={formData.value_paid}
            onChange={nextInput}
            min={1}
            placeholder="1000"
            autoComplete={undefined}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Adicionar Comprovativo de Pagamento
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={(event) => handleImageUpload(event, "payment_proof")}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Adicionar Fatura
          </label>

          <input
            type="file"
            id="fileInput2"
            accept="image/*"
            onChange={(event) => handleImageUpload(event, "receipt")}
            className="form-control"
          />
        </div>

        {error && <div className="text-danger">{error}</div>}
        {updated && <div className="text-success">{updated}</div>}
        {imageTop && <div>{imageTop}</div>}

        <div className="d-flex justify-content-between">
          <div className="p-2">
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Inserindo..." : "Salvar"}
            </button>
          </div>
          <div className="p-2">
            <button
              className="btn btn-secondary"
              onClick={() => setFormOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddPaymentForm;
