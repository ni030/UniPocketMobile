import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { createComplaint } from 'services/complaintsServices';
import Loader from 'components/Loader';
import { getUserDetails } from 'services/usersServices';
import { useNavigation } from '@react-navigation/native';

const ReportForm = () => {
  const [loading, setLoading] = useState(false);
  const [personalDetailsExpanded, setPersonalDetailsExpanded] = useState(true);
  const navigation = useNavigation<any>();
  const [userData, setUserData] = useState({
    name: '',
    phoneNum: '',
    email: '',
    block: '',
    room: '',
  });

  const [date, setDate] = useState<Date | null>(null);
  const [type, setType] = useState('Electricity');
  const [description, setDescription] = useState('');
  const [reportImg, setReportImg] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Sorry, we need camera roll permissions to make this work!', ToastAndroid.SHORT);
      }
      const { data } = await getUserDetails();
      setUserData(data);
      setLoading(false);
    };
    loadData();
  }, []);


  const handleComplaintSubmit = async () => {
    try{
      if(date && type && description && reportImg) {
        setLoading(true);
        const res = await createComplaint(date, type, description, reportImg);
        if(res.status === 201) {
          const complaintId = res.data.id;
          ToastAndroid.show('Complaint submitted successfully', ToastAndroid.SHORT);
          navigation.navigate('ReportFeedback', { complaintId });
        }else{
          ToastAndroid.show('Failed to submit complaint', ToastAndroid.SHORT);
        }
        setLoading(false);
      } else {
        ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      }
    }catch(error){
      ToastAndroid.show('Failed to submit complaint', ToastAndroid.SHORT);
    }
  }

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'DD/MM/YYYY';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const imageBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;

      setReportImg(imageBase64);
    }
  };

  return (
    <View className='w-full h-full bg-white'>
      {loading && (
        <Loader/>
      )}
      <View className='h-1/6 w-full bg-red-800 flex justify-end'>
        <Text className='text-4xl px-10 py-3 font-bold text-white'>
          Make A Report
        </Text>
      </View>
      <ScrollView className='h-auto w-full p-8 '>
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
        <View className='h-auto w-full my-2 px-6 py-4 bg-gray-100 rounded-lg'>
          <Text className='text-lg font-semibold'>Report Details</Text>
        </View>
        <View className='px-6'>
            <View className='h-auto w-full my-2 '>
                <View className='w-full h-auto flex flex-row justify-start items-center my-2'>
                    <Text className='w-1/5 h-auto text-lg font-semibold'>Date: </Text>
                    <TouchableOpacity className="w-4/5 h-auto border-b-2 p-1" onPress={() => setShowDatePicker(true)}>
                        <Text className='text-center text-base'>{formatDate(date)}</Text>
                    </TouchableOpacity>
                </View>
                {showDatePicker && (
                    <DateTimePicker
                    value={date || new Date()}
                    mode='date'
                    display='spinner'
                    onChange={handleDateChange}
                    />
                )}

            </View>
            <View className='w-full h-auto flex flex-row justify-start items-center my-2'>
                <Text className='w-1/5 h-auto text-lg font-semibold'>Type: </Text>
                <View className='h-auto w-4/5  border-b-2 border-gray-200 my-4'>
                    <Picker
                        style={{ height: 50, backgroundColor: 'white', width: '100%', borderBottomWidth: 2, borderBottomColor: '#9F1239' }}
                        selectedValue={type}
                        onValueChange={(itemValue, itemIndex) =>
                            setType(itemValue)
                        }>
                        
                        <Picker.Item label="Electricity" value="Electricity" />
                        <Picker.Item label="Water" value="Water" />
                        <Picker.Item label="Facility" value="Facility" />
     
                    </Picker>
                </View>
            </View>
            <View className='w-full h-auto flex justify-start items-left my-2'>
                <Text className='my-2 text-lg font-semibold'>Description: </Text>
                <TextInput
                    multiline
                    numberOfLines={2}
                    maxLength={200}
                    className='w-full h-auto border-2 border-gray-200 p-3'
                    onChangeText={setDescription}
                    value={description}
                />
            </View>
            <View>
                <Text className='my-2 text-lg font-semibold'>Image: </Text>
                <TouchableOpacity
                    onPress={pickImage}
                    className='w-[full] h-auto bg-gray-100 p-3 rounded-lg flex justify-center items-center'
                >
                    {reportImg ? (
                        <View className='w-full h-auto flex justify-center items-center'>
                        <Image
                            source={{ uri: reportImg }}
                            style={{ width: 200, height: 200 }}
                        />
                        </View>
                    ) : (<Text>Choose Image</Text>)}
                </TouchableOpacity>
            </View>
            <TouchableOpacity className='w-full h-auto mt-2 mb-12 flex justify-center items-center' onPress={handleComplaintSubmit}>
                <Text className='w-full h-auto bg-red-800 text-white text-center p-3 rounded-lg my-4'>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReportForm;