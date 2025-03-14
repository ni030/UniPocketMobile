import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
// import DecodeQR from '../../components/ktdi-merit/DecodeQR';
import { useNavigation } from '@react-navigation/native';
import DecodeQR from 'components/meritSystem/DecodeQR';
import { checkExistingById, recordMerit, getMeritById } from 'services/meritServices';

const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const navigation = useNavigation<any>(); 
  const [event, setEvent] = useState<any>({
    eventId: "5231123",
    eventName: "running 100m",
    date: "30/10/2021",
    role:"Participant",
    category:"Sport",
  });

  // Request camera permissions
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
  
    getCameraPermissions();
  }, []);

  const handleScanSuccess = async ({ type, data }: { type: string; data: string }) => {
    // setScanned(true);
    // try {
    //   const [eventData] = JSON.parse(data);
    //   const result = await recordMerit(eventData);
    //   console.log(result);
    //   if (result === "success") {
    //     ToastAndroid.show("Merit successfully recorded!", ToastAndroid.LONG);
    //     setScanned(false);
    //     navigation.navigate('index');
    //   }else if(result == "found"){
    //     ToastAndroid.show("Fail to record. Merit already recorded!", ToastAndroid.LONG);
    //     setScanned(false);
    //   }
    // } catch (error) {
    //   ToastAndroid.show("Failed to process QR code.", ToastAndroid.LONG);
    //   setScanned(false);
    // }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleTest = async () => {
    try {
      const result = await recordMerit(event);
      if( result == 200){
        ToastAndroid.show("Merit successfully recorded!", ToastAndroid.LONG);
        navigation.navigate('MeritIndex');
      }else if(result == "founded"){
        ToastAndroid.show("Fail to record. Merit already recorded!", ToastAndroid.LONG)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 justify-end">
      <TouchableOpacity
        onPress={handleTest}
        className="absolute top-0 left-0 p-4"
      >
        <Text className='text-black'>Check Existing</Text>
      </TouchableOpacity>
      {/* <CameraView
        onBarcodeScanned={scanned ? undefined : handleScanSuccess}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'], 
        }}
        style={StyleSheet.absoluteFillObject}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-52 h-52 border-4 border-white bg-transparent" />
        </View>
      </CameraView> */}
      <View className="absolute w-1.2 h-2 border bg-slate-500"></View>

      {/* <DecodeQR userId={""}/> */}
    </View>
  );
};

export default ScanQRCode;
