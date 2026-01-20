
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Container, Box } from "@mui/material";
import BottomFooter from "./components/BottomFooter";
// User Pages

import Home from "./pages/User/Home";
import UserPlans from "./pages/User/Plans";
// import PlanDetails from "./pages/User/PlanDetails";
import UserOffers from "./pages/User/Offers";
import UserComplaints from "./pages/User/Complaints";
import Wallet from "./pages/User/Wallet";
// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminPlans from "./pages/Admin/Plans";
import AdminOffers from "./pages/Admin/Offers";
import AdminComplaints from "./pages/Admin/Complaints";
import Profile from "./pages/User/Profile";
import Speedtest from "./pages/User/Speedtest";
import Notification from "./pages/User/Notification";
import { AuthProvider } from "./context/AuthContext.jsx";

import Signin from "./Auth/Signin.jsx";
import Signup from "./Auth/Signup.jsx";


function AppRoutes() {
  const location = useLocation();
  const hideFooter = [
    "/signin",
    "/signup",
    "/admin/dashboard",
    "/admin/users",
    "/admin/plans",
    "/admin/offers",
    "/admin/complaints",
  ].some((path) => location.pathname.startsWith(path));


  // Check if current route is signin or signup
  const isAuthPage = ["/signin", "/signup"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {isAuthPage ? (
        // Render auth pages without Container/Box
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        // All other pages inside Container/Box
       <Container disableGutters>
  <Box sx={{ m: 0, p: 0 }}>
            <Routes>
              {/* Auth Pages */}
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />

              {/* User Pages (all protected) */}
              <Route path="/" element={<Home />} />
              <Route path="/user/plans" element={<UserPlans />} />
             {/* <Route path="/user/plans/:id" element={<PlanDetails />} /> */}
              <Route path="/user/offers" element={<UserOffers />} />
              <Route path="/user/complaints" element={<UserComplaints />} />
              <Route path="/user/wallet" element={<Wallet />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/speedtest" element={<Speedtest />} />
              <Route path="/user/notifications" element={<Notification />} />

              {/* Admin Pages (if you want to protect them too) */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/plans" element={<AdminPlans />} />
              <Route path="/admin/offers" element={<AdminOffers />} />
              <Route path="/admin/complaints" element={<AdminComplaints />} />
            </Routes>
          </Box>
        </Container>
      )}
      {!hideFooter && <BottomFooter />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
   
  );
}

export default App;
