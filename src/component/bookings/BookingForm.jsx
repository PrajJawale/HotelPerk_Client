import React, { useEffect, useState } from "react";
import moment from "moment";
import BookingSummary from "./BookingSummary";
import { bookRoom, getRoomById } from "../utils/ApiFunction";
import { useNavigate, useParams } from "react-router-dom";


const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);

  const currentUser = localStorage.getItem("userId");

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser || " ",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });

    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <div className="container mx-auto mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mt-5">
            <h4 className="text-2xl font-semibold mb-5">Reserve Room</h4>

            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="guestFullName" className="block text-gray-700 font-medium mb-2">
                  Fullname
                </label>
                <input
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                {validated && !booking.guestFullName && (
                  <p className="text-red-500 text-xs italic">Please enter your fullname.</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="guestEmail" className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}

                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                />
                {validated && !booking.guestEmail && (
                  <p className="text-red-500 text-xs italic">Please enter a valid email address.</p>
                )}
              </div>

              <fieldset className="border border-gray-200 p-4 rounded-lg">
                <legend className="font-bold text-lg">Lodging Period</legend>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkInDate" className="block text-gray-700 font-medium mb-2">
                      Check-in date
                    </label>
                    <input
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      placeholder="check-in-date"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {validated && !booking.checkInDate && (
                      <p className="text-red-500 text-xs mt-1">Please select a check in date.</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="checkOutDate" className="block text-gray-700 font-medium mb-2">
                      Check-out date
                    </label>
                    <input
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      placeholder="check-out-date"
                      min={moment().format("YYYY-MM-DD")}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {validated && !booking.checkOutDate && (
                      <p className="text-red-500 text-xs mt-1">Please select a check out date.</p>
                    )}
                  </div>
                  {errorMessage && <p className="col-span-2 text-red-500 text-xs mt-1">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset className="border border-gray-200 p-4 rounded-lg mt-4">
                <legend className="font-bold text-lg">Number of Guests</legend>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="numOfAdults" className="block text-gray-700 font-medium mb-2">
                      Adults
                    </label>
                    <input
                      required
                      type="number"
                      id="numOfAdults"
                      name="numOfAdults"
                      defaultValue=""
                      min={1}
                      placeholder="0"
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {validated && booking.numOfAdults < 1 && (
                      <p className="text-red-500 text-xs mt-1">Please select at least 1 adult.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="numOfChildren" className="block text-gray-700 font-medium mb-2">
                      Children
                    </label>
                    <input
                      required
                      type="number"
                      id="numOfChildren"
                      name="numOfChildren"
                      defaultValue="0"
                      placeholder="0"
                      min={0}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    {validated && booking.numOfChildren < 0 && (
                      <p className="text-red-500 text-xs mt-1">Select 0 if no children.</p>
                    )}
                  </div>
                </div>
              </fieldset>

              <div className="flex justify-end mt-2 mb-2">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="md:col-span-1">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;