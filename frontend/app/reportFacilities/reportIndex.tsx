import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAllComplaints } from 'services/complaintsServices';
import Loader from 'components/Loader';

const ReportIndex = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [complaintsData, setComplaintData] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await getAllComplaints();
      setComplaintData(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View className='w-full h-full flex-1 justify-start items-center bg-white'>
      {loading && <Loader />}
      <View className='h-1/6 w-full bg-red-800 flex justify-end'>
        <Text className='text-4xl px-10 py-3 font-bold text-white'>
          Report Facility
        </Text>
      </View>
      <View className='h-full w-full flex items-center justify-start p-8 gap-5'>
        <Text className='w-full px-2 text-left text-lg text-gray-700'>Make A Reporting</Text>
        <TouchableOpacity
          className='w-full p-8 rounded-xl border 0 border-gray-600 '
          onPress={() => {
            navigation.navigate('ReportForm');
          }}
        >
          <Text className='text-center text-3xl font-bold text-gray-500'>+</Text>
        </TouchableOpacity>
        <Text className='w-full px-2 text-left text-lg text-gray-700'>Complaint History</Text>
        <ScrollView className='w-full h-1/2 bg-gray-100 rounded-xl flex p-6'>
          {complaintsData.map((complaint, index) => {
            const isPendingOrInProgress = complaint.status === 'Received' || complaint.status === 'In-progress';
            return (
              <TouchableOpacity
                key={index}
                className={`w-full h-auto flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2 ${isPendingOrInProgress ? 'bg-white' : 'bg-gray-50'}`}
                onPress={() => {
                  navigation.navigate('ReportFeedback', { complaintId: complaint.id });
                }}
              >
                <View>
                  <Text className={`font-semibold text-xl ${isPendingOrInProgress ? 'text-black' : 'text-gray-400'}`}>{complaint.type}</Text>
                  <Text className={`${isPendingOrInProgress ? 'text-black' : 'text-gray-400'}`}>Complaint: {complaint.description}</Text>
                  <Text className={`${isPendingOrInProgress ? 'text-black' : 'text-gray-400'}`}>Date: {formatDate(complaint.date)}</Text>
                  <Text className={`${isPendingOrInProgress ? 'text-black' : 'text-gray-400'}`}>Status: {complaint.status}</Text>
                </View>
                <View>
                  <FontAwesome
                    name={"angle-right"}
                    size={24}
                    color={isPendingOrInProgress ? "gray" : "#9ca3af"}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReportIndex;