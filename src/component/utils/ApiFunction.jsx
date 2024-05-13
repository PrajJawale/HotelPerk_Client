import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}


// this function add a new room to the database
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo) //(name,val)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData)
    if (response.status === 201) {
        return true;
    }
    else {
        return false;
    }

}

// this function gets all the roomtype form the database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room-types")
        return response.data

    } catch (error) {

        throw new Error("Error fetching room types")

    }
}

// This function get the all the room from the database
export async function getAllRoom() {
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data

    } catch (error) {
        throw new Error("Error Fetching the Room")
    }
}

//this function delete the room by id 
export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    }
    catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

// export const deleteRoomById = async (roomId) => {
//     try {
//         // Assuming you are using fetch to call your API
//         const response = await fetch(`/rooms/delete/room/${roomId}`, { // Use your actual API endpoint
//             method: 'DELETE', // HTTP method as DELETE
//         });
//         if (!response.ok) throw new Error('Deletion failed');
//         return ""; // Assuming your API returns an empty response on successful deletion
//     } catch (error) {
//         console.error("Error deleting room:", error);
//         throw error; // Rethrow the error to be caught by the calling function
//     }
// };

/* This function update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`/rooms/update/${roomId}`, formData,)
    return response
}

//this function get the room by the roomId
export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error Fetching the room ${error.message}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`)
        return response.data

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get('/bookings/all-rooms')
        return result.data
    } catch (error) {
        throw new error(error.message)

    }


}

export async function getBookingByConfirmationCode() {
    try {
        const response = await api.get(`/confirmation/${confirmationCode}`)
        return response.data;
    }
    catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error in finding the room : ${error.message}`)
        }
    }
}


export async function cancelBooking() {
        try {
            const response = await api.delete(`/booking/${bookingId}/delete`)
            return response.data

        } catch (error) {
            throw new Error(`Error Cancelling the room : ${error.message}`)
        }
}



