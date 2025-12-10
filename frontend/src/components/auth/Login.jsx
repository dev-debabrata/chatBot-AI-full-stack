import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, openSignUp }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn pointer-events-auto">

                <div className="flex justify-end pt-3 pr-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <h2 className="text-xl font-semibold text-center mb-4">Log in</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer"
                        >
                            Log in
                        </button>
                    </form>

                    {/* Switch to Sign Up */}
                    <div className="flex mt-3 items-center justify-center gap-1 text-sm">
                        <p>Don't have an account?</p>

                        <button
                            onClick={() => {
                                onClose();
                                openSignUp();
                            }}
                            className="text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



// import { X } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";

// const Login = ({ onClose, openSignUp }) => {
//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn pointer-events-auto">

//                 {/* X Close */}
//                 <div className="flex justify-end pt-3 pr-3">
//                     <button onClick={onClose} className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="px-6 pb-6">
//                     <h2 className="text-xl font-semibold text-center mb-4">Log in</h2>

//                     {/* Form */}
//                     <form className="space-y-4">
//                         {/* Email */}
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Email</label>
//                             <input type="email" placeholder="Enter your email"
//                                 className="px-3 py-2 rounded-md border" />
//                         </div>

//                         {/* Password */}
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Password</label>
//                             <input type="password" placeholder="Enter your password"
//                                 className="px-3 py-2 rounded-md border" />
//                         </div>

//                         <button className="w-full py-2 bg-black text-white rounded-md">
//                             Log in
//                         </button>
//                     </form>

//                     {/* Switch to Sign Up */}
//                     <div className="flex mt-3 items-center justify-center gap-1 text-sm">
//                         <p>Don't have an account?</p>

//                         <button
//                             onClick={() => {
//                                 onClose();
//                                 openSignUp();   // open signup modal
//                             }}
//                             className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
//                         >
//                             Sign Up
//                         </button>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Login;

// const Login = ({ onClose }) => {

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn pointer-events-auto">

//                 <div className="flex justify-end pt-3 pr-3">
//                     <button
//                         onClick={onClose}
//                         className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
//                         <X size={20} />
//                     </button>
//                 </div>
//                 <div className=" px-6 pb-6">
//                     <h2 className="text-xl font-semibold text-center mb-4">Log in</h2>

//                     <form className="space-y-4">
//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Email</label>
//                             <input
//                                 type="email"
//                                 className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
//                                 placeholder="Enter your email"
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label className="text-sm font-medium">Password</label>
//                             <input
//                                 type="password"
//                                 className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
//                                 placeholder="Enter your password"
//                             />
//                         </div>

//                         <button className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900">
//                             Log in
//                         </button>
//                     </form>

//                     {/* Working Link Version */}
//                     <div className="flex mt-3 items-center justify-center gap-1 text-sm">
//                         <p>Don't have an account?</p>
//                         <Link
//                             to="/signup"
//                             className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
//                         >
//                             Sign Up
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
