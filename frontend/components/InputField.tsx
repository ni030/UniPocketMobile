import React from 'react';
import { TextInput, View } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder, value, onChangeText }) => {
  return (
    <View className='h-auto w-full flex justify-center items-center'>
      <TextInput
        editable
        multiline
        numberOfLines={2}
        maxLength={50}
        value={value}
        onChangeText={onChangeText}
        placeholder= {placeholder}
        className='h-auto w-4/5 m-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
      />
    </View>
  );
};