import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import {
  RemoveCartItemAsync,
  UpdateCartAsync,
  selectCartItems,
} from "../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/Auth/AuthSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/Order/orderSlice";
import { selectUserInfo } from "../features/Users/userSlice";
import Modal from "../features/Common/Modal";
import { useAlert } from "react-alert";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectAddress, setSelectAddress] = useState(null);
  const [selectPaymentMthd, setSelectPaymentMthd] = useState("mobileBanking");
  const cartItems = useSelector(selectCartItems);
  const alert = useAlert();

  const totalCost = cartItems.reduce(
    (amount, item) => item.quantity * item.product.price + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const { register, reset, handleSubmit } = useForm();

  const handleQuantity = (e, item) => {
    e.preventDefault();
    dispatch(UpdateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleConfirmDelete = (item) => {
    dispatch(RemoveCartItemAsync(item.id));
  };

  const onSubmit = (data) => {
    dispatch(
      updateUserAsync({ ...user, address: [...user.addresses, data] })
    );
    reset();
  };

  const handleAddress = (e) => {
    setSelectAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    setSelectPaymentMthd(e.target.value);
  };

  const handleOrder = () => {
    if (selectAddress && selectPaymentMthd) {
      dispatch(
        createOrderAsync({
          user,
          selectAddress,
          selectPaymentMthd,
          cartItems,
          totalCost,
          totalItems,
          status: "pending",
        })
      );
    } else {
      alert.error("Enter Address or Payment Method");
    }
    // TODO: redirect oredr success page, change stock, clear cart after order
  };
  console.log("user from CheckoutPage", user);
  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
          {/* Checkout Section */}
          <div className="lg:col-span-3 my-8 ">
            <form
              className="bg-slate-100 px-10 py-5 rounded"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    BILLING & SHIPPING
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Customer Name <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("name", {
                            required: "Name is required",
                          })}
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <select
                          {...register("country", {
                            required: "Country is required",
                          })}
                          id="country"
                          name="country"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Bangladesh</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                              message: "Email Is Not Valid",
                            },
                          })}
                          type="text"
                          name="email"
                          id="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label
                        htmlFor="district"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        District <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("district", {
                            required: "District is required",
                          })}
                          type="text"
                          name="district"
                          id="district"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3 sm:col-start-1">
                      <label
                        htmlFor="thana"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Thana <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("thana", {
                            required: "Thana is required",
                          })}
                          type="text"
                          name="thana"
                          id="thana"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                          type="number"
                          name="phone"
                          id="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Address <span className="text-red-500"> *</span>
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("address", {
                            required: "Address is required",
                          })}
                          type="text"
                          name="address"
                          id="address"
                          placeholder="House number and street name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-full">
                      <h2 className="text-2xl">Order Notes (optional)</h2>
                      <label
                        htmlFor="orderComments"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Order Notes (optional)
                      </label>
                      <div className="mt-2">
                        <textarea
                          {...register("orderComments", {
                            required: "Address is required",
                          })}
                          id="orderComments"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          class="w-full px-3 py-2 border rounded-lg rows-3 md:rows-4 cols-60 md:cols-40 sm:rows-3 sm:cols-15"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 mb-2">
                    Choose From Existing Adress
                  </p>

                  <ul>
                    {user?.addresses?.map((address, index) => (
                      <div key={index}>
                        <div className="flex justify-between gap-x-6 py-5 border-2 border-solid border-gray-200 px-5 mb-4">
                          <div className="flex min-w-0 gap-x-4 ">
                            <input
                              onClick={handleAddress}
                              value={index}
                              name="address"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.email}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {address.country}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                              {address.district}
                            </p>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {address.thana}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.phone}
                            </p>
                          </div>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.orderComments}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            value="cash"
                            checked={selectPaymentMthd === "cash"}
                            id="cash"
                            name="payment"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash On Delivary
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            value="card"
                            checked={selectPaymentMthd === "card"}
                            id="card"
                            name="payment"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            value="mobileBanking"
                            checked={selectPaymentMthd === "mobileBanking"}
                            id="mobileBanking"
                            name="payment"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="mobileBanking"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Mobile Banking
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* Cart Section */}
          <div className="lg:col-span-3 ">
            <div className="mx-auto bg-slate-100 max-w-4xl md:w-4/5 sm:w-4/5 px-4 sm:px-6 lg:px-4 rounded">
              <div className="mt-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 py-8">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <p>{item.product.titile}</p>
                              </h3>
                              <p className="ml-4">৳ {item.product.price}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                              <p className="text-sm font-medium text-gray-400 line-through">
                                ৳
                                {Math.round(
                                  (item.product.price * 100) /
                                    (100 - item.product.discountPercentage)
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline pr-5  text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>

                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                                name="quantity"
                                id="qnty"
                                className="rounded-lg"
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <Modal
                                item={item.product}
                                onConfirm={handleConfirmDelete}
                              />
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
                  <p>৳ {totalCost}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Quantity</p>
                  <p>{totalItems}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Pay Order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-2"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
