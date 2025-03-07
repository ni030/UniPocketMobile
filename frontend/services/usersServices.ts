import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db } from '../backendP/firebaseConfig'
import { GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithPopup, updatePassword } from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import axios from 'axios';
const DEVICE_IP = "http://10.0.2.2"

const checkIfUserExists = async (email: string) => {
    try{
        const response = await axios.get(`${DEVICE_IP}:5000/users/check/${email}`)
        if(response.status == 200){
            return true
        } else {
            return false
        }
    }catch(error){
        console.error(error)
        throw error
    }

};

export const signUpUser = async (email: string, password: string, name: string, phoneNum: string, block: string, room: string) => {
    try{
        // Check if the email exists
        const userExists = await checkIfUserExists(email);
        if (userExists) {
            return 'User already exists';
        }else{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            const userId = user.uid

            await sendEmailVerification(user)

            const response = await axios.post(`${DEVICE_IP}:5000/users/register`,{
                userId: userId,
                email: email,
                name: name,
                phoneNum: phoneNum,
                block: block,
                room: room
            });
            console.log('response', response.data)
        }

    } catch (error: any) {
        console.error(error)
        throw error
    }
}

export const getUserDetails = async () => {
    try{
        const user = auth.currentUser
        if(user){
            const response = await axios.get(`${DEVICE_IP}:5000/users/get/${user.uid}`)
            return response.data
        }
    }catch(error){
        console.error(error)
        throw error
    }
}

export const updateUserDetails = async (name: string, phoneNum: string, block: string, room: string) => {
    try{
        const user = auth.currentUser
        if(user){
            const response = await axios.put(`${DEVICE_IP}:5000/users/update/${user.uid}`,{
                name: name,
                phoneNum: phoneNum,
                block: block,
                room: room
            });

            return response.status
        }
    }catch(error){
        console.error(error)
        throw error
    }
}

//firebase authentication

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

export const changePassword = async (currentPassword: string, newPassword: string) => {
    try{
        console.log('currentPassword', currentPassword)
        console.log('newPassword', newPassword)
        const user = auth?.currentUser
        if(user){
            if (user.email) {
                const res = await signInWithEmailAndPassword(auth, user.email, currentPassword)
                await updatePassword(user, newPassword)
                return res
            } else {
                throw new Error('User email is null');
            }
        }
    }catch(error){
        throw error
    }
}

export const signOutUser = async () => {
    try{
        await auth.signOut()
    }catch(error){
        console.error(error)
        throw error
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
    
