import React from 'react';

let today = new Date();

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-3 sticky bottom-0 inset-x-0">
      <div className="container mx-auto">
        <div className="text-center">
          <p>
            &copy; {today.getFullYear()} HotelPerk
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
