import React, { useEffect, useState } from "react";
import { getAllRoom } from "../utils/ApiFunction";
import RoomCard from "./RoomCard";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([{ id: "" }]);

    useEffect(() => {
        setIsLoading(true);
        getAllRoom()
            .then((data) => {
                setData(data);
                setFilteredData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading rooms.....</div>;
    }
    if (error) {
        return <div className="text-red-600">Error : {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData
            .slice(startIndex, endIndex)
            .map((room) => <RoomCard key={room.id} room={room} />);
    };

    return (
        <div className="container mx-auto">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
                {/* Make RoomFilter and RoomPaginator fixed or sticky */}
                <div className="mb-3 md:mb-0 sticky top-5">
                    <div className="border border-black rounded p-2">
                        {/* Adjust padding and font size */}
                        <RoomFilter data={data} setFilteredData={setFilteredData} />
                    </div>
                </div>

                {/* Adjust the margin top of RoomPaginator to prevent overlap */}
                <div className="flex items-center justify-end mt-5 md:mt-0">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>


            {/* Make the room list scrollable */}
            <div className="overflow-y-auto max-h-96">
                <div className={`grid ${filteredData.length < 6 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                    {renderRooms()}
                </div>
            </div>
        </div>
    );
};

export default Room;
