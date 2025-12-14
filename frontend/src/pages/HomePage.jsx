import React from "react";
import Search from "../components/Search";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import { Link } from "react-router-dom";
import HomeLogo from "/home.png"
import Navbar from "../components/layout/Navbar";

const HomePage = () => {
    // const [showLogin, setShowLogin] = useState(false);
    // const [showSignUp, setShowSignUp] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <Navbar />


            <main className="flex-1 flex flex-col items-center justify-center px-4">

                <div className=" flex flex-col justify-center items-center gap-8">
                    <img src={HomeLogo} alt="" className=" w-[250px] h-[250px] rounded-full" />
                    <h1 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-10">
                        {/* What can I help with? */}
                        What can I help you with today?
                    </h1>
                </div>


                {/* <Search /> */}

                {/* Footer text like ChatGPT */}

            </main>
            <div className=" flex justify-center items-center mb-4">
                <p className="mt-10 text-sm text-gray-500 text-center max-w-2xl">
                    By messaging ChatBot, an AI assistant, you agree to our Terms and have
                    read our Privacy Policy.
                </p>
            </div>

        </div>
    );
};

export default HomePage;
