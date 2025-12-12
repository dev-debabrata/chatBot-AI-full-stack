import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const Login = ({ onClose, openSignUp }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: loginMutation, isPending } = useMutation({
        mutationFn: async () => {

            const res = await axiosInstance.post("/auth/login/", {
                username: email,
                password,
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Logged in successfully!");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            onClose?.();
            navigate("/dashboard");
        },
        onError: (err) => {
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.detail ||
                "Invalid email or password";
            toast.error(msg);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl animate-fadeIn pointer-events-auto">
                {/* Close Button */}
                <div className="flex justify-end pt-3 pr-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 pb-6">
                    <h2 className="text-xl font-semibold text-center mb-4">Log in</h2>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-black outline-none"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-900 cursor-pointer disabled:opacity-50"
                        >
                            {isPending ? "Logging in..." : "Log in"}
                        </button>
                    </form>

                    {/* Switch to Sign Up */}
                    <div className="flex mt-3 items-center justify-center gap-1 text-sm">
                        <p>Don't have an account?</p>
                        <button
                            onClick={() => {
                                onClose?.();
                                openSignUp?.();
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


