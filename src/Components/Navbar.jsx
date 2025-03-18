import React from "react";
import Logo from "../assets/MindLogo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="py-4 z-50 bg-blue-300 bg-opacity-80 shadow-md backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Mind Logo" className="h-12 w-auto" />
            <p className="text-amber-100 font-bold font-serif text-lg">MindWell</p>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex gap-10 items-center font-lato text-amber-100">
              <li>
                <Link to="/" className="hover:text-fuchsia-400 transition font-bold">Home</Link>
              </li>
              <li>
                <Link to="/self-assessment" className="hover:text-fuchsia-400 transition font-bold">Self Assessment</Link>
              </li>
              <li>
              <Link to="/book-appointment" className="hover:text-fuchsia-400 transition font-bold">
  Book Appointment</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-fuchsia-400 transition font-bold">Resources</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-fuchsia-400 transition font-bold">Mood Enhancer</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-fuchsia-400 transition font-bold">Feedback/Review</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
