import React, { useState } from "react";

const RoomFilter = ({ data = [], setFilteredData }) => {
    const [filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedType = e.target.value;
        setFilter(selectedType);

        const filteredRooms = data.filter((room) =>
            room.roomType.toLowerCase().includes(selectedType.toLowerCase())
        );
        setFilteredData(filteredRooms);
    };

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    };

    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

    return (
        <div className="flex mb-3 items-center">
            <span className="px-3 py-2 bg-gray-100 text-gray-800 rounded-l-md">
                Filter rooms by type
            </span>
            <select
                className="form-select px-3 py-2 rounded-none rounded-r-none border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="room type filter"
                value={filter}
                onChange={handleSelectChange}
            >
                <option value="">select a room type to filter....</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                ))}
            </select>
            <button
                className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                type="button"
                onClick={clearFilter}
            >
                Clear Filter
            </button>
        </div>
    );
};

export default RoomFilter;
