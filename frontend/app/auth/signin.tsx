import { InputField } from 'components/InputField'
import React, { useState } from 'react'
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { signInUser, signInWithGoogle } from 'services/userServices';
import { ErrorMessage } from 'components/ErrorMessage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SignIn = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false) 
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true)

    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigation<any>()

    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleEmailChange = (email: string) => {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    };

    const handleSignIn = async () => {
        setLoading(true)
        if(email && password){
            setLoading(false)
            try {
                const result = await signInUser(email, password)
                setLoading(false)
                if(result instanceof Error){
                    ToastAndroid.show(result.message, ToastAndroid.SHORT)
                }else{
                    ToastAndroid.show('Sign In Successful', ToastAndroid.SHORT)
                    navigation.navigate('MainApp')
                }
                
            }catch (error) {
                setLoading(false)
                ToastAndroid.show('Sign In Failed', ToastAndroid.SHORT)
            }
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
      
            
        } catch (error) {
            ToastAndroid.show('Google Sign In Failed', ToastAndroid.SHORT)
        }
    }

  return (
        <View className='h-full w-full flex justify-start items-center '>
            <View className='h-1/6 w-full bg-rose-800 flex justify-end'>
                <View><Text className='text-4xl px-14 py-3 font-bold text-white'>Sign In</Text></View>
            </View>
            <View className='h-auto w-full flex justify-center items-center my-16'>
                <Text className='w-full px-12 mb-10 text-3xl font-semibold text-left text-rose-800 '><FontAwesome5 name="university" size={29} color="#9F1239" /> Welcome to UniPocket</Text>
                <InputField 
                    placeholder='Email'
                    value={email}
                    onChangeText={handleEmailChange}
                />
                {!isEmailValid &&  
                    <ErrorMessage
                        message="Please enter a valid email address." 
                    />
                }
                <View className="h-auto w-4/5 flex flex-row m-5 px-4 justify-center items-center bg-white text-black border-b-2 border-b-gray-400 rounded-sm">
                    <TextInput
                        className="flex-1 h-auto text-lg"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible} 
                    />
                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <FontAwesome
                            name={isPasswordVisible ? "eye" : "eye-slash"}
                            size={20}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
                <Text className='w-full px-12 underline' onPress={() => navigation.navigate('ForgotPassword')}>Forgot Your Password?</Text>
            </View>
            <View className='h-auto w-full flex justify-center items-center gap-5'>
                <TouchableOpacity
                    onPress={handleSignIn}
                    
                    className='h-14 w-3/5 bg-rose-800 flex justify-center items-center rounded-lg '
                    >
                    <Text className='text-white font-bold text-xl'>Login</Text>
                </TouchableOpacity>
                
                <View className='flex flex-row items-center'>
                    <View className='flex-1 h-[3px] bg-gray-300/70 ml-8'></View>
                    <View>
                        <Text className='w-auto p-3 text-center text-gray-500/70'>Or Continue with Google</Text>
                    </View>
                    <View className='flex-1 h-[3px] bg-gray-300/70 mr-8'></View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        console.log('Google')
                    }}
                    
                    className='h-14 w-3/5 border-2 border-rose-800 flex justify-center items-center rounded-lg '
                    >
                    <Text className='text-rose-800 font-bold text-xl'>Google</Text>
                </TouchableOpacity>
                <Text className='w-full text-center'>Don't have an account? <Text className='underline' onPress={() => navigation.navigate('SignUp')}
                >Sign up now!</Text></Text>
            </View>
        </View>
  )
}

export default SignIn