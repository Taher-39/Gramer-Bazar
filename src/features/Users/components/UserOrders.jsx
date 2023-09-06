import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserOrder,
  fetchUserOrdersAsync,
  selectUserInfo,
} from "../userSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {orders?.map((order, index) => (
        <div key={index}>
          <div className="mx-auto bg-white max-w-4xl md:w-4/5 sm:w-4/5 px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 py-8">
                Order #{index + 1}
              </h1>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 py-8">
                Status:{" "}
                <span
                  className={`${
                    order.status === "pending"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {order.status}
                </span>
              </h1>
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.cartItems.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <p>{item.title}</p>
                            </h3>
                            <p className="ml-4">৳ {item.price}</p>
                          </div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p className="mt-1 text-sm text-gray-500">
                              {item.brand}
                            </p>
                            <p className="text-sm font-medium text-gray-400 line-through">
                              ৳
                              {Math.round(
                                (item.price * 100) /
                                  (100 - item.discountPercentage)
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 item-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline pr-5  text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-5">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>৳ {order.totalCost}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Quantity</p>
                <p>{order.totalItems}</p>
              </div>
              <p className="my-3 text-sm text-gray-500">
                Payement Method:{" "}
                <span className="text-green-600">
                  {" "}
                  {order.selectPaymentMthd}
                </span>
              </p>
              <h1 className="my-2 font-semibold">BILLING & SHIPPING INFORMATION</h1>
              <div className="flex justify-between gap-x-6 py-5 border-2 border-solid border-gray-200 px-5 mb-4">
                <div className="flex min-w-0 gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress.email}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectAddress.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectAddress.country}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {order.selectAddress.district}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectAddress.thana}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectAddress.address}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectAddress.orderComments}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
