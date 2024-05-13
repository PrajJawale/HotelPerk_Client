import React from 'react';

function Header({ title }) {
  return (
    <header className="bg-blue-500 text-white py-2">
      <div className="overlay opacity-50 absolute inset-0 bg-black"></div>
      <div className="container mx-auto px-4 relative">
        <h1 className="text-1xl font-bold">{title}</h1>
      </div>
    </header>
  );
}

export default Header;
