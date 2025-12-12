import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ authUser }) => {

    return (
        <div className="flex h-screen">
            <Sidebar />

            <div className="flex flex-col w-full">
                <Navbar isAuthenticated={!!authUser} />
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

