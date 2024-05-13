import React from 'react';

function HeaderMain() {
  return (
    <header>
      <div class="bg-gradient-to-r from-pink-500 to-indigo-600 animate-bounceIn">
        <div class="container mx-auto px-4 py-6">
            <h1 class="text-4xl font-bold text-white mb-2 animate-textGlow">Welcome to HotelPerk</h1>
            <p class="text-lg text-white">Experience luxury and comfort like never before</p>
            <button class="bg-white text-indigo-600 font-semibold py-2 px-4 rounded mt-4 hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out">Book Now</button>
        </div>
    </div>
</header>
  );
}

export default HeaderMain;
