import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Modal, Pressable, TextInput} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { InputField } from 'components/InputField';
import { ErrorMessage } from 'components/ErrorMessage';
import { Picker } from '@react-native-picker/picker';

const UserIndex = () => {
    const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false)
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState<boolean>(false)

    //Profile details
    const [name, setName] = useState<string>('')
    const [phoneNum, setPhoneNum] = useState<string>('')
    const [block, setBlock] = useState<string>('Block A')
    const [room, setRoom] = useState<string>('')

    const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(true)
    const [isRoomValid, setIsRoomValid] = useState<boolean>(true)

    const validatePhoneNumber = (phoneNum: string) => {
      const phoneNumRegex = /^\d{9,10}$/;
      return phoneNumRegex.test(phoneNum);
    }

    const validateRoom = (room: string) => {
        const roomRegex = /^\d{3}$/;
        return roomRegex.test(room);
    }

    const handlePhoneNumChange = (phoneNum: string) => {
      setPhoneNum(phoneNum);
      setIsPhoneNumValid(validatePhoneNumber(phoneNum));
    }

    const handleRoomChange = (room: string) => {
        setRoom(room);
        setIsRoomValid(validateRoom(room));
    }

    // Change Password
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')

    const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(true)

    const handleCurrentPasswordChange = (currentPassword: string) => {
        setCurrentPassword(currentPassword);
    }

    const handleNewPasswordChange = (newPassword: string) => { 
        setNewPassword(newPassword);
        setIsNewPasswordValid(validatePassword(newPassword));
    }

    const validatePassword = (password: string) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
  };



  return (
    <View className='w-full h-full flex justify-start items-center bg-white'>
      <View className='h-1/3 w-full bg-rose-800 flex justify-center items-center gap-5'>
          <FontAwesome name="user-circle-o" size={64} color="white" />
          <Text className='text-xl font-bold text-white'>HuanHuan</Text>
      </View>
      <View className='h-2/3 w-full bg-white flex justify-start items-center p-10 gap-8'>
        <Text className='w-full p-2 text-gray-500 font-medium text-lg'>Setting</Text>
        <TouchableOpacity className='w-full h-auto bg-white border-2 border-rose-800 flex justify-center items-center rounded-xl p-3' onPress={() => setProfileModalVisible(!profileModalVisible)}>
          <Text className='text-rose-800 text-lg font-bold'>Edit Profile</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => {
            setProfileModalVisible(!profileModalVisible);
          }}>
          <View className='h-full w-full flex justify-center items-center bg-gray-100/70'>
            <View className='h-auto w-4/5 flex justify-center items-center gap-3 bg-white rounded-lg p-8'>
              <View className='f-1/6 w-full p-2 flex flex-row justify-between items-center'>
                <Text className='text-2xl font-semibold'>Edit Profile</Text>
                <Pressable
                  onPress={() => setProfileModalVisible(!profileModalVisible)}>
                  <FontAwesome6 name="xmark" size={18} color="black" />
                </Pressable>
              </View>
              <View className='h-auto w-full flex justify-center items-center gap-2'>
                <TextInput
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                    className='h-auto w-5/6 my-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                />
                <View className='h-auto w-5/6 flex flex-row justify-start items-center '>
                    <Text className='text-lg text-white font-semibold text-center p-3 bg-rose-800'>+60</Text>
                    <TextInput
                        placeholder='Room Number'
                        keyboardType='numeric'
                        value={phoneNum}
                        maxLength={10}
                        onChangeText={handlePhoneNumChange}
                        className='h-auto w-5/6 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                    />
                </View>
                {!isPhoneNumValid &&
                    <Text className='w-full px-4 text-red-500 text-sm '>Please enter a valid phone number.</Text>}
                
                <View className='h-auto w-5/6 my-5 border border-gray-300 rounded-lg'>
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
                <TextInput
                    placeholder='Room Number'
                    keyboardType='numeric'
                    value={room}
                    maxLength={3}
                    onChangeText={handleRoomChange}
                    className='h-auto w-5/6 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                />
                {!isRoomValid &&  
                  <Text className='w-full px-4 text-red-500 text-sm '>Please enter a three-digit room number.</Text>
                }
            </View>
            <TouchableOpacity
              onPress={() => setProfileModalVisible(!profileModalVisible)}
              className='h-14 w-3/5 my-4 bg-rose-800 flex justify-center items-center rounded-xl '>
              <Text className='text-white font-bold text-xl'>Save</Text>
            </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity className='w-full h-auto bg-white border-2 border-rose-800 flex justify-center items-center rounded-xl p-3' onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}>
          <Text className='text-rose-800 text-lg font-bold'>Change Password</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={changePasswordModalVisible}
          onRequestClose={() => {
            setChangePasswordModalVisible(!changePasswordModalVisible);
          }}>
          <View className='h-full w-full flex justify-center items-center bg-gray-100/70'>
            <View className='h-auto w-4/5 flex justify-center items-start gap-3 bg-white rounded-lg p-8'>
              <View className='f-1/6 w-full p-2 flex flex-row justify-between items-center'>
                <Text className='text-2xl font-semibold'>Change Password</Text>
                <Pressable
                  onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}>
                  <FontAwesome6 name="xmark" size={18} color="black" />
                </Pressable>
              </View>
              <View className='h-auto w-full flex justify-center items-center gap-2'>
                <TextInput
                    placeholder='Current Password'
                    value={currentPassword}
                    onChangeText={handleCurrentPasswordChange}
                    secureTextEntry
                    className='h-auto w-5/6 my-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                />
                <TextInput
                    placeholder='New Password'
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    secureTextEntry
                    className='h-auto w-5/6 my-5 bg-white text-lg text-black border-b-2 border-b-gray-400 rounded-sm p-4'
                />
                {!isNewPasswordValid &&
                    <Text className='w-full px-4 text-red-500 text-sm '>Password must contain at least 8 characters, one letter, one number and one special character.</Text>}
                    
                <TouchableOpacity onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}
                className='h-14 w-3/5 my-4 bg-rose-800 flex justify-center items-center rounded-xl '>
                <Text className='text-white font-bold text-xl'>Save</Text>
              </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>
        
        <TouchableOpacity className='w-full h-auto bg-white border-2 border-rose-800 flex justify-center items-center rounded-xl p-3'>
          <Text className='text-rose-800 text-lg font-bold'>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserIndex