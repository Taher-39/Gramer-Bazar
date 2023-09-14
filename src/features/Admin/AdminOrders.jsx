import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrderStatusError,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../Order/orderSlice";
import { ITEM_PER_PAGE } from "../../app/constant";
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import Pagination from "../Common/Pagination";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const statusError = useSelector(selectOrderStatusError);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handlePage = (page) => {
    setPage(page);
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  };

  const handleShow = (e, order) => {
    console.log("show");
  };
  const handleEdit = (e, order) => {
    if (order && order.id) {
      setEditableOrderId(order.id);
    } else {
      console.error("Invalid order object:", order);
    }
  };
  const handleOrderStatus = (e, order) => {
    const updateOrderStatus = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrderStatus));
    setEditableOrderId(-1);
  };

  const changeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-200 text-blue-600";
      case "processing":
        return "bg-yellow-200 text-yellow-600";
      case "shipped":
        return "bg-purple-200 text-purple-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancel":
        return "bg-red-200 text-red-600";
      case "onHold":
        return "bg-gray-200 text-gray-600";
      case "backOrder":
        return "bg-black-200 text-black-600";

      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <>
      {statusError && <p className="text-red-400">{statusError.message}</p>}
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-left">
                      User
                    </th>
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-left">
                      Total Items
                    </th>
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-left">
                      Total Cost
                    </th>
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-center">
                      Shipping Address
                    </th>
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-center">
                      Status
                    </th>
                    <th className="py-3 lg:px-6 md:px-4 sm:px-2 text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">
                            {order.id}) {order.user.name}
                          </span>
                        </div>
                      </td>
                      {order.cartItems.map((item, index) => (
                        <td key={index} className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} #{item.quantity} ${item.price}
                            </span>
                          </div>
                        </td>
                      ))}
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          $ {order.totalCost}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div>
                          <strong>{order.selectAddress.district}</strong>
                        </div>
                        <div>{order.selectAddress.thana}</div>
                        <div>{order.selectAddress.address}</div>
                        <div>{order.selectAddress.phone}</div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => handleOrderStatus(e, order)}
                            className="rounded-lg"
                          >
                            <option value="">--Select Status--</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancel">Cancel</option>
                            <option value="onHold">On Hold</option>
                            <option value="backOrder">Backorder</option>
                          </select>
                        ) : (
                          <span
                            className={`${changeColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <XMarkIcon
                              onClick={(e) => handleShow(e, order)}
                              className="w-6 h-6"
                            ></XMarkIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilSquareIcon
                              onClick={(e) => handleEdit(e, order)}
                              className="w-6 h-6"
                            ></PencilSquareIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </>
  );
};

export default AdminOrders;
