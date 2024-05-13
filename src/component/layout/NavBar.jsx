import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <nav className="bg-gray-200 px-5 py-3 mt-5 fixed top-0 inset-x-0 z-10 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/home" className="text-xl font-bold text-gray-900">
                    HotelPerk
                </Link>

                <div className="flex items-center space-x-4">
                    <NavLink to="/browse-all-rooms" className="text-gray-600 hover:text-gray-900 transition duration-150">
                        Browse all rooms
                    </NavLink>

                    <NavLink to="/admin" className="text-gray-600 hover:text-gray-900 transition duration-150">
                        Admin
                    </NavLink>

                    <NavLink to="/find-booking" className="text-gray-600 hover:text-gray-900 transition duration-150">
                        Find my booking
                    </NavLink>

                    <div className="relative">
                        <button onClick={toggleAccountDropdown} className="text-gray-600 hover:text-gray-900 transition duration-150">
                            Account
                        </button>

                        {isAccountDropdownOpen && (
                            <ul className="absolute right-0 mt-2 py-1 w-48 bg-white border rounded shadow-xl">
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-sm text-red-700 hover:bg-red-400">
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
