import React, { useState } from 'react'
import { Text, ToastAndroid, TouchableOpacity, View, TextInput } from 'react-native'
import { InputField } from '../../components/InputField'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ErrorMessage } from 'components/ErrorMessage';
import { Picker } from '@react-native-picker/picker';
import { signUpUser } from 'services/userServices';
import { useNavigation } from '@react-navigation/native';
import Loader from 'components/Loader';

const SignUp = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [phoneNum, setPhoneNum] = useState<string>('')
    const [block, setBlock] = useState<string>('Block A')
    const [room, setRoom] = useState<string>('')
    
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const Navigation = useNavigation<any>()

    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<boolean>(true);
    const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(true);
    const [isRoomValid, setIsRoomValid] = useState<boolean>(true);

    const [isNext, setIsNext] = useState<boolean>(false);

    const handleEmailChange = (email: string) => {
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    };

    const handlePasswordChange = (password: string) => {
        setPassword(password);
        setIsPasswordValid(validatePassword(password));
    }

    const handleConfirmPasswordChange = (confirmPassword: string) => {
        setConfirmPassword(confirmPassword);
        setIsConfirmPasswordValid(validateConfirmPassword(password, confirmPassword));
    }

    const handlePhoneNumChange = (phoneNum: string) => {
        setPhoneNum(phoneNum);
        setIsPhoneNumValid(validatePhoneNumber(phoneNum));
    }

    const handleRoomChange = (room: string) => {
        setRoom(room);
        setIsRoomValid(validateRoom(room));
    }

    const handleNext = () => {
        if (email && password && confirmPassword &&  isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            setIsNext(true);
            setPage(2);
        }else{
            ToastAndroid.show('Please fill in all fields correctly.', ToastAndroid.SHORT);
        }
    }
    
    const handleSubmit = async () => {
        if (isNext && name && phoneNum && block && room && isPhoneNumValid && isRoomValid) {
            setLoading(true);
            try{
                const result = await signUpUser(email, password, name, phoneNum, block, room);
                setLoading(false);
                // if(result === 'User already exists'){
                //     ToastAndroid.show('User already exists.', ToastAndroid.SHORT);
                // }else{
                //     ToastAndroid.show('Sign up successful! Please verify your email.', ToastAndroid.SHORT);
                //     Navigation.navigate('SignIn')
                // }
                console.log(result)
            }catch(error){
                setLoading(false);
                ToastAndroid.show('An error occurred.', ToastAndroid.SHORT);
            }
        }else{
            ToastAndroid.show('Please fill in all fields correctly.', ToastAndroid.SHORT);
            
        }
    }


    // Validation functions
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    const validatePhoneNumber = (phoneNum: string) => {
        const phoneNumRegex = /^\d{9,10}$/;
        return phoneNumRegex.test(phoneNum);
    }

    const validateRoom = (room: string) => {
        const roomRegex = /^\d{3}$/;
        return roomRegex.test(room);
    }
    
    return (
        <View className='h-full w-full flex justify-start items-center'>
            {loading && (
                <Loader />
             )}
            <View className='h-1/6 w-full bg-rose-800 flex justify-end'>
                <View><Text className='text-4xl px-14 py-3 font-bold text-white'>Sign Up</Text></View>
            </View>
            <View className='h-auto m-6 p-6 w-full justify-center items-center flex flex-row gap-2'>
                <FontAwesome name="circle" size={10} color={page === 1 ? "#9f1239" : "#cbd5e1"} />
                <FontAwesome name="circle" size={10} color={page === 2 ? "#9f1239" : "#cbd5e1"} />
            </View>
            {page === 1 ? (
                <>
                <View className='h-auto w-full flex justify-center items-center'>
                    <InputField 
                        placeholder='Email'
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                    {!isEmailValid &&  
                        <ErrorMessage
                            message="Please enter a valid email address." 
                        />}
                    <InputField 
                        placeholder='Password'
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    {!isPasswordValid &&  
                        <ErrorMessage
                            message="Password must contain at least 8 characters, one letter, one number and one special character." 
                        />}
                    <InputField
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />
                    {!isConfirmPasswordValid &&  
                        <ErrorMessage
                            message="Passwords do not match." 
                        />}
                </View>
                <View className='h-1/6 w-full flex justify-center items-center my-5'>
                    <TouchableOpacity
                        onPress={handleNext}
                        className='h-14 w-3/5 bg-rose-800 flex justify-center items-center rounded-lg '
                        >
                        <Text className='text-white font-bold text-xl'>Next</Text>
                    </TouchableOpacity>
                    
                    {/* <View className='flex flex-row items-center'>
                        <View className='flex-1 h-[3px] bg-gray-300/70 ml-8'></View>
                        <View>
                            <Text className='w-auto p-3 text-center text-gray-500/70'>Or Sign Up with Google</Text>
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
                    </TouchableOpacity> */}
                </View>
                </>
                ) : (
                    <>
                    <View className='h-auto w-full flex justify-center items-center'>
                        <InputField 
                            placeholder='Name'
                            value={name}
                            onChangeText={setName}
                        />
                        <View className='h-auto w-screen px-12 flex flex-row justify-start items-center '>
                            <Text className='text-lg text-white font-semibold text-center p-3 bg-rose-800'>+60</Text>
                            <TextInput
                                placeholder='Phone Number'
                                keyboardType='numeric'
                                value={phoneNum}
                                maxLength={10}
                                onChangeText={handlePhoneNumChange}
                                className='h-auto w-5/6 my-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                            />
                        </View>
                        {!isPhoneNumValid &&  
                            <ErrorMessage
                                message="Please enter a valid phone number." 
                            />}
                        <View className='h-auto w-full px-12 my-5'>
                            <Picker
                                style={{ height: 50, backgroundColor: 'white', width: '100%', borderBottomWidth: 2, borderBottomColor: '#9F1239' }}
                                selectedValue={block}
                                onValueChange={(itemValue, itemIndex) =>
                                    setBlock(itemValue)
                                }>
                                
                                <Picker.Item label="Block A" value="Block A" />
                                <Picker.Item label="Block B" value="Block B" />
                                <Picker.Item label="Block C" value="Block C" />
                                <Picker.Item label="Block D" value="Block D" />
                                <Picker.Item label="Block E" value="Block E" />
                            </Picker>
                        </View>
                        <TextInput
                            placeholder='Room Number'
                            keyboardType='numeric'
                            value={room}
                            maxLength={3}
                            onChangeText={handleRoomChange}
                            className='h-auto w-4/5 my-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                        />
                        {!isRoomValid &&  
                            <ErrorMessage
                                message="Please enter a three-digit room number." 
                            />
                        }
                    </View>
                    <View className='h-auto w-full flex justify-center items-center my-5'>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            
                            className='h-14 w-3/5 bg-rose-800 flex justify-center items-center rounded-lg '
                            >
                            <Text className='text-white font-bold text-xl'>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    </>
                )
            }

        </View>
    
        )
}

export default SignUp