import React, { useContext } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes, useLocation } from "react-router-dom";
import TopNavigationBar from "./components/navigation/TopNavigationBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import About from "./components/About";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ResetPassword from "./components/ResetPassword";
import ResetLinkSent from "./components/ResetLinkSent";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import { AppContext } from "./components/context/AppContext";
import { Loader } from "./components/common/Loader";
import Dashboard from "./components/Dashboard";

function App() {
  const standAloneRoutes = [
    "/login",
    "/signup",
    "/reset_password",
    "/reset_link_sent",
    "/forgot_password",
    "/verify_email",
  ];
  const { loading } = useContext(AppContext);

  const { pathname } = useLocation();

  return (
    <>
      {loading && <Loader className="bg-white/75 z-50 fixed inset-0" />}
      <div className="min-h-screen flex flex-col">
        {!standAloneRoutes.includes(pathname) &&
          !Boolean(standAloneRoutes.find((p) => pathname.startsWith(p))) && (
            <TopNavigationBar />
          )}
        <div className="grow min-h-[70vh] flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <div className="flex fixed inset-0 justify-center items-center">
                  <Signin />
                </div>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/reset_password/:uidb64/:token"
              element={<ResetPassword />}
            />
            <Route path="/reset_link_sent" element={<ResetLinkSent />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/verify_email" element={<VerifyEmail />} />
          </Routes>
        </div>
        {!standAloneRoutes.includes(pathname) &&
          !Boolean(standAloneRoutes.find((p) => pathname.startsWith(p))) && (
            <Footer />
          )}
      </div>
    </>
  );
}

export default App;
