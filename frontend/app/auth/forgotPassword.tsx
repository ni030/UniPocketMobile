import { useNavigation } from '@react-navigation/native'
import Loader from 'components/Loader'
import React, { useState } from 'react'
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { resetPassword } from 'services/userServices'

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation<any>()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    }

    const handleNext = async () => {
        if(!email ){
            ToastAndroid.show('Please enter your email', ToastAndroid.SHORT)
        }else{
            setLoading(true)
            try{
                const result = await resetPassword(email)
                if(result instanceof Error){
                    ToastAndroid.show(result.message, ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show("Password reset email sent! Check your email.", ToastAndroid.SHORT)
                    navigation.navigate('SignIn')
                }
                setLoading(false)
            }catch (error) {
                ToastAndroid.show('Password reset failed', ToastAndroid.SHORT)
                setLoading(false)
            }
        }
    }

    return (
        <View className='h-full w-full flex justify-start items-center'>
            {loading && (
                <Loader />
             )}
            <View className='h-1/6 w-full bg-rose-800 flex justify-end'>
                <Text className='text-4xl font-semibold text-white px-12 py-5'>Reset Password</Text>
            </View> 
            <View className='h-auto w-full flex justify-center items-center px-12 py-16'>
                <Text className='h-auto w-full text-sm text-left p-1 text-gray-500 '>Enter your email address to reset your password</Text>
                <TextInput
                    editable
                    maxLength={50}
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder= 'Email'
                    className='h-auto w-full bg-transparent text-lg text-black border-b-2 border-b-gray-400 rounded-sm'
                />
                {!isEmailValid &&  
                    <Text className='w-full py-2 text-left text-red-500'>Please enter a valid Email</Text>
                }
            </View>
            <View className='h-auto w-full flex justify-center items-center m-3'>
                <TouchableOpacity
                    onPress={handleNext}
                    className='h-14 min-w-[180] bg-rose-800 flex justify-center items-center rounded-xl '
                    >
                    <Text className='text-white font-semibold text-lg'>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgotPassword