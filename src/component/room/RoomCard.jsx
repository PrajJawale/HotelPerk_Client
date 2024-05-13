import React from 'react';
import { Link } from 'react-router-dom';

function RoomCard({ room }) {
  return (
    <div className='mb-4 w-full '>
      <div className='bg-white shadow-md rounded-md p-4 flex items-center'>
        <div className='flex-shrink-0 mr-3'>
          <img
            className='w-32 h-32 md:w-48 md:h-48 rounded'
            src={`data:image/png;base64,${room.photo}`}
            alt='Room Photo'
          />
        </div>

        <div className='flex-grow ml-3'>
          <h2 className='text-xl font-bold text-gray-800 mb-2'>{room.roomType}</h2>
          <h3 className='text-lg font-semibold text-hotel mb-2'>{room.roomPrice}</h3>
          <p className='text-gray-600'>{room.roomDescription}</p>
        </div>

        <div className='flex-shrink-0'>
          <Link
            to={`/book-room/${room.id}`}
            className='bg-pink-200 text-green-700 px-4 py-2 rounded-md shadow-md hover:bg-hotel-dark transition duration-300'
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
