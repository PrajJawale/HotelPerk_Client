import { useState } from 'react';
import AddRoom from "./component/room/AddRoom";
import ExistingRooms from './component/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRoom from './component/room/EditRoom';
import NavBar from './component/layout/NavBar';
import Footer from './component/layout/Footer';
import RoomListing from './component/room/RoomListing';
import Admin from './component/admin/Admin';
import Home from './component/home/Home';
import BookingForm from './component/bookings/BookingForm';
import CheckOutForm from './component/bookings/CheckOutForm';
import BookingSummary from './component/bookings/BookingSummary';


function App() {
  return (
    <>
      <main>
        <Router>
          <NavBar />

          {/* Add margin-top to create space below the NavBar */}
          <div className="mt-16"> {/* Adjust the margin-top as needed */}
            <Routes>
              <Route path='/home' element={<Home />} /> {/* Assuming Home is your landing page component */}
              <Route path='/add-room' element={<AddRoom />} /> {/* Assuming AddRoom handles editing as well */}
              <Route path='/existing-rooms' element={<ExistingRooms />} />
              <Route path='/edit-room/:roomId' element={<EditRoom />} />
              <Route path='/browse-all-rooms' element={<RoomListing />} />
              <Route path='/admin' element={<ExistingRooms/>} />
              <Route path='/book-room/:roomId' element={<CheckOutForm/>}/>
             
         
            </Routes>
          </div>
           
          <Footer />
        </Router>
      </main>
    </>
  );
}

export default App;
