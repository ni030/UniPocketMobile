import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ReportIndex = () => {
  const navigation = useNavigation<any>()
  return (
    <View className='w-full h-full flex-1 justify-start items-center bg-white'>
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
            navigation.navigate('ReportForm')
          }}
        >
          <Text className='text-center text-3xl font-bold text-gray-500'>+</Text>
        </TouchableOpacity>
        <Text className='w-full px-2 text-left text-lg text-gray-700'>Complaint History</Text>
        <ScrollView className='w-full h-1/2 bg-gray-100 rounded-xl flex p-6'>
          <TouchableOpacity 
          className='w-full h-auto bg-white flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2'
          onPress={() => {
            navigation.navigate('ReportFeedback')
          }}
          >
            <View>
              <Text className='font-semibold text-xl'>Electicity</Text>
              <Text >Complaint: Power outage</Text>
              <Text>Date: 2022-01-01</Text>
              <Text>Status: Pending</Text>
            </View>
            <View>
              <FontAwesome
                  name={"angle-right"}
                  size={24}
                  color="gray"
              />
            </View>
          </TouchableOpacity>
          <View className='w-full h-auto bg-gray-50 flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2 text-gray-50'>
            <View >
              <Text className='font-semibold text-xl text-gray-400'>Electicity</Text>
              <Text className='text-gray-400'>Complaint: Power outage</Text>
              <Text className='text-gray-400'>Date: 2022-01-01</Text>
              <Text className='text-gray-400'>Status: Pending</Text>
            </View>
            <View>
              <FontAwesome
                  name={"angle-right"}
                  size={24}
                  color="#9ca3af"
              />
            </View>
          </View>
          <View className='w-full h-auto bg-gray-50 flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2 text-gray-50'>
            <View >
              <Text className='font-semibold text-xl text-gray-400'>Electicity</Text>
              <Text className='text-gray-400'>Complaint: Power outage</Text>
              <Text className='text-gray-400'>Date: 2022-01-01</Text>
              <Text className='text-gray-400'>Status: Pending</Text>
            </View>
            <View>
              <FontAwesome
                  name={"angle-right"}
                  size={24}
                  color="#9ca3af"
              />
            </View>
          </View>
          <View className='w-full h-auto bg-gray-50 flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2 text-gray-50'>
            <View >
              <Text className='font-semibold text-xl text-gray-400'>Electicity</Text>
              <Text className='text-gray-400'>Complaint: Power outage</Text>
              <Text className='text-gray-400'>Date: 2022-01-01</Text>
              <Text className='text-gray-400'>Status: Pending</Text>
            </View>
            <View>
              <FontAwesome
                  name={"angle-right"}
                  size={24}
                  color="#9ca3af"
              />
            </View>
          </View>
          <View className='w-full h-auto bg-gray-50 flex flex-row justify-between items-center border-hairline border-gray-300 rounded-lg p-6 my-2 text-gray-50'>
            <View >
              <Text className='font-semibold text-xl text-gray-400'>Electicity</Text>
              <Text className='text-gray-400'>Complaint: Power outage</Text>
              <Text className='text-gray-400'>Date: 2022-01-01</Text>
              <Text className='text-gray-400'>Status: Pending</Text>
            </View>
            <View>
              <FontAwesome
                  name={"angle-right"}
                  size={24}
                  color="#9ca3af"
              />
            </View>
          </View>

        </ScrollView>
      </View>
  </View>
  )
}

export default ReportIndex