import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'; // Ensure Moment.js is imported

function BookingSummary({ booking, payment, isFormValid, onConfirm }) {
  const navigate = useNavigate(); // Initialize navigate

  // Calculate the number of days between check-in and check-out
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, 'days'); // Ensure the difference is calculated in days

  const [isBookingConfirmed, setIsBookingConfirm] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirm(true);
      onConfirm(); // Trigger any additional actions on confirm
      navigate("/booking-success"); // Navigate to booking success page
    }, 3000); // Simulate a payment/confirmation process delay
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2"></div>
      <div className="mt-5 p-4 shadow-lg">
        <h4 className="text-lg font-semibold">Reservation Summary</h4>
        <p>
          Name: <strong>{booking.guestFullName}</strong>
        </p>
        <p>
          Email: <strong>{booking.guestEmail}</strong>
        </p>
        <p>
          Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
        </p>
        <p>
          Number of Days Booked: <strong>{numOfDays}</strong>
        </p>

        <div>
          <h5 className="text-lg font-semibold">Number of Guests</h5>
          <p>Adults: <strong>{booking.numOfAdults}</strong></p>
          <p>Children: <strong>{booking.numOfChildren}</strong></p>
        </div>

        {payment > 0 ? (
          <>
            <p>Total payment: <strong>${payment}</strong></p>

            {isFormValid && !isBookingConfirmed ? (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-green-600"
                onClick={handleConfirmBooking}
              >
                {isProcessingPayment ? "Processing..." : "Confirm Booking & proceed to payment"}
              </button>
            ) : isBookingConfirmed ? (
              <div className="flex justify-center items-center">
                <p>Loading...</p> {/* Tailwind CSS doesn't include a built-in spinner. You may need to add a custom spinner or text indication here. */}
              </div>
            ) : null}
          </>
        ) : (
          <p className="text-red-500">Check-out date must be after check-in date.</p>
        )}
      </div>
    </div>
  );
}

export default BookingSummary;
