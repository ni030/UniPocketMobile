import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RouteProp } from '@react-navigation/native';
import { getUserDetails } from 'services/usersServices';
import { getComplaint, updateRating, updateStatus } from 'services/complaintsServices';
import Loader from 'components/Loader';

type RouteParams = {
  params: {
    complaintId: string;
  };
};

const ReportFeedback = () => {
  const route = useRoute<RouteProp<RouteParams>>();
  const { complaintId } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const [userData, setUserData] = useState({
    name: '',
    phoneNum: '',
    email: '',
    block: '',
    room: '',
  });

  const [complaintData, setComplaintData] = useState({
    date: '',
    type: '',
    description: '',
    image: '',
    status: '',
    rating: 0,
  });

  const [rating, setRating] = useState<number>(0);

  const [personalDetailsExpanded, setPersonalDetailsExpanded] = useState<boolean>(true);
  const [reportDetailsExpanded, setReportDetailsExpanded] = useState<boolean>(true);
  const [cancelAvaliable, setCancelAvaliable] = useState<boolean>(false);
  const [completeAvaliable, setCompleteAvaliable] = useState<boolean>(true);
  const [modalRatingVisible, setModalRatingVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false); 

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data: userData } = await getUserDetails();
        setUserData(userData);

        const { data: complaintData } = await getComplaint(complaintId);
        complaintData.date = formatDate(new Date(complaintData.date));
        setComplaintData(complaintData);
        trackStatus(complaintData.status);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    const formatDate = (date: Date | null) => {
      if (!date) return 'DD/MM/YYYY';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const trackStatus = (status: string) => {
      switch (status) {
        case 'Received':
          setCancelAvaliable(true);
          setCompleteAvaliable(false);
          break;
        case 'In-progress':
          setCancelAvaliable(false);
          setCompleteAvaliable(true);
          break;
        case 'Completed':
          setCancelAvaliable(false);
          setCompleteAvaliable(false);
          break;
        default:
          setCancelAvaliable(false);
          setCompleteAvaliable(false);
          break;
      }
    };

    loadData();
  }, [complaintId, refresh]); 

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e:any) => {
      e.preventDefault();
      navigation.navigate('MainApp', { screen: 'Report' });
    });

    return unsubscribe;
  }, [navigation]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Pressable onPress={() => setRating(i + 1)} key={i}><AntDesign name="star" size={28} color="#9f1239" /></Pressable>);
      } else {
        stars.push(<Pressable onPress={() => setRating(i + 1)} key={i}><AntDesign name="staro" size={28} color="#9f1239" /></Pressable>);
      }
    }
    return stars;
  };

  const handleCancel = async() => {
    try{
        const response = await updateStatus(complaintId, 'Cancelled');
        if(response.status === 200){
            ToastAndroid.show('Complaint cancelled successfully', ToastAndroid.SHORT);
            setRefresh(!refresh);
            navigation.navigate('MainApp', { screen: 'Report' });
        }
    }catch(error){
        ToastAndroid.show('Failed to cancel complaint', ToastAndroid.SHORT);
    }
  };

  const handleComplete = async() => {
    try{
        const response = await updateStatus(complaintId, 'Completed');
        if(response.status === 200){
            ToastAndroid.show('Complaint completed successfully', ToastAndroid.SHORT);
            setModalRatingVisible(true);
            setRefresh(!refresh); 
        }
    }catch(error){
        ToastAndroid.show('Failed to complete complaint', ToastAndroid.SHORT);
    }
  };

  const handleSubmitRating = async() => {
    try{
        if(rating > 0){
            await updateRating(complaintId, rating);
            ToastAndroid.show('Rating submitted successfully', ToastAndroid.SHORT);
            setModalRatingVisible(false);
            navigation.navigate('MainApp', { screen: 'Report' });
        }
    }catch(error){
        ToastAndroid.show('Failed to submit rating', ToastAndroid.SHORT);
    }
  }

  const handleCloseRatingModal = () => {
        setModalRatingVisible(false);
        navigation.navigate('MainApp', { screen: 'Report' });
  };

  const getColor = (status: string, index: number) => {
    if (status === 'Received' && index === 0) return '#4ade80';
    if (status === 'In-progress' && index <= 2) return '#4ade80';
    if (status === 'Completed') return '#4ade80';
    return 'rgba(209,213,219, 0.7)';
  };

  return (
    <View className='w-full h-full bg-gray-100 flex justify-start items-center p-4'>
      {loading && (
        <Loader />
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalRatingVisible}
        onRequestClose={() => {
          setModalRatingVisible(!modalRatingVisible);
        }}>
        <View className='h-full w-full flex justify-center items-center bg-gray-100/70'>
          <View className='h-auto w-4/5 flex justify-center items-start gap-3 bg-white rounded-lg p-8'>
            <View className='f-1/6 w-full p-2 flex flex-row justify-between items-center'>
              <Text className='text-2xl font-semibold'>Rating</Text>
              <Pressable
                onPress={handleCloseRatingModal}>
                <FontAwesome6 name="xmark" size={18} color="black" />
              </Pressable>
            </View>
            <View className='h-auto w-full p-3 flex flex-row justify-center items-center gap-4'>
              {renderStars(rating)}
            </View>
            <TouchableOpacity className='h-auto w-full bg-rose-800 rounded-lg p-3' onPress={handleSubmitRating}>
              <Text className='text-white text-center font-bold'>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View className='w-full h-1/5 bg-white rounded-xl flex justify-start items-center p-4 border-2 border-gray-200 my-3'>
        <Text className='font-medium text-xl text-center m-3'>Report Tracking</Text>
        <View className='w-4/5 h-auto flex flex-row justify-center my-6 items-center gap-2'>
          <View>
            <FontAwesome5 name="envelope-open" size={28} color={getColor(complaintData.status, 0)} />
          </View>
          <View className={`flex-1 h-[3px] ${complaintData.status === 'In-progress' || complaintData.status === 'Completed' ? 'bg-green-400' : 'bg-gray-300/70'}`}></View>
          <View>
            <Ionicons name="build-outline" size={32} color={getColor(complaintData.status, 2)} />
          </View>
          <View className={`flex-1 h-[3px] ${complaintData.status === 'Completed' ? 'bg-green-400' : 'bg-gray-300/70'}`}></View>
          <View>
            <Ionicons name="checkmark-done-circle-outline" size={36} color={getColor(complaintData.status, 4)} />
          </View>
        </View>
      </View>
      <ScrollView className='w-full h-3/5 bg-white rounded-xl border-2 border-gray-200 p-8 mb-12'>
        <Text className='w-full text-lg font-medium'>Details</Text>
        <View className='w-full h-auto my-2 flex justify-start items-left'>
          <TouchableOpacity
            className='w-full h-auto px-6 py-4 flex flex-row justify-between bg-gray-100 rounded-lg'
            onPress={() => setPersonalDetailsExpanded(!personalDetailsExpanded)}
          >
            <Text className='text-lg font-semibold'>Personal Details</Text>
            <FontAwesome
              name={personalDetailsExpanded ? 'angle-up' : 'angle-down'}
              size={20}
              color='gray'
            />
          </TouchableOpacity>
          {personalDetailsExpanded && (
            <View className='w-full h-auto flex gap-3 px-6 py-4'>
              <Text>Name: {userData.name}</Text>
              <Text>Phone Num: +60{userData.phoneNum}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Address: {userData.room}/{userData.block}</Text>
            </View>
          )}
        </View>
        <View className='w-full h-auto my-2 flex justify-start items-left'>
          <TouchableOpacity
            className='w-full h-auto px-6 py-4 flex flex-row justify-between bg-gray-100 rounded-lg'
            onPress={() => setReportDetailsExpanded(!reportDetailsExpanded)}
          >
            <Text className='text-lg font-semibold'>Report Details</Text>
            <FontAwesome
              name={reportDetailsExpanded ? 'angle-up' : 'angle-down'}
              size={20}
              color='gray'
            />
          </TouchableOpacity>
          {reportDetailsExpanded && (
            <View className='w-full h-auto flex gap-3 px-6 py-4'>
              <Text>Date: {complaintData.date}</Text>
              <Text>Type: {complaintData.type}</Text>
              <View>
                <Text>Description: </Text>
                <Text>{complaintData.description}</Text>
              </View>
              <Text>Image: </Text>
              <View className='w-full h-auto flex justify-center items-center'>
                {complaintData.image && (
                  <Image
                    source={{ uri: complaintData.image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
            </View>
          )}
          <View className='w-full h-auto p-2 flex flex-row justify-center items-center gap-3 mb-10'>
            <TouchableOpacity className={`h-auto w-1/2 rounded-lg ${cancelAvaliable ? 'bg-rose-800' : 'bg-gray-300'}`} disabled={!cancelAvaliable} onPress={handleCancel}>
              <Text className='text-white p-3 font-bold text-center'>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`h-auto w-1/2 rounded-lg ${completeAvaliable ? 'bg-rose-800' : 'bg-gray-300'}`} onPress={handleComplete} disabled={!completeAvaliable}>
              <Text className='text-white p-3 font-bold text-center'>Complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportFeedback;