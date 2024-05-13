import React, { useEffect, useState } from "react"
import { addRoom } from "../utils/ApiFunction"
import RoomTypeSelector from "../common/RoomTypeSelector"

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		photo: null,
		roomType: "",
		roomPrice: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleRoomInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "roomPrice") {
			value = !isNaN(value) ? parseInt(value) : ""
		}
		setNewRoom({ ...newRoom, [name]: value })
	}

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice)
			if (success !== undefined) {
				setSuccessMessage("A new room was added successfully!")
				setNewRoom({ photo: null, roomType: "", roomPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new room.")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<div className="container mx-auto mt-10 mb-10">
			<div className="flex justify-center">
				<div className="w-full max-w-lg">
					<h2 className="text-2xl font-bold mb-4">Add a New Room</h2>
					{successMessage && (
						<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
							{errorMessage}
						</div>
					)}
					<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label htmlFor="roomType" className="block text-gray-700 text-sm font-bold mb-2">
								Room Type
							</label>
							<RoomTypeSelector
								handleRoomInputChange={handleRoomInputChange}
								newRoom={newRoom}
							/>
						</div>
						<div className="mb-6">
							<label htmlFor="roomPrice" className="block text-gray-700 text-sm font-bold mb-2">
								Room Price
							</label>
							<input
								required
								type="number"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="roomPrice"
								name="roomPrice"
								value={newRoom.roomPrice}
								onChange={handleRoomInputChange}
							/>
						</div>

						<div className="mb-6">
							<label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">
								Room Photo
							</label>
							<input
								required
								type="file"
								className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								name="photo"
								id="photo"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img src={imagePreview} alt="Room preview" className="mt-3 max-w-xs max-h-xs" />
							)}
						</div>

						<div className="flex items-center justify-between">
							<button
								className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="submit">
								Add Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddRoom
