import { InputField } from 'components/InputField';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { signInUser } from 'services/usersServices';
import { ErrorMessage } from 'components/ErrorMessage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Loader from 'components/Loader';
import { auth, checkUserSession } from "../../backendP/firebaseConfig"
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Check for user session on app load
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userSession");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      checkUserSession(setUser);
      setLoading(false);
    };

    loadUser();
  }, []);

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleSignIn = async () => {
    setLoading(true);
    if (email && password) {
      setLoading(false);
      try {
        const result = await signInUser(email, password);
        setLoading(false);
        if (result instanceof Error) {
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Sign In Successful', ToastAndroid.SHORT);
          navigation.navigate('MainApp');
        }
      } catch (error) {
        setLoading(false);
        ToastAndroid.show('Sign In Failed', ToastAndroid.SHORT);
      }
    }
  };

// const { promptAsync, request } = useGoogleAuth();

// const handleGoogleSignIn = async () => {
//   try {
//     if (!request) {
//       console.error('Request object is null or undefined');
//       return;
//     }

//     const user = await signInWithGoogle(promptAsync);
//     if (user) {
//       ToastAndroid.show('Google Sign In Successful', ToastAndroid.SHORT);
//       // navigation.navigate('MainApp');
//     }
//   } catch (error) {
//     console.error('Error during Google Sign In:', error);
//     ToastAndroid.show('Google Sign In Failed', ToastAndroid.SHORT);
//   }
// };

  return (
    <View className="flex h-full w-full items-center justify-start ">
      {loading && <Loader />}
      <View className="flex h-1/6 w-full justify-end bg-rose-800">
        <View>
          <Text className="px-14 py-3 text-4xl font-bold text-white">Sign In</Text>
        </View>
      </View>
      <View className="my-16 flex h-auto w-full items-center justify-center">
        <Text className="mb-10 w-full px-12 text-left text-3xl font-semibold text-rose-800 ">
          <FontAwesome5 name="university" size={29} color="#9F1239" /> Welcome to UniPocket
        </Text>
        <InputField placeholder="Email" value={email} onChangeText={handleEmailChange} />
        {!isEmailValid && <ErrorMessage message="Please enter a valid email address." />}
        <View className="m-5 flex h-auto w-4/5 flex-row items-center justify-center rounded-sm border-b-2 border-b-gray-400 bg-white px-4 text-black">
          <TextInput
            className="h-auto flex-1 text-lg"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <Text
          className="w-full px-12 underline"
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Your Password?
        </Text>
      </View>
      <View className="flex h-auto w-full items-center justify-center gap-5">
        <TouchableOpacity
          onPress={handleSignIn}
          className="flex h-14 w-3/5 items-center justify-center rounded-lg bg-rose-800 ">
          <Text className="text-xl font-bold text-white">Login</Text>
        </TouchableOpacity>

        {/* <View className="flex flex-row items-center">
          <View className="ml-8 h-[3px] flex-1 bg-gray-300/70"></View>
          <View>
            <Text className="w-auto p-3 text-center text-gray-500/70">Or Continue with Google</Text>
          </View>
          <View className="mr-8 h-[3px] flex-1 bg-gray-300/70"></View>
        </View>
        <TouchableOpacity
          onPress={handleGoogleSignIn}
          className="flex h-14 w-3/5 items-center justify-center rounded-lg border-2 border-rose-800 ">
          <Text className="text-xl font-bold text-rose-800">Google</Text>
        </TouchableOpacity> */}
        <Text className="w-full text-center">
          Don't have an account?{' '}
          <Text className="underline" onPress={() => navigation.navigate('SignUp')}>
            Sign up now!
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
