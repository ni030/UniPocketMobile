import { FIREBASE_API } from '@env';
import axios from 'axios';
import { auth } from 'backendP/firebaseConfig';

const DEVICE_IP = FIREBASE_API;

export const checkExistingById = async () => {
  try {
    const userId = await auth.currentUser?.uid;
    // const userId = "72345"
    const response = await axios.get(`${DEVICE_IP}/merits/get/${userId}`);
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

export const getMeritById = async () => {
  try {
    const userId = await auth.currentUser?.uid;
    const response = await axios.get(`${DEVICE_IP}/merits/get/${userId}`);
    if(response.status === 204){
      return {data: 'null'};
    }else{
      return response.data;
    }
  
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllMeritsDetails = async () => {
  try {
    const response = await axios.get(`${DEVICE_IP}/merits/getAll`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkDoesMeritExist = async (event: any) => {
  try {
    const response = await getMeritById();

    // Check if eventId exists in response data
    const exists = response.data.events.some((item: any) => item?.id === event.id);

    return exists; // Returns true if eventId exists, otherwise false
  } catch (error) {
    console.error('Error checking merit:', error);
    return false;
  }
};

interface Event {
  eventId: string;
  role: 'Participant' | 'Committee';
}

const calctTotalMerits = async (event: Event) => {
  const meritPoints = {
    Participant: 1,
    Committee: 5,
  };
  const response = await getMeritById();
  const eventsArray: Event[] = response.data.events;

  // LOOP THROUGH EVENTS ARRAY AND CALCULATE TOTAL MERITS
  let totalMerits = 0;
  eventsArray.forEach((event: Event) => {
    totalMerits += meritPoints[event.role];
  });
  totalMerits += meritPoints[event.role];
  return totalMerits;
};

const calcRanking = async (totalMerits: number) => {
  const allMerits = await fetchAllMeritsDetails();
  let currentNum = 1;
  allMerits.forEach((merit: any) => {
    if (totalMerits < merit.totalMerits) {
      currentNum++;
    }
  });

  let ranking;
  if (currentNum <= 3) {
    ranking = 1;
  } else if (currentNum <= 10) {
    ranking = 2;
  } else {
    ranking = 3;
  }

  return ranking;
};

export const recordMerit = async (event: Event) => {
  try {
    const userId = await auth.currentUser?.uid;

    const checkExistingUser = await checkExistingById();

    if (checkExistingUser) {
      const checkExistingMerit = await checkDoesMeritExist(event);

      if (checkExistingMerit) {
        return 'founded';
      } else {
        const currentData = await getMeritById();
        const updatedEvents = currentData.data.events.concat(event);
        const totalMerits = await calctTotalMerits(event);
        const ranking = await calcRanking(totalMerits);

        const response = await axios.put(`${DEVICE_IP}/merits/update/${userId}`, {
          events: updatedEvents,
          totalMerits,
          ranking,
        });
        return response.status;
      }
    } else {
      const meritPoints = {
        Participant: 1,
        Committee: 5,
      };
      const totalMerits = meritPoints[event.role];
      const ranking = await calcRanking(totalMerits);
      const response = await axios.post(`${DEVICE_IP}/merits/create`, {
        userId,
        event,
        totalMerits,
        ranking,
      });
      return response.status;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
