import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import WorkersPage from "./pages/WorkersPage.jsx";
import WorkerDetailPage from "./pages/WorkerDetailPage.jsx";
import CategoryRedirectPage from "./pages/CategoryRedirectPage.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/workers" element={<WorkersPage />} />
        <Route path="/workers/:id" element={<WorkerDetailPage />} />
        <Route path="/:category(plumber|welder|electrician|painter|cook|carpenter|mason|roofer|housekeeper|computer-tech|security-installer|loader|gardener|security-guard)" element={<CategoryRedirectPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <StaticPage title="About">
              <p>
                WorkerZone helps people find reliable local workers quickly. This UI is built as a clean starting point; you can plug in your real
                backend and data later.
              </p>
            </StaticPage>
          }
        />
        <Route
          path="/contact"
          element={
            <StaticPage title="Contact">
              <p>Email: support@workerzone.example</p>
              <p>Phone: +92 300 0000000</p>
            </StaticPage>
          }
        />
        <Route path="/careers" element={<StaticPage title="Careers"><p>We’re hiring soon.</p></StaticPage>} />
        <Route path="/privacy" element={<StaticPage title="Privacy Policy"><p>Privacy policy page placeholder.</p></StaticPage>} />
        <Route path="/terms" element={<StaticPage title="Terms of Use"><p>Terms page placeholder.</p></StaticPage>} />
        <Route path="/help" element={<StaticPage title="Help"><p>Help page placeholder.</p></StaticPage>} />
        <Route path="/become-worker" element={<StaticPage title="Become a Worker"><p>Worker onboarding page placeholder.</p></StaticPage>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
