import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGet, axiosPost } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";
import clsx from "clsx";
import CreditCardForm from "./credit_card/CreditCardForm";
import { AppContext } from "./context/AppContext";
import { ModalLink } from "./ModalLink";
import { BookingStatus } from "./BookingHistory";

function ConfirmBooking() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [creditCard, setCreditCard] = useState(null);
  const { startLoading, stopLoading, snackNotifier } = useContext(AppContext);

  const sendAcknowledgement = () => {
    startLoading();
    axiosPost(apis.bookings.acknowledge, {
      booking_id: bookingId,
      payment_method_id: paymentMethodId,
      credit_card_id: creditCard.id,
    })
      .then((res) => {
        stopLoading();
        snackNotifier(res.data.message, "success", "top-center");
        fetchBooking();
      })
      .catch((err) => {
        stopLoading();
        if (err?.response?.data?.failure_code) {
          snackNotifier(
            err?.response?.data?.detail.message,
            "error",
            "top-center"
          );
        }
      });
  };

  const fetchCreditCard = () => {
    axiosGet(apis.credit_cards.retrieve)
      .then((response) => {
        setCreditCard(response.data);
      })
      .catch((_) => {
        // Ignore Error
      });
  };

  const fetchBooking = () => {
    axiosGet(apis.bookings.retrieve.replace("<id>", bookingId))
      .then((response) => {
        setBooking(response.data);
      })
      .catch((err) => {
        // Ignore
      });
  };

  const fetchPaymentMethods = () => {
    axiosGet(apis.paymentMethods.list)
      .then((response) => {
        setPaymentMethods(response.data);
      })
      .catch((err) => {
        // Ignore
      });
  };

  useEffect(() => {
    fetchBooking();
    fetchPaymentMethods();
    fetchCreditCard();
  }, []);

  return (
    <div className="container p-2">
      <div className="flex p-2 gap-2 items-center">
        <h3 className="font-bold text-gray-600">STATUS</h3>
        <BookingStatus status={booking?.status?.toUpperCase()} />
      </div>
      <h3 className="px-4 text-lg font-bold text-gray-600">ConfirmBooking</h3>
      <div className="flex items-center gap-2 py-2 px-4 shadow-md">
        <CalendarDaysIcon height={24} className="text-purple-800" />
        <span>{booking.start_date}</span>
        <span className="flex-grow border-b border-dashed border-purple-700"></span>
        <span>{booking.end_date}</span>
      </div>
      <div></div>
      <div className="flex items-center gap-2 py-2 px-4 shadow-md">
        <ClockIcon height={24} className="text-purple-800" />
        <span>{booking.start_time}</span>
        <span className="flex-grow border-b border-dashed border-purple-700"></span>
        <span>{booking.end_time}</span>
      </div>

      <div className="flex items-center gap-2 py-2 px-4 shadow-md">
        <MapPinIcon height={24} className="text-purple-800" />
        <h4>Address: </h4>
        <span className="text-purple-700 font-bold">
          {booking.access_info?.address_name}
        </span>
        <span className="text-purple-700 font-bold">
          {booking.access_info?.address_code}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="px-4 text-2xl text-gray-600">Services</h4>
        <div>
          {booking.services?.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2 py-2 px-4 shadow-md"
            >
              <span>{s.name}</span>
              <span className="flex-grow border-b border-dashed border-purple-700"></span>
              <span>${s.price}</span>
            </div>
          ))}
          {booking.services?.length && (
            <div className="flex items-center gap-2 font-extrabold px-4 py-4 shadow-md bg-purple-800 text-white">
              <span>TOTAL</span>
              <span className="flex-grow border-b border-dashed border-purple-700"></span>
              <span>
                $
                {booking.services
                  .reduce((acc, curr) => {
                    return acc + (parseFloat(curr.price) || 0);
                  }, 0)
                  .toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Typography className="text-gray-600 px-4" component="div" variant="h5">
          Click to select your preferred method of payment
        </Typography>
        <div className="flex flex-wrap gap-2 p-4">
          {paymentMethods.map((p, idx) => (
            <button
              onClick={() => setPaymentMethodId(p.id)}
              className={clsx(
                "border-3 rounded-full px-4 py-2 hover:text-purple-700 hover:bg-purple-700/20",
                {
                  "border-purple-700 text-purple-700 shadow-md shadow-purple-700":
                    paymentMethodId === p.id,
                }
              )}
              key={idx}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {paymentMethodId === 1 && (
        <div className="grid gap-4">
          <Typography
            className="text-gray-600 px-4"
            component="div"
            variant="h5"
          >
            Credit card information
          </Typography>
          <div className="max-w-xl px-2">
            {creditCard ? (
              <div>
                <CreditCardForm initial={creditCard} disabled={true} />
              </div>
            ) : (
              <div className="px-4">
                <ModalLink
                  description={
                    <Typography
                      className="text-gray-600"
                      component="div"
                      variant="h5"
                    >
                      Credit card information
                    </Typography>
                  }
                  cancelButtonClassName="hidden"
                  anchorText="Add Credit Card"
                  anchorClassName="disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-1 bg-purple-700 pl-2 pr-4 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                  submitButtonClassName="hidden"
                  modalContent={
                    <div>
                      <CreditCardForm afterSuccess={fetchCreditCard} />
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-end p-4">
        <button
          disabled={
            !Boolean(
              paymentMethodId === 1 ? Boolean(creditCard?.id) : paymentMethodId
            )
          }
          onClick={sendAcknowledgement}
          className=" disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
        >
          Acknowledge Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
