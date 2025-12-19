import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";

import ProtectedRoute from "./context/ProtectedRoute";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import UpgardeProPage from "./pages/UpgardeProPage";

const App = () => {

  const { authUser, authLoading } = useAuth();

  // Show placeholder while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading…</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          element={
            <ProtectedRoute authUser={authUser}>
              <Layout authUser={authUser} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upgradepro" element={<UpgardeProPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;



// import Reacts from "react";
// import { Routes, Route } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { Toaster } from "react-hot-toast";
// import axiosInstance from "./lib/axios";
// import ProtectedRoute from "./context/ProtectedRoute";
// import Layout from "./components/layout/Layout";

// import HomePage from "./pages/HomePage";
// import Dashboard from "./pages/DashboardPage";
// import ProfilePage from "./pages/ProfilePage";
// import UpgardeProPage from "./pages/UpgardeProPage";


// const App = () => {

//   const { data: authUser, isLoading: authLoading } = useQuery({
//     queryKey: ["authUser"],
//     queryFn: async () => {
//       try {
//         const res = await axiosInstance.get("/auth/me/");
//         return res.data;
//       } catch (err) {
//         return null;
//       }
//     },
//     retry: false,
//     refetchOnWindowFocus: false,
//     staleTime: 1000 * 60,
//   });

//   // show placeholder while auth is loading
//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div>Loading…</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster position="top-right" />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route
//           element={
//             <ProtectedRoute authUser={authUser}>
//               <Layout authUser={authUser} />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/upgradepro" element={<UpgardeProPage />} />
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;