import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import BottomFooter from "./components/BottomFooter";
// User Pages
import Home from "./pages/User/Home";
import UserPlans from "./pages/User/Plans";
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

function App() {
  return (
    <Router>
      <Container maxWidth="md" sx={{ pb: 7 }}>
        <Box sx={{ my: 4 }}>
          <Routes>
            {/* User Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/user/plans" element={<UserPlans />} />
            <Route path="/user/offers" element={<UserOffers />} />
            <Route path="/user/complaints" element={<UserComplaints />} />
            <Route path="/user/wallet" element={<Wallet />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/speedtest" element={<Speedtest />} />
            <Route path="/user/notifications" element={<Notification />} />

            {/* Admin Pages */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/plans" element={<AdminPlans />} />
            <Route path="/admin/offers" element={<AdminOffers />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
          </Routes>
        </Box>
      </Container>
      {/* Show BottomFooter only on user routes */}
      <BottomFooter />
    </Router>
  );
}

export default App;
