import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ToastAndroid, ActivityIndicator, DrawerLayoutAndroid, Linking } from 'react-native';
import { GestureHandlerRootView, Pressable, TextInput } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAllFacilities } from 'services/facilitiesServices';

const FacilityIndex = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [chosenDestination, setChosenDestination] = useState<string>();
  const [facilities, setFacilities] = useState<any[]>([]);
  // Drawer
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const mapRef = useRef<MapView>(null);

  const handleDrawerOpenClose = useCallback(() => {
    if (drawer.current) {
      drawer.current.openDrawer();
      sheetRef.current?.close();
    }
  }, []);

  // Map
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
      
      // Load facilities data
      const { data } = await getAllFacilities();
      setFacilities(sortFacilitiesClosestToUser(data));
      setChosenDestination('');
      setSearchWord('');
      setLoading(false);
    })();
  }, []);

  const sortFacilitiesClosestToUser = (facilities: any[]) => {
    if (location) {
      return facilities.sort((a, b) => {
        const aDistance = Math.sqrt(
          Math.pow(location.latitude - a.location.lat, 2) +
          Math.pow(location.longitude - a.location.lng, 2)
        );
        const bDistance = Math.sqrt(
          Math.pow(location.latitude - b.location.lat, 2) +
          Math.pow(location.longitude - b.location.lng, 2)
        );
        return aDistance - bDistance;
      });
    }
    return facilities;
  };

  const handleSearch = useCallback((text: string) => {
    setSearchWord(text);
    getAllFacilities().then(({ data }) => {
      const filteredFacilities = data.filter((facility: any) =>
        facility.name.toLowerCase().includes(text.toLowerCase())
      );
      setFacilities(filteredFacilities);
      if (text) {
        sheetRef.current?.snapToIndex(3);
      } else {
        sheetRef.current?.snapToIndex(1);
      }
    });
  }, [facilities]);

  const filterFacilities = useCallback((type: string) => {
    getAllFacilities().then(({ data }) => {
      const filteredFacilities = data.filter((facility: any) => facility.type === type);
      setFacilities(filteredFacilities);
      sheetRef.current?.snapToIndex(3);
    });
  }, [facilities]);

  const clearFilter = useCallback(() => {
    getAllFacilities().then(({ data }) => {
      setFacilities(data);
      sheetRef.current?.snapToIndex(3);
    });
  }, [facilities]);

  const setDestinationMarker = useCallback((name: string, latitude: number, longitude: number) => {
    console.log(`Setting destination: ${name}, ${latitude}, ${longitude}`);
    setChosenDestination(`${name},${latitude},${longitude}`);
    sheetRef.current?.snapToIndex(1);
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01, // Zoom in more detail
      longitudeDelta: 0.01, // Zoom in more detail
    }, 1000); // Duration of the animation in milliseconds
  }, []);

  //navigate to the specific location with google maps
  const navigateToLocation = useCallback((latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  }, []);

  // Bottom Sheet
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "25%", "50%", "90%"], []);

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
            ref={mapRef}
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
            {/* {location && (
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="Your Location"
              />
            )} */}
            {chosenDestination && (
                <Marker
                coordinate={{
                  latitude: parseFloat(chosenDestination.split(',')[1]),
                  longitude: parseFloat(chosenDestination.split(',')[2]),
                }}
                title={chosenDestination.split(',')[0]}
                pinColor="red" 
                onPress={() => navigateToLocation(parseFloat(chosenDestination.split(',')[1]), parseFloat(chosenDestination.split(',')[2]))}
              />
            )}
          </MapView>
          <View className='w-full h-auto my-8 flex flex-row justify-center items-center gap-6'>
            <View className='w-3/4 h-auto border border-black/30 px-4 py-1 rounded-full bg-white/75'>
              <TextInput
                className='w-4/5 h-auto'
                placeholder='Search facilities'
                value={searchWord}
                onChangeText={handleSearch}
              />
            </View>

          </View>

          {/* Bottom Sheet */}
          <BottomSheet
            ref={sheetRef}
            index={1} // Set the initial index to 1
            snapPoints={snapPoints}
          >
            <BottomSheetScrollView contentContainerStyle={{ backgroundColor: "white", bottom: 20 }}>
              <View className='h-auto w-full flex justify-center items-center gap-3 p-8 my-4'>
                <Text className='w-full p-2 text-gray-700'>Facilities close to you </Text>
                <View className='w-full h-auto px-2 flex flex-row justify-start items-center gap-1'>
                  <Text className='text-base'>Filter</Text>
                  <Pressable onPress={clearFilter}><Text className='text-sm text-gray-400 underline'>Clear</Text></Pressable>
                </View>
                <View className='w-full h-auto px-2 flex flex-row justify-start items-center gap-2'>
                <Pressable onPress={() => filterFacilities("Rubbish Bin")}>
                  <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                    <Ionicons name="trash-bin" size={14} color="black" />
                    <Text className='text-sm'>Rubbish Bin</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => filterFacilities("Water Dispenser")}>
                  <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                    <Ionicons name="water" size={14} color="black" />
                    <Text className='text-sm'>Water Dispenser</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => filterFacilities("Others")}>
                  <View className='w-full h-auto flex flex-row justify-start items-center gap-2'>
                    <Ionicons name="bag" size={14} color="black" />
                    <Text className='text-sm'>Others</Text>
                  </View>
                </Pressable>
                </View>
                {facilities.map((facility: { name: string; type: "Rubbish Bin" | "Water Dispenser" | "Others"; location: { lat: number; lng: number } }, index) => {
                  const icon = {
                    "Rubbish Bin": "trash-bin",
                    "Water Dispenser": "water",
                    "Others": "bag"
                  }[facility.type];
                  return (
                    <Pressable key={index} onPress={() => setDestinationMarker(facility.name, facility.location.lat, facility.location.lng)}>
                      <View className='w-full h-auto border rounded-lg border-black/30 p-4 flex flex-row justify-between items-center gap-4'>
                        <View className='w-4/5 h-auto flex flex-row justify-start items-center gap-2'>
                          <Ionicons name={icon} size={14} color="black" />
                          <Text className='text-sm'>{facility.name}</Text>
                        </View>
                        <MaterialIcons name="directions" size={24} color="black" />
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      )}
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