import React, { useState } from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const ReportFeedback = () => {
    const [personalDetailsExpanded, setPersonalDetailsExpanded] = useState<boolean>(true);
    const [reportDetailsExpanded, setReportDetailsExpanded] = useState<boolean>(true);
    const [cancelAvaliable, setCancelAvaliable] = useState<boolean>(false);
    const [completeAvaliable, setCompleteAvaliable] = useState<boolean>(true);
    const [modalRatingVisible, setModalRatingVisible] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<Pressable onPress={()=>(setRating(i+1))}><AntDesign key={i} name="star" size={28} color="#9f1239" /></Pressable>);
            } else {
                stars.push(<Pressable onPress={()=>(setRating(i+1))}><AntDesign key={i} name="staro" size={28} color="#9f1239" /></Pressable>);
            }
        }
        return stars;
    }

  return (
    <View className='w-full h-full bg-gray-100 flex justify-start items-center p-4'>
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
                        onPress={() => setModalRatingVisible(!modalRatingVisible)}>
                        <FontAwesome6 name="xmark" size={18} color="black" />
                    </Pressable>
                    </View>
                    <View className='h-auto w-full p-3 flex flex-row justify-center items-center gap-4'>
                        {renderStars(rating)}
                    </View>
                    <TouchableOpacity className='h-auto w-full bg-rose-800 rounded-lg p-3'>
                        <Text className='text-white text-center font-bold'>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <View className='w-full h-1/5 bg-white rounded-xl flex justify-start items-center p-4 border-2 border-gray-200 my-3'>
            <Text className='font-medium text-xl text-center m-3'>Report Tracking</Text>
            <View className='w-4/5 h-auto flex flex-row justify-center my-6 items-center gap-2'>
                    <View>
                        <FontAwesome5 name="envelope-open" size={28} color="#4ade80" />
                    </View>
                <View className='flex-1 h-[3px] bg-green-400 '></View>
                    <View>
                        <Ionicons name="build-outline" size={32} color="rgba(209,213,219, 0.7)" />
                    </View>
                <View className='flex-1 h-[3px] bg-gray-300/70'></View>
                    <View>
                        <Ionicons name="checkmark-done-circle-outline" size={36} color="rgba(209,213,219, 0.7)" />
                    </View>
            
            </View>
        </View>
        <ScrollView className='w-full h-3/5 bg-white rounded-xl border-2 border-gray-200 p-8'>
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
                        <Text>Name: LIM SI NI</Text>
                        <Text>Phone Num: +601753637</Text>
                        <Text>Email: limsini000@gmail.com</Text>
                        <Text>Address: 333/MA1</Text>
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
                        <Text>Date: 25/02/2025</Text>
                        <Text>Type: Electricity</Text>
                        <View>
                        <Text >Description: </Text>
                        <Text>shfhshfdhfisdhfhdsfhdsfhdshfdshfdshfdshfdhfhdsfhdfhdsfhsdihfsihfggghghhhh</Text>
                        </View>
                        <View className='w-full h-auto flex flex-row justify-start items-center my-2'>
                            <Text>Image: </Text>
                            <Text className='text-blue-600 underline px-1'>View</Text>
                        </View>
                    </View>
                )}
                <View className='w-full h-auto p-2 my-4 flex flex-row justify-center items-center gap-3'>
                    <TouchableOpacity className={`h-auto w-1/2 rounded-lg ${cancelAvaliable ? 'bg-rose-800' : 'bg-gray-300'}`}>
                        <Text className='text-white p-3 font-bold text-center'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={`h-auto w-1/2 rounded-lg ${completeAvaliable ? 'bg-rose-800' : 'bg-gray-300'}`} onPress={() => setModalRatingVisible(true)}>                       
                    <Text className='text-white p-3 font-bold text-center'>Complete</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default ReportFeedback