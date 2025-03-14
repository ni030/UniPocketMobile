import { FIREBASE_API } from '@env';
import axios from 'axios';

const DEVICE_IP = FIREBASE_API;

export const getAllFacilities = async () => {
  try {
    const response = await axios.get(`${DEVICE_IP}/facilities/getAll`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
