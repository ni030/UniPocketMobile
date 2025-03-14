import { FIREBASE_API } from '@env';
import axios from 'axios';
import { auth } from 'backendP/firebaseConfig';

const DEVICE_IP = FIREBASE_API;

export const createComplaint = async (
  date: Date,
  type: string,
  description: string,
  image: string
) => {
  try {
    const user = await auth.currentUser;
    console.log('user', user?.uid);
    const response = await axios.post(`${DEVICE_IP}/complaints/create`, {
      userId: user?.uid,
      date,
      type,
      description,
      image,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllComplaints = async () => {
  try {
    const user = await auth.currentUser;
    const response = await axios.get(`${DEVICE_IP}/complaints/${user?.uid}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComplaint = async (complaintId: string) => {
  try {
    const response = await axios.get(`${DEVICE_IP}/complaints/get/${complaintId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStatus = async (complaintId: string, status: string) => {
  try {
    const response = await axios.put(`${DEVICE_IP}/complaints/updateStatus/${complaintId}`, {
      status,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRating = async (complaintId: string, rating: number) => {
  try {
    const response = await axios.put(`${DEVICE_IP}/complaints/updateRating/${complaintId}`, {
      rating,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
