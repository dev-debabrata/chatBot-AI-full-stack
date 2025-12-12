import {
    Menu,
    Crown,
    MessageSquare,
    SquarePen,
    Search,
    Images,
    Settings,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SettingsModal from "../SettingsModal";



const Sidebar = () => {
    const [extended, setExtended] = useState(true);
    const [openSettingsModal, setOpenSettingsModal] = useState(false);
    const [activeSettingsTab, setActiveSettingsTab] = useState("general");

    return (
        <>
            {/* SIDEBAR */}
            <div
                className={`flex flex-col justify-between min-h-screen bg-gray-100 py-4 pb-6 transition-all duration-300 
                ${extended ? "w-80 px-4" : "w-15 px-2"}`}
            >
                <div className="flex flex-col">
                    <div
                        onClick={() => setExtended((prev) => !prev)}
                        className="inline-flex items-center justify-center w-fit p-3 rounded-full cursor-pointer hover:bg-gray-200"
                    >
                        <Menu size={18} />
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 p-3 bg-[#e6eaf1] rounded-full text-sm text-gray-500 cursor-pointer hover:bg-gray-200 mb-1">
                        <SquarePen size={18} />
                        {extended ? <p>New Chat</p> : null}
                    </div>
                    <div className="inline-flex items-center gap-2 p-3 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                        <Search size={18} />
                        {extended ? <p>Search Chats</p> : null}
                    </div>
                    <div className="inline-flex items-center gap-2 p-3 rounded-full text-sm cursor-pointer hover:bg-gray-200">
                        <Images size={18} />
                        {extended ? <p>Library</p> : null}
                    </div>

                    {extended ? (
                        <div className="flex flex-col mt-6">
                            <p className="mt-8 mb-2 text-gray-500">Recent Chats</p>
                            <div className="flex items-center gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-gray-200">
                                <MessageSquare size={18} />
                                <p>What is React ...</p>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="flex flex-col">
                    <Link
                        to="/upgradepro"
                        className="flex items-center gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]"
                    >
                        <Crown size={18} />
                        {extended ? <p>Upgarde Pro</p> : null}
                    </Link>

                    <button
                        onClick={() => setOpenSettingsModal(true)}
                        className="flex items-center gap-2 p-3 rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]"
                    >
                        <Settings size={18} />
                        {extended ? <p>Settings</p> : null}
                    </button>
                </div>
            </div>

            {/* Settings modal (controlled) */}
            <SettingsModal
                open={openSettingsModal}
                onClose={() => setOpenSettingsModal(false)}
                activeTab={activeSettingsTab}
                setActiveTab={setActiveSettingsTab}
            />
        </>
    );
};

export default Sidebar;
