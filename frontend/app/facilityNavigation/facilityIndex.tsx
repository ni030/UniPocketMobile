import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ToastAndroid, ActivityIndicator, DrawerLayoutAndroid } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const FacilityIndex = () => {
  const [loading, setLoading] = useState<boolean>(false)
  
  //Drawer
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const handleDrawerOpenClose = useCallback(() => {
    if (drawer.current) {
      drawer.current.openDrawer();
      sheetRef.current?.close();
    }
  }, []);

  //Map
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Permission Denied! Location access is required for map functionality.', ToastAndroid.LONG);
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,

      });
      console.log("User Location: ", userLocation);
      setLoading(false);
    })();
  }, []);


  //Bottom Sheet
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%","25%", "50%", "90%"], []);


  // // Dummy data
  // const data = useMemo(
  //   () => Array(10).fill(0).map((_, index) => `Facility ${index + 1}`),
  //   []
  // );
  if(loading){}

  
  return (
    <GestureHandlerRootView className='flex-1'>
      {loading ? (
        <View className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white/50 z-50'>
          <ActivityIndicator size='large' color='#9F1239' />
        </View>
        ) : (
        <>
        {/* MapView covering the whole screen */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 3.139,
            longitude: location?.longitude || 101.6869,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}

          showsUserLocation
          showsMyLocationButton
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="Your Location"
            />
          )}

          {/* Sample marker for a facility
          <Marker
            coordinate={{ latitude: 3.139, longitude: 101.6869 }}
            title="Sample Facility"
            description="This is a sample facility location."
          /> */}
        </MapView>
        <View className='w-full h-auto p-8 mt-4 flex flex-row justify-center items-center gap-6'>
          <View className='w-4/5 h-auto border border-black/30 p-3 rounded-full bg-white/75 flex flex-row justify-between items-center gap-4'>
            <Text className='px-6'>Search</Text>
          </View>
          <AntDesign name="filter" size={28} color="rgba(0,0,0,0.7)" onPress={handleDrawerOpenClose} />
        </View>
        <DrawerLayoutAndroid
          ref={drawer}
          drawerWidth={150}
          drawerPosition={'right'}
          onDrawerClose={() => sheetRef.current?.snapToIndex(1)}
          renderNavigationView={() => (
            <View className='w-full h-full bg-white/5 p-8 flex justify-start items-start gap-4'>
              <Text className='text-lg font-semibold'>Filters</Text>
              <Text className='text-sm'>Filter by: </Text>
              <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                <Ionicons name="trash-bin" size={14} color="black" />
                <Text className='text-sm'>Rubbish Bin</Text>
              </View>
              <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                <Ionicons name="water" size={14} color="black" />
                <Text className='text-sm'>Water Dipenser</Text>
              </View>
              <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                <Ionicons name="bag" size={14} color="black" />
                <Text className='text-sm'>Others</Text>
              </View>
            </View>
          )}
        >
        </DrawerLayoutAndroid>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={sheetRef}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetScrollView contentContainerStyle={{backgroundColor: "white", bottom: 20}}>  
            <View className='h-auto w-full flex justify-center items-center gap-3 p-8 my-4'>
              <Text className='w-full p-2 text-gray-700'>Facilities close to you </Text>
              <View className='w-full h-auto p-6 bg-gray-200 rounded-xl flex flex-row justify-center items-center gap-2'>
                <View className='w-1/5 flex justify-center items-center'>
                  <Ionicons name="trash-bin" size={40} color="black" />
                </View>
                <View className='w-3/5'>
                  <Text className='font-semibold text-xl'>Facility Name</Text>
                  <Text className='text-sm'>Facility Address: {location?.latitude}</Text>
                </View>
                <View className='w-1/5 flex justify-center items-center'>
                  <MaterialIcons name="directions" size={28} color="gray" />
                </View>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </>)}
    </GestureHandlerRootView>
  );
};

// Get screen height for styling
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject, // Makes the map cover the whole screen
  }
});

export default FacilityIndex;
