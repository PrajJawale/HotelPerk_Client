import React, { useState, useEffect } from 'react';
import { getAllRoom } from '../utils/ApiFunction';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import CardForRoomInRow from './CardForRoomInRow';

function RoomInRow() {
    const [data, setData] = useState([{id:"" , roomType:"" ,romPrice:""}]);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track the index of the first room to render

    useEffect(() => {
        getAllRoom()
            .then((data) => {
                setData(data);
                setFilteredData(data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleNext = () => {
        if (currentIndex + 5 < filteredData.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    return (
        <div className=" r flex flex-row justify-cente items-center space-x-4 overflow-x-auto p-4">
            {/* Previous Button */}
            {currentIndex > 0 && (
                <button onClick={handlePrev} className="focus:outline-none">
                    <FaArrowLeft />
                </button>
            )}

            {/* Render three rooms at a time */}
            {filteredData.slice(currentIndex, currentIndex + 5).map((room) => (
                <CardForRoomInRow  key={room.id} room={room} />
            ))}

            {/* Next Button */}
            {currentIndex + 3 < filteredData.length && (
                <button onClick={handleNext} className="focus:outline-none">
                    <FaArrowRight />
                </button>
            )}
        </div>
    );
}

export default RoomInRow;
