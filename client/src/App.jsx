import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./page/Dashboard-Page.jsx";
import CreatePage from "./page/Create-Page.jsx";
import NewPage from "./page/New-Page.jsx";
import ProgressPage from "./page/Progress-Page.jsx";
import CompletedPage from "./page/Completed-Page.jsx";
import CanceledPage from "./page/Canceled-Page.jsx";
import FullScreenLoader from "./component/loading/Full-Screen-Loader.jsx";
import RegistrationPage from "./page/Registration-page.jsx";
import LoginPage from "./page/Login-Page.jsx";
import { getToken } from "./helper/CookieHelper.js";
import ProfilePage from "./page/Profile-Page.jsx";
import ForgetPassPage from "./page/Forgetpass-Page.jsx";
import VerifyOtpPage from "./page/VerifyOtp-Page.jsx";
import ResetPasswordPage from "./page/ResetPassword-Page.jsx";
import Page404 from "./page/Page-404.jsx";

const App = () => {
  const token = getToken() || ""; // Ensure token is always a valid value

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
        {token ? (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create-page" element={<CreatePage />} />
            <Route path="/all" element={<NewPage />} />
            <Route path="/in-progress" element={<ProgressPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/canceled" element={<CanceledPage />} />


            <Route path="/profile" element={<ProfilePage />} />


          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forget-password" element={<ForgetPassPage />} />
            <Route path="/verify-otp" element={<VerifyOtpPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </>
        )}
      </Routes>
      <FullScreenLoader />
    </BrowserRouter>
  );
};

export default App;
