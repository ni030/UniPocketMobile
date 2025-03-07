import axios from 'axios';
import { auth } from 'backendP/firebaseConfig';
const DEVICE_IP = "http://10.0.2.2"

export const createComplaint = async (date: Date, type: string, description: string, image: string) => {
    try{
        const user = await auth.currentUser
        console.log('user', user?.uid)
        const response = await axios.post(`${DEVICE_IP}:5000/complaints/create`,{
            userId: user?.uid,
            date: date,
            type: type,
            description: description,
            image: image
        });
        return response
    }catch(error){
        console.error(error)
        throw error
    }
}

export const getAllComplaints = async () => {
    try{
        const user = await auth.currentUser
        const response = await axios.get(`${DEVICE_IP}:5000/complaints/${user?.uid}`);
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const getComplaint = async (complaintId: string) => {
    try{
        const response = await axios.get(`${DEVICE_IP}:5000/complaints/get/${complaintId}`);
        return response.data
    }catch(error){
        console.error(error)
        throw error
    }
}

export const updateStatus = async (complaintId: string, status: string) => {
    try{
        const response = await axios.put(`${DEVICE_IP}:5000/complaints/updateStatus/${complaintId}`,{
            status: status
        });
        return response
    }catch(error){
        console.error(error)
        throw error
    }
}

export const updateRating = async (complaintId: string, rating: number) => {
    try{
        const response = await axios.put(`${DEVICE_IP}:5000/complaints/updateRating/${complaintId}`,{
            rating: rating
        });
        return response
    }catch(error){
        console.error(error)
        throw error
    }
}
