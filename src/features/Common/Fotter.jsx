import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneSquare,
} from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 mx-10">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p>We sell authentic products which is like own first.</p>
            <div className="pt-3 ">
              <span className="text-yellow-300 hover:text-white transition duration-300 mr-2">
                <FaPhoneSquare className="inline" />
              </span>
              0124578996
            </div>
            <p className="my-2"><HiOutlineMailOpen color="yellow" className="inline" /> help@gramer.bazer</p>
          </div>
          <div className="col-span-1 mx-10">
            <h2 className="text-xl font-semibold mb-4">Customer Service</h2>
            <ul>
              <li>FAQs</li>
              <li>Contact Us</li>
              <li>Shipping Information</li>
              {/* Add more links here */}
            </ul>
          </div>
          <div className="col-span-1 mx-10">
            <h2 className="text-xl font-semibold mb-4">Shop</h2>
            <ul>
              <li>Products</li>
              <li>Categories</li>
              <li>Special Offers</li>
              {/* Add more links here */}
            </ul>
          </div>
          <div className="col-span-1 mx-10">
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <p>Stay updated on our latest news and offers.</p>
            <div className="flex space-x-4 py-3">
              <Link
                to="/"
                className="text-yellow-300 hover:text-white transition duration-300"
              >
                <FaFacebook />
              </Link>
              <Link
                to="/"
                className="text-yellow-300 hover:text-white transition duration-300"
              >
                <FaTwitter />
              </Link>
              <Link
                to="/"
                className="text-yellow-300 hover:text-white transition duration-300"
              >
                <FaInstagram />
              </Link>
              <Link
                to="/"
                className="text-yellow-300 hover:text-white transition duration-300"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
