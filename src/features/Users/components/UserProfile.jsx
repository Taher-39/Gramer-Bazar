import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserProfile = () => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [selectEditIndex, setSelectEditIndex] = useState(-1);
  const [addNewAddress, setAddNewAddress] = useState(false);
  const { register, reset, handleSubmit, setValue } = useForm();

  const editAddressHandler = (updateAddressData, index) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(index, 1, updateAddressData);
    dispatch(updateUserAsync(newUser));
    setSelectEditIndex(-1);
  };

  const handleEdit = (index) => {
    setSelectEditIndex(index);
    const address = userInfo.address[index];
    setValue("name", address.name);
    setValue("country", address.country);
    setValue("email", address.email);
    setValue("district", address.district);
    setValue("thana", address.thana);
    setValue("phone", address.phone);
    setValue("orderComments", address.orderComments);
  };
  const handleRemove = (item) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(item, 1);
    dispatch(updateUserAsync(newUser));
  };
  const addNewAddressHandler = (data) => {
    const newUser = { ...userInfo, address: [...userInfo?.address, data] };
    dispatch(updateUserAsync(newUser));
    setAddNewAddress(false);
  };
  return (
    <>
      <div className="mx-auto bg-white max-w-4xl md:w-4/5 sm:w-4/5 px-4 sm:px-6 lg:px-8">
        <div className="mt-8">
          <p className="text-2xl font-semi-bold tracking-tight text-gray-900 py-2">
            My Profile
          </p>
          {userInfo.role === 'admin' && <p className="text-xl font-semi-bold tracking-tight text-green-600 py-2">
            Role: {userInfo.role}
          </p>}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mt-5">
          <h1 className="my-2 text-2xl">Edit Address</h1>
          <button
            onClick={() => {
              setAddNewAddress(true);
              setSelectEditIndex(-1);
            }}
            className="mb-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add New Address
          </button>
          {addNewAddress ? (
            <form
              className="bg-slate-100 px-10 py-5 rounded"
              noValidate
              onSubmit={handleSubmit((data) => {
                addNewAddressHandler(data);
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name <span className="text-red-500"> *</span>
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
                          name="orderComments"
                          className="input-text "
                          id="orderComments"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                          rows="3"
                          cols="60"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={() => setAddNewAddress(false)}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          {userInfo?.address?.map((item, index) => (
            <div key={index}>
              {selectEditIndex === index ? (
                <form
                  className="bg-slate-100 px-10 py-5 rounded"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    editAddressHandler(data, index);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name <span className="text-red-500"> *</span>
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
                            Phone Number{" "}
                            <span className="text-red-500"> *</span>
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
                              name="orderComments"
                              className="input-text "
                              id="orderComments"
                              placeholder="Notes about your order, e.g. special notes for delivery."
                              rows="3"
                              cols="60"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={() => setSelectEditIndex(-1)}
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div
                key={index}
                className="flex justify-between gap-x-6 py-5 border-2 border-solid border-gray-200 px-5 mb-4"
              >
                <div className="flex min-w-0 gap-x-4 ">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {item.email}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {item.phone}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {item.country}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {item.district}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {item.thana}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {item.address}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={() => handleEdit(index)}
                    type="submit"
                    className="mb-2 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-2 py-1 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                  {/* <Modal item={index} onConfirm={handleRemove} /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
