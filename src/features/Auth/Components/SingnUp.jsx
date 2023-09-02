import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createUserAsync, selectError, selectLoggedInuser } from "../AuthSlice";
import { checkIfEmailExists } from "../AuthApi";
import { useState } from "react";

export function SingnUp() {
  const user = useSelector(selectLoggedInuser);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [emailExistsError, setEmailExistsError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const emailExists = await checkIfEmailExists(data.email);

    if (emailExists) {
      setEmailExistsError(true);
      return;
    } else {
      setEmailExistsError(false);
      dispatch(createUserAsync({ email: data.email, password: data.password, addresses: [] }));
    }
  };

  return (
    <>
      {/* {user && <Navigate to='/' replace={true}></Navigate>} */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {user?.email}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create A New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address <span className="text-red-500"> *</span>
              </label>
              <div className="mt-2">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Email Is Not Valid",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <span role="alert" className="text-red-400">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password <span className="text-red-500"> *</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: `
                    At least 8 characters in length.\n
                    Contains at least one uppercase letter or one lowercase letter.\n
                    Contains at least one digit (0-9).\n
                    Contains at least one special character from the set: @$!%*#?&\n
                    `,
                    },
                  })}
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <span role="alert" className="text-red-400">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password <span className="text-red-500"> *</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",

                    validate: (value, formValues) =>
                      value === formValues.password || "Password Don't Match",
                  })}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <span role="alert" className="text-red-400">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Singn Up
              </button>
              {emailExistsError && (
                <p className="text-red-500 mt-2">
                  Email already exists. Please use a different email
                </p>
              )}
              {error && (
                <p className="text-red-500 mt-2">{error.message} Thank You.</p>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
