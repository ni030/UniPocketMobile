import { FIREBASE_API } from '@env';
import axios from 'axios';
import { auth } from 'backendP/firebaseConfig';

const DEVICE_IP = FIREBASE_API;

export const checkExistingCRById = async () => {
  try {
    const userId = await auth.currentUser?.uid;
    const response = await axios.get(`${DEVICE_IP}/chosenRoom/get/${userId}`);
    if (response.status === 204) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChosenRoomById = async () => {
  try {
    const userId = await auth.currentUser?.uid;
    const response = await axios.get(`${DEVICE_IP}/chosenRoom/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateChosenRoomById = async (block: string, roomNum: string) => {
  try {
    const userId = await auth.currentUser?.uid;
    const response = await axios.put(`${DEVICE_IP}/chosenRoom/update/${userId}`, {
      block,
      roomNum,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveChosenRoom = async (block: string, roomNum: string) => {
  try {
    const userId = await auth.currentUser?.uid;
    const existingCR = await checkExistingCRById();
    if (existingCR) {
      const response = await updateChosenRoomById(block, roomNum);
      return response.status;
      // console.log(response.status)
    } else {
      const response = await axios.post(`${DEVICE_IP}/chosenRoom/create`, {
        userId,
        block,
        roomNum,
      });
      return response.status;
      // console.log(response.status)
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
