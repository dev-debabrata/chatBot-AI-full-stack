// src/App.jsx
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance from "./lib/axios"; // adjust path if needed
import ProtectedRoute from "./context/ProtectedRoute";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Community from "./pages/CommunityPage";
import UpgardeProPage from "./pages/UpgardeProPage";


const App = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (err) {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;

  const handleLogout = async () => {
    try {

      await axiosInstance.post("/auth/logout");
    } catch (err) {

      console.warn("Logout request failed", err?.response?.data || err);
    } finally {
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/", { replace: true });
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        element={
          <ProtectedRoute authUser={authUser}>
            <Layout authUser={authUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/upgradepro" element={<UpgardeProPage />} />
      </Route>
    </Routes>
  );
};

export default App;



// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Community from "./pages/CommunityPage";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/DashboardPage";
// import ProfilePage from "./pages/ProfilePage";
// import ProBotPage from "./pages/ProBotPage";
// import Layout from "./components/layout/Layout";

// const App = () => {
//   return (
//     <div className="min-h-screen">

//       <Routes>
//         <Route path="/" element={<HomePage />} />

//         <Route path="/*" element={
//           <Layout>
//             <Routes>
//               <Route path="/community" element={<Community />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/profile" element={<ProfilePage />} />
//               <Route path="/probot" element={<ProBotPage />} />
//             </Routes>
//           </Layout>
//         } />

//       </Routes>
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Community from "./pages/CommunityPage";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/DashboardPage";
// import ProfilePage from "./pages/ProfilePage";
// import ProBotPage from "./pages/ProBotPage";
// import Layout from "./components/layout/Layout";

// const App = () => {
//   return (
//     <div className="min-h-screen">
//       <Routes>
//         {/* No layout on home */}
//         <Route path="/" element={<HomePage />} />

//         {/* All these routes share Layout */}
//         <Route element={<Layout />}>
//           <Route path="/community" element={<Community />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/probot" element={<ProBotPage />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import Community from "./pages/CommunityPage";
// import Dashboard from "./pages/DashboardPage";
// import ProfilePage from "./pages/ProfilePage";
// import ProBotPage from "./pages/ProBotPage";
// import Layout from "./components/layout/Layout";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoginSuccess = () => setIsAuthenticated(true);
//   const handleLogout = () => setIsAuthenticated(false);

//   return (
//     <Routes>
//       {/* Home has NO layout */}
//       <Route path="/" element={<HomePage onLoginSuccess={handleLoginSuccess} />} />

//       {/* Protected layout pages */}
//       <Route
//         element={
//           <Layout
//             isAuthenticated={isAuthenticated}
//             onLogout={handleLogout}
//           />
//         }
//       >
//         <Route path="/community" element={<Community />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/probot" element={<ProBotPage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Community from "./pages/CommunityPage";
// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/DashboardPage";
// import ProfilePage from "./pages/ProfilePage";
// import ProBotPage from "./pages/ProBotPage";
// import Layout from "./components/layout/Layout";


// const App = () => {
//   return (
//     <div className="min-h-screen">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//       </Routes>
//       <Layout>
//         <Routes>
//           <Route path="/community" element={<Community />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/probot" element={<ProBotPage />} />
//         </Routes>
//       </Layout>
//     </div>
//   );
// };

// export default App;



// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Community from './pages/CommunityPage'
// import ProBot from './pages/ProBotPage'
// import HomePage from './pages/HomePage'

// const App = () => {
//   return (
//     <>
//       <div className=''>
//         <div className=''>
//           {/* <Sidebar /> */}
//           <Routes>
//             <Route path='/' element={<HomePage />} />
//             <Route path='/pro' element={<ProBot />} />
//             <Route path='/community' element={<Community />} />
//           </Routes>
//         </div>
//       </div>

//     </>
//   )
// }

// export default App