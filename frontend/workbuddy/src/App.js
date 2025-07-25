// export default App;
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
// import SignUp from "./Components/SignUp";
import WorkerHome from "./Components/WorkerHomePage/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import { UserProvider } from "./context/UserContext";
import WorkerRequests from "./Components/WorkerComponents/WorkerRequests"; // ✅ FIXED PATH
import WorkerAuthPage from "./Components/SignUp/WorkerAuthPage";
import CustomerAuthPage from "./Components/SignUp/CustomerAuthPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgotPasswordPage from "./Components/SignUp/WorkerForgotPasswordPage";
import ForgotPasswordPageCust from "./Components/SignUp/CustomerForgotPasswordPage";
import WorkerProfileUpdate from "./Components/WorkerProfileUpdate"
import CustomerHome from "./Components/Customer/Home/Home"
import BrowseServicesPage from "./Components/Customer/Services/BrowseServicesPage";
import TrackRequestPage from "./Components/Customer/Services/TrackRequestPage";
import Unauthorized from "./Components/SignUp/Unauthorized";
import CustomerProfileUpdate from "./Components/CustomerProfileUpdate/index"
import WorkerChatPage from "./Components/ChatBox/Pages/WorkerChatPage";
import CustomerChatPage from "./Components/ChatBox/Pages/CustomerChatPage";
// import ChatRedirector from "./Components/ChatBox/ChatRedirector";
function App() {
  const [isDark, setIsDark] = useState(() => {
    // load from localStorage (optional)
    return localStorage.getItem('theme') === 'dark';
  });

  // apply theme class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  return (
    <UserProvider>
      <Router>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="App">
          <Routes>
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* <Route path="/chat/:chatRoomId" element={<ChatRedirector />} /> */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <CustomerAuthPage/>
                </PublicRoute>
              }
            />
            <Route
              path="/workerauth"
              element={
                <PublicRoute>
                  <WorkerAuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/customerauth"
              element={
                <PublicRoute>
                  <CustomerAuthPage />
                </PublicRoute>
              }
            />
            <Route
              path="/worker/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordPage />
                </PublicRoute>
              }
            />
            <Route
              path="/customer/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordPageCust />
                </PublicRoute>
              }
            />
            <Route
              path="/worker/home"
              element={
                <ProtectedRoute role="worker">
                  <WorkerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/worker/requests"
              element={
                <ProtectedRoute role="worker">
                  <WorkerRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/worker/profile-update"
              element={
                <ProtectedRoute role="worker">
                  <WorkerProfileUpdate  isDark={isDark} setIsDark={setIsDark}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/worker/chat/:chatRoomId"
              element={
                <ProtectedRoute role="worker">
                  <WorkerChatPage/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/home"
              element={
                <ProtectedRoute role="customer">
                  <CustomerHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/services"
              element={
                <ProtectedRoute role="customer">
                  <BrowseServicesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/services/track-request"
              element={
                <ProtectedRoute role="customer">
                  <TrackRequestPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/customer/profile-update"
              element={
                <ProtectedRoute role="customer">
                  <CustomerProfileUpdate isDark={isDark} setIsDark={setIsDark}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/chat/:chatRoomId"
              element={
                <ProtectedRoute role="customer">
                  <CustomerChatPage/>
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </UserProvider>
    
  );
}

export default App;