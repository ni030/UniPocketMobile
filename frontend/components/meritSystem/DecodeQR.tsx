import React, { useState } from 'react';
import { SafeAreaView, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
// import { recordMerit } from '../../services/manageMerit';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { recordMerit } from 'services/meritServices';

const DecodeQR = () => {
  const navigation = useNavigation<any>(); 

  const pickImage = async () => {
    try {
      // Request permission to access the gallery
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show("Permission to access the gallery is required.", ToastAndroid.LONG);
        return;
      }

      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const { uri } = result.assets[0];
        // Scan the selected image for QR code
        let scannedResult = await Camera.scanFromURLAsync(uri);
        if (scannedResult.length > 0) {
          const scannedData = scannedResult[0].data;
          const event = JSON.parse(scannedData);
          const result = await recordMerit(event);
          if( result == 200){
            ToastAndroid.show("Merit successfully recorded!", ToastAndroid.LONG);
            navigation.navigate('MeritIndex');
          }else if(result == "founded"){
            ToastAndroid.show("Fail to record. Merit already recorded!", ToastAndroid.LONG)
          }
          
        } else {
          ToastAndroid.show("No QR code found in the selected image.", ToastAndroid.LONG);
        }
      }
    } catch (error) {
      ToastAndroid.show("Failed to pick an image.", ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView className="w-1/2 mx-auto pb-8 bottom-12">
      <Button textColor='white' buttonColor='rgba(0,0,0,0.5)' icon="image" onPress={pickImage} className="p-1"> Scan from photo</Button>
    </SafeAreaView>
  );
};

export default DecodeQR;
