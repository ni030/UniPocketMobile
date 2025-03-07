import { useNavigation } from '@react-navigation/native';
import Loader from 'components/Loader';
import React, { useState } from 'react';
import { Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { resetPassword } from 'services/usersServices';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handleNext = async () => {
    if (!email) {
      ToastAndroid.show('Please enter your email', ToastAndroid.SHORT);
    } else {
      setLoading(true);
      try {
        const result = await resetPassword(email);
        if (result instanceof Error) {
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Password reset email sent! Check your email.', ToastAndroid.SHORT);
          navigation.navigate('SignIn');
        }
        setLoading(false);
      } catch (error) {
        ToastAndroid.show('Password reset failed', ToastAndroid.SHORT);
        setLoading(false);
      }
    }
  };

  return (
    <View className="flex h-full w-full items-center justify-start">
      {loading && <Loader />}
      <View className="flex h-1/6 w-full justify-end bg-rose-800">
        <Text className="px-12 py-5 text-4xl font-semibold text-white">Reset Password</Text>
      </View>
      <View className="flex h-auto w-full items-center justify-center px-12 py-16">
        <Text className="h-auto w-full p-1 text-left text-sm text-gray-500 ">
          Enter your email address to reset your password
        </Text>
        <TextInput
          editable
          maxLength={50}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          className="h-auto w-full rounded-sm border-b-2 border-b-gray-400 bg-transparent text-lg text-black"
        />
        {!isEmailValid && (
          <Text className="w-full py-2 text-left text-red-500">Please enter a valid Email</Text>
        )}
      </View>
      <View className="m-3 flex h-auto w-full items-center justify-center">
        <TouchableOpacity
          onPress={handleNext}
          className="flex h-14 min-w-[180] items-center justify-center rounded-xl bg-rose-800 ">
          <Text className="text-lg font-semibold text-white">Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;
