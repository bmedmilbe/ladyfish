import useDeleteOrderItem from "../hooks/useDeleteOrderItem";
import { type Order, type OrderItem } from "../hooks/useOrderBySuppliers";
import ItemValue from "./ItemValue";
interface Props {
  order?: Order;
}
const ItemsInOrder = ({ order: order }: Props) => {
  const deleteOrderItem = useDeleteOrderItem(order);

  const handleDelete = (orderItem?: OrderItem) => {
    if (!orderItem) return;
    // console.log(transaction);
    if (confirm("Tem certeza que quer apagar?")) {
      deleteOrderItem.mutate(orderItem);
    }
  };

  return (
    <>
      <div>
        {order?.orderitems?.map((item, k) => (
          <div
            className="d-flex align-items-center  border m-1  rounded bg-light"
            style={{ width: "100%" }}
            key={item.id}
            // onClick={() =>
            //   navigate(`/orders/${order?.id}/ordersitem/${item.id}`)
            // }
          >
            <div className="p-2 fs-4">{k + 1}.</div>
            <div className="p-2 flex-grow-1 fw-bold fs-4">
              {/* {transaction.member?.first_name}{" "} */}
              {item.product.name} ({item.product.nick_name})
            </div>
            <div
              className="p-2 d-flex flex-column text-center"
              style={{ width: "11rem" }}
            >
              <ItemValue orderItem={item} handleDelete={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ItemsInOrder;
