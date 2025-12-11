import React from "react";
import Search from "../components/Search";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { Link } from "react-router-dom";
import Logo from "/logo.png"
import Navbar from "../components/layout/Navbar";

const HomePage = () => {
    // const [showLogin, setShowLogin] = useState(false);
    // const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <Navbar />

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
                    What can I help with?
                </h1>

                {/* Chat/Search box */}
                {/* <Search /> */}

                {/* Footer text like ChatGPT */}
                <p className="mt-10 text-[11px] md:text-xs text-gray-500 text-center max-w-2xl">
                    By messaging ChatBot, an AI assistant, you agree to our Terms and have
                    read our Privacy Policy.
                </p>
            </main>

        </div>
    );
};

export default HomePage;
