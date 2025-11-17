import { useState } from "react";
import AddSupplierForm from "../components/forms/AddSupplierForm";
import { Sender } from "../components/Sender";
import Spinner from "../components/Spinner";
import useSuppliers from "../hooks/useStaffList";

const SuppliersPage = () => {
  const { data: suppliers, isLoading } = useSuppliers({});
  const [formOpen, setFormOpen] = useState<boolean>();
  if (isLoading) return <Spinner />;
  // console.log(mangerStaffList?.pages?.length);
  return (
    <div>
      <h1 className="text-center title-text">Fornecedores</h1>

      {formOpen && <AddSupplierForm setFormOpen={setFormOpen} />}

      <div className="text-center">
        <button
          className={`btn ${formOpen ? "btn-danger" : "btn-primary"}`}
          onClick={() => setFormOpen(!formOpen)}
        >
          Adicionar Fornecedor
        </button>
        <hr />
        {suppliers?.pages.map((page, index) => (
          <div key={index} className="row justify-content-around">
            {page.results?.map((list, key) => (
              <div className="col-xl-3 col-md-3 col-sm-12 mt-1" key={key}>
                <Sender
                  link={"/suppliers/" + list.id}
                  name={<span>{`${list.name}`}</span>}
                  value={`£${list.balance}`}
                  // value={`23 £`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliersPage;
