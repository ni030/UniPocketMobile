import { FIREBASE_API } from '@env';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithPopup,
  updatePassword,
} from 'firebase/auth';

import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
} from '../backendP/firebaseConfig';

const DEVICE_IP = FIREBASE_API;

const checkIfUserExists = async (email: string) => {
  try {
    const response = await axios.get(`${DEVICE_IP}/users/check/${email}`);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUpUser = async (
  email: string,
  password: string,
  name: string,
  phoneNum: string,
  block: string,
  room: string
) => {
  try {
    // Check if the email exists
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return 'User already exists';
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      await sendEmailVerification(user);

      const response = await axios.post(`${DEVICE_IP}/users/register`, {
        userId,
        email,
        name,
        phoneNum,
        block,
        room,
      });
      console.log('response', response.data);
    }
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const response = await axios.get(`${DEVICE_IP}/users/get/${user.uid}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserDetails = async (
  name: string,
  phoneNum: string,
  block: string,
  room: string
) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const response = await axios.put(`${DEVICE_IP}/users/update/${user.uid}`, {
        name,
        phoneNum,
        block,
        room,
      });

      return response.status;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//firebase authentication

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      return new Error('Please verify your email!');
    }
  } catch (error) {
    // console.error(error)
    return error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    // Check if the email exists
    const userExists = await checkIfUserExists(email);

    if (!userExists) {
      throw new Error('Email does not exist');
    }

    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const user = auth?.currentUser;
    if (user) {
      if (user.email) {
        const res = await signInWithEmailAndPassword(auth, user.email, currentPassword);
        await updatePassword(user, newPassword);
        return res;
      } else {
        throw new Error('User email is null');
      }
    }
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// // Register for redirect
// WebBrowser.maybeCompleteAuthSession();

// // Create a custom hook for Google Auth
// export function useGoogleAuth() {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: '887718517807-d96j6efnqcr4a34tb6ib72dlb6snsin9.apps.googleusercontent.com',
//     iosClientId: '887718517807-9q8qh7kplu8buttsunafrlk1e4bgmkb1.apps.googleusercontent.com',
//     scopes: ['profile', 'email'],
//     redirectUri: 'https://uniresidence-e1123.firebaseapp.com/__/auth/handler',
//   });

//   return {
//     request,
//     response,
//     promptAsync,
//   };
// }

// export const signInWithGoogle = async (promptAsyncFn: () => Promise<any>) => {
//   try {
//     // Start the Google Auth flow using the function passed from the component
//     const result = await promptAsyncFn();
    
//     if (result.type === 'success') {
//       // Get the ID token from the response
//       const { id_token } = result.params;
      
//       // Create a Google credential
//       const credential = GoogleAuthProvider.credential(id_token);
      
//       // Sign in to Firebase with the Google credential
//       const userCredential = await signInWithCredential(auth, credential);
//       const user = userCredential.user;
//       console.log('Google Sign In Successful', user);
      
//       // Return the user object
//       return user;
//     } else {
//       // User cancelled the flow
//       throw new Error('Sign in was cancelled');
//     }
//   } catch (error) {
//     console.error('Google Sign In Failed', error);
//     throw error;
//   }
// };
