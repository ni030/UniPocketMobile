import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const MeritIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const [block, setBlock] = useState('Block A');
  const [room, setRoom] = useState('');

  const [isRoomValid, setIsRoomValid] = useState(true);
  const validateRoom = (room: string) => {
    const roomRegex = /^\d{3}$/;
    return roomRegex.test(room);
  }

  const handleRoomChange = (room: string) => {
    setRoom(room);
    setIsRoomValid(validateRoom(room));
  }

  return (
    <View className='h-full w-full bg-white'>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className='h-full w-full flex justify-center items-center bg-gray-100/70'>
          <View className='h-auto w-4/5 flex justify-center items-start gap-3 bg-white rounded-lg p-8'>
            <View className='f-1/6 w-full p-2 flex flex-row justify-between items-center'>
              <Text className='text-2xl font-semibold'>Choose Room</Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                <FontAwesome6 name="xmark" size={18} color="black" />
              </Pressable>
            </View>
            <Text className='p-2 text-sm'>Please select your preferred room for your next semester room registration.</Text>
            <Text className='text-lg p-2 mt-3 font-medium'>Block</Text>
            <View className='h-auto w-full border border-gray-300 rounded-lg'>
              <Picker
                style={{ height: 50, backgroundColor: 'white', width: '100%', borderBottomWidth: 2, borderBottomColor: '#9F1239' }}
                selectedValue={block}
                onValueChange={(itemValue, itemIndex) =>
                  setBlock(itemValue)
                }>
                <Picker.Item label="Block A" value="Block A" />
                <Picker.Item label="Block B" value="Block B" />
                <Picker.Item label="Block C" value="Block C" />
                <Picker.Item label="Block D" value="Block D" />
                <Picker.Item label="Block E" value="Block E" />
              </Picker>
            </View>
            <View className='h-auto w-full'>
              <Text className='text-lg p-2 font-medium'>Room Number</Text>
              <TextInput
                placeholder='Room Number'
                keyboardType='numeric'
                value={room}
                maxLength={3}
                onChangeText={handleRoomChange}
                className='h-auto w-full bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
              />
            </View>
            {!isRoomValid &&
              <Text className='w-full text-left px-2 -top-2 text-red-500'>Please enter a three-digit room number.</Text>
            }
            <TouchableOpacity className='w-full h-auto bg-rose-800 flex justify-center items-center rounded-lg p-4 my-4'>
              <Text className='font-semibold text-white text-lg'>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}>
        <View className='h-full w-full flex justify-center items-center bg-gray-100/70'>
          <View className='h-auto w-4/5 flex justify-center items-start gap-3 bg-white rounded-lg p-8'>
            <Text className='text-lg font-semibold'>Room Selection Guidelines</Text>
            <Text className='text-base font-medium'>Priority by Rank</Text>
            <Text className='text-sm'>Higher rank = higher priority (Rank 1 &gt; Rank 2 &gt; Rank 3).</Text>
            <Text className='text-base font-medium mt-2'>Room Allocation</Text>
            <Text className='text-sm'>Rank 1: 10% of rooms</Text>
            <Text className='text-sm'>Rank 2: 30% of rooms</Text>
            <Text className='text-sm'>Rank 3: 60% of rooms</Text>
            <Text className='text-base mt-2 font-medium'>Selection Process</Text>
            <Text className='text-sm'>Rank 1 selects first, followed by Rank 2, then Rank 3.</Text>
            <Text className='text-sm font-medium '>Once a rank's rooms are full, students must choose from the remaining options.</Text>
            <TouchableOpacity
              className='w-full h-auto bg-rose-800 flex justify-center items-center rounded-lg p-4 my-4'
              onPress={() => setInfoModalVisible(!infoModalVisible)}
            >
              <Text className='font-semibold text-white text-lg'>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className='h-auto w-full bg-rose-800 flex justify-center items-center px-8 py-4'>
        <View className='h-[100px] w-full flex flex-row justify-evenly items-center gap-7 p-4'>
          <View className='h-[70] w-[70] p-4 bottom-1 flex justify-center items-center rounded-full bg-rose-500'>
            <FontAwesome5 name="award" size={48} color="white" />
          </View>
          <View className='w-1/2'>
            <Text className='text-xl font-semibold text-white'>Your total merit</Text>
            <View className='flex flex-row justify-start items-center'>
              <Text className='text-4xl font-bold text-white my-2'>100 </Text>
              <Text className='text-lg font-bold text-white'>mark(s)</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="add-home" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View className='h-[2px] w-full bg-gray-100/70'></View>
        <View className='h-auto w-full flex flex-row justify-evenly items-center pt-4'>
          <View className='w-1/3 h-auto flex justify-center items-center'>
            <Text className='text-xl text-white'>Ranking
              <TouchableOpacity className='px-1' onPress={() => setInfoModalVisible(true)}>
                <Octicons name="question" size={16} color="rgba(243,224,256,0.8)" />
              </TouchableOpacity>
            </Text>
            <Text className='text-3xl font-semibold text-white'>1</Text>
          </View>
          <View className='w-[1.5px] h-[70px] bg-gray-100/70'></View>
          <View className='w-1/3 h-auto flex justify-center items-center'>
            <Text className='text-xl text-white'>Total Activity</Text>
            <Text className='text-3xl font-semibold text-white'>99</Text>
          </View>
        </View>
      </View>
      <ScrollView className='w-full h-auto p-8'>
        <View className='h-auto w-full flex flex-row justify-between items-center'>
          <Text className='font-semibold text-lg py-2 text-gray-100'>History</Text>
          {sortAscending ? (
            <MaterialCommunityIcons name="sort-alphabetical-ascending" size={22} color="black" />
          ) : (
            <MaterialCommunityIcons name="sort-alphabetical-descending" size={22} color="black" />
          )}
        </View>
        <View className='w-full h-auto p-4 bg-gray-100/70 rounded-lg border border-gray-300 my-2 flex flex-row justify-center items-center gap-4'>
          <View className='flex justify-center items-center'>
            <MaterialIcons name="sports-volleyball" size={64} color="#9f1239" />
          </View>
          <View className='w-auto flex justify-center px-4'>
            <Text className='text-xl font-semibold'>Activity 1</Text>
            <Text className='text-base'>Date: 22/02/2024</Text>
            <Text className='text-base'>Role: Participant</Text>
          </View>
          <View className='flex justify-center items-center'>
            <Text className='text-4xl text-rose-800 font-semibold'>+10</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MeritIndex;