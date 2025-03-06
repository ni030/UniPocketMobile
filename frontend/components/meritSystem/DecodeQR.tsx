import React, { useState } from 'react';
import { SafeAreaView, Alert, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
// import { recordMerit } from '../../services/manageMerit';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const DecodeQR = ({userId}) => {
  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      // Request permission to access the gallery
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'You need to grant media library permissions to pick an image.');
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
          const [eventData] = JSON.parse(scannedData);
          let result = await recordMerit(userId, eventData);
          if(result == "success"){
            ToastAndroid.show(`Merit successfully recorded!`, ToastAndroid.LONG);
            navigation.navigate('index');
          }else if(result == "found"){
            ToastAndroid.show("Fail to record. Merit already recorded!", ToastAndroid.LONG);
          }
          
        } else {
          Alert.alert('Error', 'No QR code detected in the selected image.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to scan the QR code from the selected image.');
    }
  };

  return (
    <SafeAreaView className="w-1/2 mx-auto pb-8 bottom-12">
      <Button textColor='white' buttonColor='rgba(0,0,0,0.5)' icon="image" onPress={pickImage} className="p-1"> Scan from photo</Button>
    </SafeAreaView>
  );
};

export default DecodeQR;
