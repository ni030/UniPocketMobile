import React from 'react'
import { Text } from 'react-native';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return (
    <Text className='w-full text-left px-12 -top-2 text-red-500'>{message}</Text>
  )
}

