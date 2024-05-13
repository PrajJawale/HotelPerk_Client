import React from 'react';
import { Link } from 'react-router-dom';
//add comment 
function CardForRoomInRow({ room }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg h-full w-80">
            {/* Room Image */}
            <img className=" h-60 w-40 object-cover" src={`data:image/png;base64,${room.photo}`} alt={room.roomType} />

            {/* Room Details */}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{room.roomType}</div>
                <p className="text-gray-700 text-base">{`Rs ${room.roomPrice} Per Night`}</p>
            </div>

            {/* Book Now Button */}
            <div className="  flex justify-center ">
                <Link to={`/book-room/${room.id}`} className="inline-block bg-pink-200 text-green-700 px-4 py-2 rounded-md shadow-md hover:bg-hotel-dark transition duration-300">
                    Book Now
                </Link>
            </div>
        </div>
    );
}

export default CardForRoomInRow;
