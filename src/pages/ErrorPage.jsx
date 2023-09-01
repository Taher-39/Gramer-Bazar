import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Oops!</h1>
      <p className="text-red-400 my-2 text-lg">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-gray-600 italic">
        {error.statusText || error.message}
      </p>
    </div>
  );
}
