import React from "react";
import {
    X,
    Settings,
    Bell,
    CircleQuestionMark,
    Globe,
    Shield,
    UserRound,
} from "lucide-react";


const settingsTabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "personalization", label: "Personalization", icon: CircleQuestionMark },
    { id: "language", label: "Language", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "account", label: "Account", icon: UserRound },
];

const SettingsModal = ({ open, onClose, activeTab, setActiveTab }) => {
    if (!open) return null;

    const renderSettingsContent = () => {
        switch (activeTab) {
            case "general":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">General</h2>
                        <div className="divide-y divide-gray-200">
                            <div className="flex items-center justify-between py-3">
                                <span>Appearance</span>
                                <button className="px-3 py-1 text-sm border rounded-full">System</button>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span>Accent color</span>
                                <button className="px-3 py-1 text-sm border rounded-full">Default</button>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span>Language</span>
                                <button className="px-3 py-1 text-sm border rounded-full">Auto-detect</button>
                            </div>
                        </div>
                    </>
                );
            case "notifications":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>Email notifications</span>
                                <Toggle />
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Desktop notifications</span>
                                <Toggle />
                            </div>
                        </div>
                    </>
                );
            case "personalization":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Personalization</h2>
                        <p className="text-gray-600 text-sm">
                            Add your personalization controls here (themes, preferences, etc.).
                        </p>
                    </>
                );
            case "language":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Language</h2>
                        <p className="text-gray-600 text-sm">Manage app language and region settings.</p>
                    </>
                );
            case "security":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Security</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span>Two-factor authentication</span>
                                <Toggle />
                            </div>
                            <p className="text-xs text-gray-500">Add more security options as needed.</p>
                        </div>
                    </>
                );
            case "account":
                return (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Account</h2>
                        <p className="text-gray-600 text-sm">Show user info, plan, delete account, etc.</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-2xl h-[450px] rounded-2xl shadow-2xl flex overflow-hidden relative p-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Left tabs */}
                <div className="w-60 border-r px-4 pt-6 pb-4 bg-gray-50">
                    <h3 className="text-xl font-semibold text-gray-500 mb-4">Settings</h3>
                    <div className="space-y-1">
                        {settingsTabs.map((tab) => {
                            const Icon = tab.icon;
                            const active = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer
                    ${active ? "bg-white shadow-md text-black" : "text-gray-700 hover:bg-gray-100"}`}
                                >
                                    {Icon && <Icon size={16} />}
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right content */}
                <div className="flex-1 px-6 pt-6 pb-6 overflow-y-auto">{renderSettingsContent()}</div>
            </div>
        </div>
    );
};

/* Simple fake toggle switch kept inside modal file for convenience.
   If you prefer, move Toggle into a shared components folder and import it. */
const Toggle = () => (
    <button className="w-10 h-5 rounded-full bg-gray-300 flex items-center px-1">
        <div className="w-4 h-4 rounded-full bg-white shadow" />
    </button>
);

export default SettingsModal;
