import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Services from "./Services";
import { animated, useSpring } from "@react-spring/web";
import { images } from "../assets/images/images";
import { BookingHistory } from "./BookingHistory";
import ConfirmBooking from "./ConfirmBooking";
import clsx from "clsx";

function Dashboard() {
  const tabs = [
    {
      name: "Book Services",
      path: "/dashboard",
    },
    {
      name: "Booking History",
      path: "/dashboard/booking-history",
    },
  ];
  const { userInfo, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const springs = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <>
      {userInfo ? (
        <animated.div
          style={{
            ...springs,
          }}
        >
          <div className="container px-8 py-2 flex items-center gap-4">
            {tabs.map((tab, idx) => (
              <button
                onClick={() => navigate(tab.path)}
                key={idx}
                className={clsx(
                  "px-4 py-2 rounded-full border-1 hover:shadow-md hover:shadow-purple-700 duration-300 hover:text-purple-700",
                  {
                    "border-purple-700 text-purple-700": tab.path === pathname,
                  }
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Services />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/ack/:bookingId" element={<ConfirmBooking />} />
            </Routes>
          </div>
        </animated.div>
      ) : (
        <div className="grow flex justify-center items-center">
          <div className="grid lg:grid-cols-2 items-center container p-6">
            <div className="">
              <img src={images.passwordForm} />
            </div>
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-700 px-4 py-2 text-[#fff] rounded-lg hover:shadow-lg hover:bg-purple-800 hover:shadow-purple-700 duration-300"
            >
              Please Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
