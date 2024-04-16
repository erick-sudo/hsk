import React, { useContext, useEffect, useState } from "react";
import { axiosGet } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import ControlledAccordions from "./ControlledAccordions";
import { CalendarIcon } from "@mui/x-date-pickers";
import {
  DoNotDisturbAltOutlined,
  HandshakeOutlined,
  HourglassBottomOutlined,
  HourglassTopOutlined,
  RotateRightOutlined,
  ScheduleOutlined,
  TimerOffOutlined,
  TimerOutlined,
  VerifiedOutlined,
} from "@mui/icons-material";
import { AppContext } from "./context/AppContext";

const bookingStatuses = {
  PENDING: { icon: <ScheduleOutlined />, classes: "bg-gray-200 text-gray-500" },
  ACCEPTED: {
    icon: <HandshakeOutlined />,
    classes: "bg-purple-950 text-[#fff]",
  },
  INPROGRESS: {
    icon: <RotateRightOutlined className="animate-spin" />,
    classes: "bg-purple-200 text-purple-800",
  },
  COMPLETED: {
    icon: <VerifiedOutlined />,
    classes: "bg-green-200 text-green-900",
  },
  CANCELLED: {
    icon: <DoNotDisturbAltOutlined />,
    classes: "bg-red-200 text-red-900",
  },
};

export function BookingStatus({ status }) {
  return (
    <div
      className={`${
        bookingStatuses[status] && bookingStatuses[status]["classes"]
      } flex items-center gap-2 px-4 py-2 rounded-full font-bold`}
    >
      <div className={``}>
        {bookingStatuses[status] && bookingStatuses[status]["icon"]}
      </div>
      <div className="lowercase">{status}</div>
    </div>
  );
}

export function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const { loading } = useContext(AppContext);
  const [cleaningFrequencies, setCleaningFrequencies] = useState([]);
  const fetchBookingHistory = () => {
    axiosGet(apis.bookings.list)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((_) => {
        // Ignore Error
      });
  };

  const fetchCleaningFrequencies = () => {
    axiosGet(apis.cleaning_frequencies)
      .then((response) => {
        setCleaningFrequencies(response.data);
      })
      .catch((_) => {
        // Ignore Error
      });
  };

  useEffect(() => {
    fetchCleaningFrequencies();
  }, []);

  useEffect(() => {
    fetchBookingHistory();
  }, [loading]);

  return (
    <div className="container">
      {bookings?.length > 0 ? (
        <div>
          <ControlledAccordions
            items={bookings.map((booking) => ({
              summary: (
                <div className="flex items-center w-full">
                  <div className="grow flex items-center text-purple-800 font-extrabold gap-4">
                    <CalendarIcon />
                    <span className="">
                      {new Date(booking.start_date).toDateString()}
                    </span>
                  </div>
                  <div className="px-2">
                    <BookingStatus status={booking.status} />
                  </div>
                </div>
              ),
              details: (
                <div className="grid gap-4 p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col items-center gap-2 p-2">
                      <div className="text-gray-500 flex gap-2 font-bold text-lg">
                        <HourglassTopOutlined />
                        <span className="">Start Date</span>
                      </div>
                      <div className="px-4">
                        {new Date(booking.start_date).toDateString()}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-2">
                      <div className="text-gray-500 flex gap-2 font-bold text-lg">
                        <HourglassBottomOutlined />
                        <span className="">End Date</span>
                      </div>
                      <div className="px-4">
                        {new Date(booking.end_date).toDateString()}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-2">
                      <div className="text-gray-500 flex gap-2 font-bold text-lg">
                        <TimerOutlined />
                        <span className="">Start Time</span>
                      </div>
                      <div className="px-4">{booking.start_time}</div>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-2">
                      <div className="text-gray-500 flex gap-2 font-bold text-lg">
                        <TimerOffOutlined />
                        <span className="">End Time</span>
                      </div>
                      <div className="px-4">{booking.end_time}</div>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded pb-4">
                    <h3 className="font-bold text-gray-500 text-lg text-center mb-4">
                      Cleaning Frequency
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {cleaningFrequencies.map((freq, idx) => (
                        <div className="" key={idx}>
                          <div
                            className={`mx-auto w-max border-3 rounded-full px-4 py-2 ${
                              freq.id === booking.cleaning_frequency &&
                              "border-purple-700 bg-purple-300 text-purple-800"
                            }`}
                          >
                            {freq.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded pb-4">
                    <h3 className="font-bold text-gray-500 text-lg text-center mb-4">
                      Booked Services
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {booking.services.map((service, idx) => (
                        <div className="flex flex-col items-center" key={idx}>
                          <span className="text-purple-900 font-bold">
                            ${service.price}
                          </span>
                          <span>{service.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
