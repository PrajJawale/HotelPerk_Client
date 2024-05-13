import React, { useEffect, useState } from "react"
import { getRoomById,updateRoom } from "../utils/ApiFunction"
import { Link, useParams } from "react-router-dom"

const EditRoom = () => {
    const [room, setRoom] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { roomId } = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({ ...room, photo: selectedImage })
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setRoom({ ...room, [name]: value })
    }

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
            } catch (error) {
                console.error(error)
            }
        }

        fetchRoom()
    }, [roomId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateRoom(roomId, room)
            if (response.status === 200) {
                setSuccessMessage("Room updated successfully!")
                const updatedRoomData = await getRoomById(roomId)
                setRoom(updatedRoomData)
                setImagePreview(updatedRoomData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating room")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Room</h3>
            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label htmlFor="roomType" className="block text-gray-700 text-sm font-bold mb-2">
                                Room Type
                            </label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="roomPrice" className="block text-gray-700 text-sm font-bold mb-2">
                                Room Price
                            </label>
                            <input
                                type="number"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">
                                Photo
                            </label>
                            <input
                                required
                                type="file"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Room preview"
                                    style={{ maxWidth: "400px", maxHeight: "400" }}
                                    className="mt-3"
                                />
                            )}
                        </div>
                        <div className="flex items-center justify-between">
                            <Link to={"/existing-rooms"} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Back
                            </Link>
                            <button type="submit" className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditRoom
