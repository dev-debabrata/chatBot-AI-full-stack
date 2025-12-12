import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import Logo from "/logo.png";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";

const Navbar = ({ isAuthenticated }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Get logout function and loading state from hook
    const { logout, logoutLoading } = useAuth();

    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(e) {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Call the hook's logout function
        logout(undefined, {
            onSuccess: () => {
                navigate("/", { replace: true });
                setShowUserMenu(false);
            }
        });
    };

    return (
        <nav className="flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-200 relative">
            {/* Logo */}
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
                <div className="flex items-center gap-2 cursor-pointer">
                    <img src={Logo} alt="logo" className="w-10 h-10" />
                    <h1 className="font-semibold text-xl tracking-tight">DarkBot AI</h1>
                </div>
            </Link>

            {/* Right Buttons */}
            <div className="flex items-center gap-3">
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

                {isAuthenticated && (
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setShowUserMenu((prev) => !prev)}
                            className="flex items-center justify-center p-2 rounded-full bg-gray-100 text-[#282828] cursor-pointer hover:bg-gray-200 transition"
                            disabled={logoutLoading}
                        >
                            <UserRound size={20} />
                        </button>

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
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${logoutLoading ? "text-gray-400" : "text-red-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {logoutLoading ? "Logging out…" : "Logout"}
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


// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserRound } from "lucide-react";
// import { useQueryClient } from "@tanstack/react-query";
// import axiosInstance from "../../lib/axios";
// import Logo from "/logo.png";
// import Login from "../auth/Login";
// import SignUp from "../auth/SignUp";





// const Navbar = ({ isAuthenticated }) => {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showSignUp, setShowSignUp] = useState(false);
//     const [showUserMenu, setShowUserMenu] = useState(false);
//     const [logoutLoading, setLogoutLoading] = useState(false);

//     const userMenuRef = useRef(null);
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//                 setShowUserMenu(false);
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleLogout = async () => {
//         if (logoutLoading) return;
//         setLogoutLoading(true);

//         try {
//             await axiosInstance.post("/auth/logout/");

//             queryClient.setQueryData(["authUser"], null);
//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//             navigate("/", { replace: true });
//         } catch (err) {
//             console.warn("Logout failed", err?.response?.data || err);
//             queryClient.setQueryData(["authUser"], null);
//             queryClient.invalidateQueries({ queryKey: ["authUser"] });
//             navigate("/", { replace: true });
//         } finally {
//             setLogoutLoading(false);
//         }
//     };

//     return (
//         <nav className="flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-200 relative">
//             {/* Logo */}
//             <Link to={isAuthenticated ? "/dashboard" : "/"}>
//                 <div className="flex items-center gap-2 cursor-pointer">
//                     <img src={Logo} alt="logo" className="w-10 h-10" />
//                     <h1 className="font-semibold text-xl tracking-tight">DarkBot AI</h1>
//                 </div>
//             </Link>

//             {/* Right Buttons */}
//             <div className="flex items-center gap-3">
//                 {!isAuthenticated && (
//                     <>
//                         <button
//                             onClick={() => {
//                                 setShowLogin(true);
//                                 setShowSignUp(false);
//                             }}
//                             className="px-4 py-1.5 rounded-full border border-black text-sm font-medium cursor-pointer"
//                         >
//                             Log in
//                         </button>

//                         <button
//                             onClick={() => {
//                                 setShowSignUp(true);
//                                 setShowLogin(false);
//                             }}
//                             className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium cursor-pointer"
//                         >
//                             Sign up for free
//                         </button>
//                     </>
//                 )}

//                 {isAuthenticated && (
//                     <div className="relative" ref={userMenuRef}>
//                         <button
//                             onClick={() => setShowUserMenu((prev) => !prev)}
//                             className="flex items-center justify-center p-2 rounded-full bg-gray-100 text-[#282828] cursor-pointer hover:bg-gray-200 transition"
//                             disabled={logoutLoading}
//                         >
//                             <UserRound size={20} />
//                         </button>

//                         {showUserMenu && (
//                             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
//                                 <Link
//                                     to="/profile"
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     onClick={() => setShowUserMenu(false)}
//                                 >
//                                     Profile
//                                 </Link>

//                                 <button
//                                     onClick={() => {
//                                         setShowUserMenu(false);
//                                         handleLogout();
//                                     }}
//                                     disabled={logoutLoading}
//                                     className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${logoutLoading ? "text-gray-400" : "text-red-600 hover:bg-gray-100"
//                                         }`}
//                                 >
//                                     {logoutLoading ? "Logging out…" : "Logout"}
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Auth Modals */}
//             {showLogin && (
//                 <Login
//                     onClose={() => setShowLogin(false)}
//                     openSignUp={() => {
//                         setShowSignUp(true);
//                         setShowLogin(false);
//                     }}
//                 />
//             )}

//             {showSignUp && (
//                 <SignUp
//                     onClose={() => setShowSignUp(false)}
//                     openLogin={() => {
//                         setShowLogin(true);
//                         setShowSignUp(false);
//                     }}
//                 />
//             )}
//         </nav>
//     );
// };

// export default Navbar;



// // import { X } from "lucide-react";
// // import React, { useState, useEffect, useRef } from "react";
// // import { Link } from "react-router-dom";
// // import Logo from "/logo.png";
// // import Login from "../auth/Login";
// // import SignUp from "../auth/SignUp";
// // import { UserRound } from "lucide-react";

// // const Navbar = ({ isAuthenticated, onLogout, logoutLoading }) => {
// //     const [showLogin, setShowLogin] = useState(false);
// //     const [showSignUp, setShowSignUp] = useState(false);
// //     const [showUserMenu, setShowUserMenu] = useState(false);

// //     const userMenuRef = useRef(null);

// //     useEffect(() => {
// //         function handleClickOutside(e) {
// //             if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
// //                 setShowUserMenu(false);
// //             }
// //         }
// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     }, []);

// //     return (
// //         <nav className="flex items-center justify-between px-4 md:px-10 py-3 border-b border-gray-200 relative">

// //             {/* Logo */}
// //             <Link to={isAuthenticated ? "/dashboard" : "/"}>
// //                 <div className="flex items-center gap-2 cursor-pointer">
// //                     <img src={Logo} alt="" className="w-10 h-10" />
// //                     <h1 className="font-semibold text-xl tracking-tight">DarkBot AI</h1>
// //                 </div>
// //             </Link>

// //             {/* Right Buttons */}
// //             <div className="flex items-center gap-3">

// //                 {/* Login + SignUp when NOT authenticated */}
// //                 {!isAuthenticated && (
// //                     <>
// //                         <button
// //                             onClick={() => {
// //                                 setShowLogin(true);
// //                                 setShowSignUp(false);
// //                             }}
// //                             className="px-4 py-1.5 rounded-full border border-black text-sm font-medium cursor-pointer"
// //                         >
// //                             Log in
// //                         </button>

// //                         <button
// //                             onClick={() => {
// //                                 setShowSignUp(true);
// //                                 setShowLogin(false);
// //                             }}
// //                             className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium cursor-pointer"
// //                         >
// //                             Sign up for free
// //                         </button>
// //                     </>
// //                 )}

// //                 {/* Avatar menu when authenticated */}
// //                 {isAuthenticated && (
// //                     <div className="relative" ref={userMenuRef}>
// //                         <button
// //                             onClick={() => setShowUserMenu((prev) => !prev)}
// //                             className="flex items-center justify-center p-2 rounded-full bg-gray-100 text-[#282828] cursor-pointer hover:bg-gray-200 transition"
// //                             disabled={logoutLoading}
// //                         >
// //                             <UserRound size={20} />
// //                         </button>

// //                         {showUserMenu && (
// //                             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
// //                                 <Link
// //                                     to="/profile"
// //                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //                                     onClick={() => setShowUserMenu(false)}
// //                                 >
// //                                     Profile
// //                                 </Link>

// //                                 <button
// //                                     onClick={() => {
// //                                         setShowUserMenu(false);
// //                                         onLogout();
// //                                     }}
// //                                     disabled={logoutLoading}
// //                                     className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${logoutLoading ? "text-gray-400" : "text-red-600 hover:bg-gray-100"
// //                                         }`}
// //                                 >
// //                                     {logoutLoading ? "Logging out…" : "Logout"}
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Auth Modals */}
// //             {showLogin && (
// //                 <Login
// //                     onClose={() => setShowLogin(false)}
// //                     openSignUp={() => {
// //                         setShowSignUp(true);
// //                         setShowLogin(false);
// //                     }}
// //                 />
// //             )}

// //             {showSignUp && (
// //                 <SignUp
// //                     onClose={() => setShowSignUp(false)}
// //                     openLogin={() => {
// //                         setShowLogin(true);
// //                         setShowSignUp(false);
// //                     }}
// //                 />
// //             )}
// //         </nav>
// //     );
// // };

// // export default Navbar;

