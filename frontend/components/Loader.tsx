import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => {
  return (
    <View className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white/50 z-50'>
      <ActivityIndicator size='large' color='#9F1239' />
    </View>
  );
};

export default Loader;