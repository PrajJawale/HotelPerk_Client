import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRoom } from "../utils/ApiFunction";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import EditRoom from "./EditRoom";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import AddRoom from "./AddRoom";


const ExistingRooms = () => {
    const [rooms, setRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([{ id: "", roomType: "", roomPrice: "" }]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRoom();
            setRooms(result);
            setIsLoading(false);
            console.log(result); // Log the fetched rooms
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    const navigate = useNavigate()
    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType);
            setFilteredRooms(filteredRooms);
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if (result === "") {
                setSuccessMessage(`Room No ${roomId} was delete`)
                fetchRooms()
            } else {
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }


    const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = (filteredRooms && filteredRooms.length) ? filteredRooms.length : (rooms && rooms.length) ? rooms.length : 0;
        return Math.ceil(totalRooms / roomsPerPage);
    };

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = (filteredRooms && filteredRooms.length > 0) ? filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom) : [];

    return (
        <>
            <div className="container mx-auto md:col-span-8 lg:col-span-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>

            {isLoading ? (
                <p>Loading existing rooms</p>
            ) : (
                <>
                    <section className="mt-20 mb-5 container">
                        <div className="flex justify-between mb-3 mt-5">
                            <h2 className="text-2xl font-bold">Existing Rooms</h2>
                        </div>

                        <div className="flex justify-between mb-2">
                            <div className="w-full md:w-1/2 mb-2 md:mb-0">
                                <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                            </div>
                            <Link to='/add-room'>
                                <button className="flex align-content: flex-end bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-black-500 hover:border-red-500n rounded">
                                    Add New Room
                                </button>
                            </Link>
                        </div>


                        <table className="table-auto border border-collapse border-gray-400 w-full">
                            <thead>
                                <tr className="text-center bg-gray-200">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Room Type</th>
                                    <th className="px-4 py-2">Room Price</th>
                                    <th className="px-4 py-2">Actions</th>

                                </tr>
                            </thead>

                            <tbody>
                                {currentRooms.map((room, index) => (
                                    <tr key={room.id} className="text-center">
                                        <td className="border px-4 py-2">{room.id}</td>
                                        <td className="border px-4 py-2">{room.roomType}</td>
                                        <td className="border px-4 py-2">{room.roomPrice}</td>
                                        {/* Add actions column if needed */}
                                        <td >
                                            <Link to={`/edit-room/${room.id}`}>
                                                <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-black-700 hover:border-blue-500 rounded pr-5">
                                                    View/Edit
                                                </button>
                                            </Link>


                                            <button
                                                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-black-500 hover:border-red-500 rounded"
                                                onClick={() => handleDelete(room.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <div className="flex justify-center">
                        <RoomPaginator
                            currentPage={currentPage}
                            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                            onPageChange={handlePaginationClick}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default ExistingRooms;
