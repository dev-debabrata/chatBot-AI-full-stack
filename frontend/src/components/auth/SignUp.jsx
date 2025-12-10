import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onClose, openLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn">
                <div className="flex justify-end pt-3 pr-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="px-6 pb-6">
                    <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Switch to Login */}
                    <div className="flex mt-3 items-center justify-center gap-1 text-sm">
                        <p>Already have an account?</p>
                        <button
                            onClick={() => {
                                onClose();
                                openLogin();
                            }} className="text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;



// import { X } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";

// const SignUp = ({ onClose, openLogin }) => {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn">

//                 {/* X Close */}
//                 <div className="flex justify-end pt-3 pr-3">
//                     <button onClick={onClose} className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="px-6 pb-6">
//                     <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

//                     {/* Form */}
//                     <form className="space-y-4">
//                         {/* Name */}
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Name</label>
//                             <input type="text" placeholder="Enter your name" className="px-3 py-2 rounded-md border" />
//                         </div>

//                         {/* Email */}
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Email</label>
//                             <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-md border" />
//                         </div>

//                         {/* Password */}
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Password</label>
//                             <input type="password" placeholder="Create a password" className="px-3 py-2 rounded-md border" />
//                         </div>

//                         <button className="w-full py-2 bg-black text-white rounded-md">Sign Up</button>
//                     </form>

//                     {/* Switch to Login */}
//                     <div className="flex mt-3 items-center justify-center gap-1 text-sm">
//                         <p>Already have an account?</p>

//                         <button
//                             onClick={() => {
//                                 onClose();
//                                 openLogin();
//                             }}
//                             className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default SignUp;


// const SignUp = ({ onClose }) => {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn">
//                 <div className="flex justify-end pt-3 pr-3">
//                     <button
//                         onClick={onClose}
//                         className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>
//                 <div className=" px-6 pb-6">
//                     <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

//                     <form className="space-y-4">
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter your name"
//                                 className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Email</label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Password</label>
//                             <input
//                                 type="password"
//                                 placeholder="Create a password"
//                                 className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
//                             />
//                         </div>

//                         <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900">
//                             Sign Up
//                         </button>
//                     </form>
//                     <div className="flex mt-3 items-center justify-center gap-1 text-sm">
//                         <p>Already have an account?</p>
//                         <Link to="/login"
//                             className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
//                         >
//                             Login
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
