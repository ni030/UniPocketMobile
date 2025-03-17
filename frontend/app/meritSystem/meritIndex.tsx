import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { getMeritById } from 'services/meritServices';
import { useFocusEffect } from '@react-navigation/native';
import Loader from 'components/Loader';
import { checkExistingCRById, getChosenRoomById, saveChosenRoom } from 'services/chosenRoomServices';

const MeritIndex = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [loading, setLoading] = useState(false);

  const [block, setBlock] = useState('Block A');
  const [room, setRoom] = useState('');
  const [isRoomValid, setIsRoomValid] = useState(true);

  const [meritData, setMeritData] = useState<any[]>([]);
  const [totalMerits, setTotalMerits] = useState<number>(0);
  const [ranking, setRanking] = useState<number>(0);
  const [totalActivity, setTotalActivity] = useState(0);

  const loadData = async () => {
    setLoading(true);
    const { data } = await getMeritById();
    const sortedData = sortAscendingByEventName(data.events, sortAscending);
    setMeritData(sortedData);
    setTotalMerits(data.totalMerits);
    setRanking(data.ranking);
    setTotalActivity(data.events.length);
    setLoading(false);

  };
  

  const sortAscendingByEventName = (events: any[], ascending: boolean) => {
    return [...events].sort((a, b) => {
      return ascending ? a.eventName.localeCompare(b.eventName) : b.eventName.localeCompare(a.eventName);
    });
  };  
  
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadCRData = async () => {
    const checkExisting = await checkExistingCRById();
    if (checkExisting) {
      const { data } = await getChosenRoomById();
      setBlock(data.block);
      setRoom(data.roomNum);
    }

  }

  const handleChosenRoomOpen = async () => {
    await loadCRData();
    setModalVisible(true);
  }

  const handleSaveChosenRoom = async () => {
    if (isRoomValid && room && block) {
      const response = await saveChosenRoom(block, room);
      if (response === 200) {
        setModalVisible(false);
        ToastAndroid.show("Room successfully saved!", ToastAndroid.LONG);
      }
    }
  }

  const handleUnsavedChanges = async () => {
    await loadCRData();
    setModalVisible(false);
    ToastAndroid.show("Changes discarded.", ToastAndroid.LONG);
  }
  
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
      {loading && <Loader />}
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
                onPress={handleUnsavedChanges}>
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
            <TouchableOpacity className='w-full h-auto bg-rose-800 flex justify-center items-center rounded-lg p-4 my-4' onPress={handleSaveChosenRoom}>
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
            <Text className='text-sm'>Rank 1: Top 3 users with the highest merit</Text>
            <Text className='text-sm'>Rank 2: Top 4 - 10 users with the highest merit</Text>
            <Text className='text-sm'>Rank 3: Others users</Text>
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
              <Text className='text-4xl font-bold text-white my-2'>{totalMerits} </Text>
              <Text className='text-lg font-bold text-white'>mark(s)</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handleChosenRoomOpen}>
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
            <Text className='text-3xl font-semibold text-white'>{ranking}</Text>
          </View>
          <View className='w-[1.5px] h-[70px] bg-gray-100/70'></View>
          <View className='w-1/3 h-auto flex justify-center items-center'>
            <Text className='text-xl text-white'>Total Activity</Text>
            <Text className='text-3xl font-semibold text-white'>{totalActivity}</Text>
          </View>
        </View>
      </View>
      <ScrollView className='w-full h-auto p-8 '>
        <View className='h-auto w-full flex flex-row justify-between items-center'>
          <Text className='font-semibold text-lg py-2 text-gray-500'>History</Text>
          <Pressable onPress={() => { 
            setSortAscending(prev => {
              const newSortOrder = !prev;
              setMeritData(sortAscendingByEventName(meritData, newSortOrder));
              return newSortOrder;
            });
          }}>
            {sortAscending ? (
              <MaterialCommunityIcons name="sort-alphabetical-ascending" size={22} color="black" />
            ) : (
              <MaterialCommunityIcons name="sort-alphabetical-descending" size={22} color="black" />
            )}
          </Pressable>
        </View>
        {meritData.map((event: { eventName: string; date: string; role: 'Participant' | 'Committee' }, index) => {

        const meritPoints = {
          "Participant": 1,
          "Committee": 5,
        }

        const points = meritPoints[event.role];
        
        return (
          <View key={index} className='w-full h-auto p-4 bg-gray-100/70 rounded-lg border border-gray-300 my-2 flex flex-row justify-center items-center'>
            <View className='w-1/4 flex justify-center items-center '>
              <MaterialIcons name="sports-volleyball" size={64} color="#9f1239" />
            </View>
            <View className='w-1/2 flex justify-center px-4'>
              <Text className='text-xl font-semibold text-wrap'>{event.eventName}</Text>
              <Text className='text-base'>Date: {event.date}</Text>
              <Text className='text-base'>Role: {event.role}</Text>
            </View>
            <View className='w-1/4 flex justify-center items-center'>
              <Text className='text-4xl text-rose-800 font-semibold'>+ {points}</Text>
            </View>
          </View>
        )})}
      </ScrollView>
    </View>
  )
}

export default MeritIndex;