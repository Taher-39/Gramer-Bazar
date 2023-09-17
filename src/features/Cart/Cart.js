import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  RemoveCartItemAsync,
  UpdateCartAsync,
  selectCartError,
  selectCartItems,
} from "./CartSlice";
import Modal from "../Common/Modal";

export function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartRemoveError = useSelector(selectCartError);

  const totalCost = cartItems.reduce(
    (amount, item) => item.quantity * item.price + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleQuantity = (e, item) => {
    e.preventDefault();
    dispatch(UpdateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleConfirmDelete = (item) => {
    dispatch(RemoveCartItemAsync(item.id))
      .unwrap()
      .then((result) => {
        if (RemoveCartItemAsync.fulfilled.match(result)) {
          // Item was successfully removed
          console.log(`Item with ID ${result.payload.id} removed.`);
        } else {
          // Handle the case where removal failed
          console.error("Failed to remove item.");
        }
      });
  };

  return (
    <>
      {!cartItems.length && <Navigate to="/" replace={true}></Navigate>}

      <div className="mx-auto bg-white max-w-4xl md:w-4/5 sm:w-4/5 px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 py-8">
            Cart
          </h1>
          {cartRemoveError && (
            <p className="text-red-400">{cartRemoveError.message}</p>
          )}
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartItems.map((item) => (
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
                            (item.price * 100) / (100 - item.discountPercentage)
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
                          item={item}
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
            <Link
              to="/checkout"
              className="flex item-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
}
