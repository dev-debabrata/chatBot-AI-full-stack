import React from "react";
import { Routes, Route } from "react-router-dom";

import Community from "./pages/CommunityPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ProBotPage from "./pages/ProBotPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <div className="min-h-screen">

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/community" element={<Community />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/probot" element={<ProBotPage />} />
            </Routes>
          </Layout>
        } />

      </Routes>
    </div>
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