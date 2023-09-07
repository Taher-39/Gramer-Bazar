import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">Oops!</h1>
      <p className="text-red-400 my-2 text-lg">
        This trusted E-Commerce Website 
      </p>
      <p className="text-gray-600 italic">
        We sell authentic products which is like own first.  
      </p>
      <h2 className="font-medium text-indigo-600 hover:text-indigo-500 ml-2">
        <Link to="/">Go Home Page</Link>
      </h2>
    </div>
  );
};

export default AboutPage;
