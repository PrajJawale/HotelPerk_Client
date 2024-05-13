import React, { useState, useEffect } from "react"
import { getRoomTypes } from "../utils/ApiFunction"

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [roomTypes, setRoomTypes] = useState(["Tripple Bed"])
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
	const [newRoomType, setNewRoomType] = useState("")

	useEffect(() => {
		getRoomTypes().then((data) => {
			setRoomTypes(data)
		})
	}, [])

	const handleNewRoomTypeInputChange = (e) => {
		setNewRoomType(e.target.value)
	}

	const handleAddNewRoomType = () => {
		if (newRoomType !== "") {
			setRoomTypes([...roomTypes, newRoomType])
			setNewRoomType("")
			setShowNewRoomTypeInput(false)
		}
	}

	return (
		<>
  {roomTypes.length > 0 && (
    <div>
      <select
        required
        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        name="roomType"
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowNewRoomTypeInput(true);
          } else {
            handleRoomInputChange(e);
          }
        }}
        value={newRoom.roomType}
      >
        <option value="">Select a room type</option>
        <option value="Add New">Add New</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      {showNewRoomTypeInput && (
        <div className="mt-2">
          <div className="flex items-center">
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter New Room Type"
              value={newRoomType}
              onChange={handleNewRoomTypeInputChange}
            />
            <button
              className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="button"
              onClick={handleAddNewRoomType}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</>

	)
}

export default RoomTypeSelector