import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ImageSourcePropType, Image, TouchableOpacity, Text } from 'react-native';
import { ImageSlider } from 'react-native-image-slider-banner';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getMeritById } from 'services/meritServices';
import Loader from 'components/Loader';

const Home = () => {
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState(false);
    const [totalMerit, setTotalMerit] = useState(0);

    const loadData = async () => {
        setLoading(true);
        const { data } = await getMeritById();
        if(data == "null"){
          setTotalMerit(0);
        }else{
  
          setTotalMerit(data.totalMerits);
        }
        setLoading(false);

      };
      
      useFocusEffect(
        useCallback(() => {
          loadData();
        }, [])
      );

  return (
    <ScrollView className='h-full w-full bg-white'>
      { loading && <Loader /> }
      <View className='rounded-xl w-full' >
        <ImageSlider 
          data={[
            { img: Image.resolveAssetSource(require('../images/UTM-image.jpg')).uri as ImageSourcePropType },
            { img: Image.resolveAssetSource(require('../images/KTDI-1.jpg')).uri as ImageSourcePropType},
            { img: Image.resolveAssetSource(require('../images/KTDI-2.jpg')).uri as ImageSourcePropType},
            { img: Image.resolveAssetSource(require('../images/KTDI-3.jpg')).uri as ImageSourcePropType},
          ]}
          autoPlay={true} // Enable auto play for testing
          timer={3000} // Slide every 3 seconds
          preview={false}
          caroselImageStyle={{ resizeMode: 'cover' }}
          activeIndicatorStyle={{ backgroundColor: '#fff' }}
        />
      </View>
      <View className='h-1/5 w-full px-10 py-4 flex flex-row justify-start items-center gap-8 bg-gray-200'>
        <View className='flex justify-center items-center'>
          <TouchableOpacity className='p-4 bg-rose-800 rounded-full' onPress={() => navigation.navigate('ScanQRCode')}>
            <MaterialCommunityIcons name="qrcode-scan" size={32} color="#fff" />
          </TouchableOpacity>
          <Text className='text-sm font-medium text-rose-800'>Scan Merit</Text>
        </View>
        <View className='flex justify-center items-center'>
          <TouchableOpacity className='p-4 bg-rose-800 rounded-full' onPress={() => navigation.navigate('ReportForm')}>
          <Entypo name="add-to-list"size={32} color="#fff" />
          </TouchableOpacity>
          <Text className='text-sm font-medium text-rose-800'>Report Facility</Text>
        </View>
        <View className='flex justify-center items-center'>
          <TouchableOpacity className='p-4 bg-rose-800 rounded-full' onPress={() => navigation.navigate('FacilityIndex')}>
          <AntDesign name="find"size={32} color="#fff" />
          </TouchableOpacity>
          <Text className='text-sm font-medium text-rose-800'>Search Facility</Text>
        </View>
      </View>
      <View className='w-full h-auto flex p-4'>
          <TouchableOpacity className='w-full h-auto bg-rose-800 flex flex-row justify-between px-8 py-1 items-center rounded-xl' onPress={() => navigation.navigate('MeritIndex')}>
            <View className='h-auto w-1/4 '>
              <View className='h-[70] w-[70] p-4 bottom-1 flex justify-center items-center rounded-full bg-rose-500'>
                <FontAwesome5 name="award" size={48} color="white" />
              </View>
            </View>
            <View className='w-2/3 h-auto flex justify-center items-left py-4 '>
              <Text className='text-xl font-semibold text-white'>Your total merit</Text>
              <View className='flex flex-row justify-start items-center'>
                <Text className='text-4xl font-bold text-white my-2'>{totalMerit} </Text>
                <Text className='text-lg font-bold text-white'>mark(s)</Text>
              </View>
              {/* <Text className='text-sm text-gray-50 '>View details of merit marks</Text> */}
            </View>
            <View >
              <FontAwesome
                  name={"angle-right"}
                  size={28}
                  color="#ffffff"
              />
            </View>
          </TouchableOpacity>
          <View className='h-auto w-full my-4'>
            <View className='h-[2px] w-full bg-gray-200 '></View>
            <Text className='p-3 text-gray-500 font-semibold'>Reminder</Text>
            <Text className='text-sm text-gray-400 text-center p-4'>There are no reminders at the moment.</Text>
          </View>
      </View>
    </ScrollView>
  );
};


export default Home;
