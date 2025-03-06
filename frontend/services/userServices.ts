import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db } from '../backendP/firebaseConfig'
import { GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import axios from 'axios';
const DEVICE_IP = "http://10.0.2.2"



const checkIfUserExists = async (email: string) => {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
};

export const signUpUser = async (email: string, password: string, name: string, phoneNum: string, block: string, room: string) => {
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        const userId = user.uid

        // console.log('ip', DEVICE_IP)
        // console.log('email', email)
        // console.log('name', name)
        // console.log('phoneNum', phoneNum)
        // console.log('block', block)
        // console.log('room', room)
        // console.log('userId', userId)
        // Check if the email exists
        const response = await axios.post(`${DEVICE_IP}:5000/users/register`,{
            userId: userId,
            email: email,
            name: name,
            phoneNum: phoneNum,
            block: block,
            room: room
        });
        console.log('response', response.data)
    } catch (error: any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        throw error
    }
}

// export const signUpUser = async (email: string, password: string, name: string, phoneNum: string, block: string, room: string) => {
//     try{
//         // Check if the email exists
//         const userExists = await checkIfUserExists(email);

//         if (userExists) {
//             return 'User already exists';
//         }

//         const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//         const user = userCredential.user

//         // Send email verification
//         await sendEmailVerification(user)

//         const res = await setDoc(doc(db, 'users', user.uid), {
//             userId: user.uid,
//             email: email,
//             name: name,
//             phoneNum: phoneNum,
//             block: block,
//             room: room
//         })

//     } catch (error) {
//         console.error(error)
//         throw error
//     }
// }

export const signInUser = async (email: string, password: string) => {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        if(!user.emailVerified){
            return new Error('Please verify your email!')
        }

    } catch (error) {
        // console.error(error)
        return error
    }
}

export const resetPassword = async (email: string) => {
    try{
        // Check if the email exists
        const userExists = await checkIfUserExists(email);

        if (!userExists) {
            throw new Error('Email does not exist');
        }
        
        await sendPasswordResetEmail(auth, email)
        console.log('Password reset email sent')
    } catch (error) {
        console.error(error)
        return error
    }
}

// GoogleSignin.configure({
//     webClientId: '887718517807-d96j6efnqcr4a34tb6ib72dlb6snsin9.apps.googleusercontent.com',
// });

export const signInWithGoogle = async () => {
    try{
        // await GoogleSignin.hasPlayServices();
        // const userInfo = await GoogleSignin.signIn();
        // console.log("userinfo", userInfo);

        // Check if the user exists in Firestore
    }catch(error){
        console.error('Google Sign In Failed', error)
        throw error
    }
}
    
