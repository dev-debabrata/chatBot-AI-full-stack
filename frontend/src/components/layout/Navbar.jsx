import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/logo.png';
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import { UserRound } from 'lucide-react';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const userMenuRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(e) {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <nav className="flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-200 relative">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link to={isAuthenticated ? "/dashboard" : "/"}>
                    <div className="flex justify-center items-center cursor-pointer">
                        <img src={Logo} alt="" className="w-10 h-10" />
                        <h1 className="font-semibold text-xl tracking-tight">DarkBot AI</h1>
                    </div>
                </Link>
            </div>


            {/* Right Buttons */}
            <div className="flex items-center gap-3">

                {/* Show Login + Signup only if NOT authenticated */}
                {!isAuthenticated && (
                    <>
                        <button
                            onClick={() => {
                                setShowLogin(true);
                                setShowSignUp(false);
                            }}
                            className="px-4 py-1.5 rounded-full border border-black text-sm font-medium cursor-pointer"
                        >
                            Log in
                        </button>

                        <button
                            onClick={() => {
                                setShowSignUp(true);
                                setShowLogin(false);
                            }}
                            className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium cursor-pointer"
                        >
                            Sign up for free
                        </button>
                    </>
                )}

                {/* Avatar + Dropdown when authenticated */}
                {isAuthenticated && (
                    <div
                        className="relative"
                        ref={userMenuRef}
                    >
                        {/* Avatar button */}
                        <button
                            onClick={() => setShowUserMenu(prev => !prev)}
                            className="flex items-center justify-center p-2 rounded-full bg-gray-100 text-[#282828] cursor-pointer hover:bg-gray-200 transition-colors"
                        >
                            <UserRound size={20} />
                        </button>

                        {/* Dropdown menu */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={() => {
                                        setShowUserMenu(false);
                                        onLogout();
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Auth Modals */}
            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                    openSignUp={() => {
                        setShowSignUp(true);
                        setShowLogin(false);
                    }}
                />
            )}

            {showSignUp && (
                <SignUp
                    onClose={() => setShowSignUp(false)}
                    openLogin={() => {
                        setShowLogin(true);
                        setShowSignUp(false);
                    }}
                />
            )}
        </nav>
    );
};

export default Navbar;
