import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  TextInput,
  ToastAndroid,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from '@react-native-picker/picker';
import {
  changePassword,
  getUserDetails,
  signOutUser,
  updateUserDetails,
} from 'services/usersServices';
import { useNavigation } from '@react-navigation/native';
import Loader from 'components/Loader';

const UserIndex = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState<boolean>(false);

  //Profile details
  const [name, setName] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string>('');
  const [block, setBlock] = useState<string>('Block A');
  const [room, setRoom] = useState<string>('');

  const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(true);
  const [isRoomValid, setIsRoomValid] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getUserDetails();
        setName(data.name);
        setPhoneNum(data.phoneNum);
        setBlock(data.block);
        setRoom(data.room);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleUpdateProfile = async () => {
    if (isPhoneNumValid && isRoomValid) {
      try {
        const response = await updateUserDetails(name, phoneNum, block, room);
        if (response == 200) {
          ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
          setProfileModalVisible(!profileModalVisible);
        } else {
          ToastAndroid.show('Profile update failed', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const res = await changePassword(currentPassword, newPassword);
      ToastAndroid.show('Password updated successfully', ToastAndroid.SHORT);

      // setChangePasswordModalVisible(!changePasswordModalVisible);
    } catch (error) {
      ToastAndroid.show(
        'Password update failed. Please Ensure enter a valid password',
        ToastAndroid.SHORT
      );
    }
  };

  const validatePhoneNumber = (phoneNum: string) => {
    const phoneNumRegex = /^\d{9,10}$/;
    return phoneNumRegex.test(phoneNum);
  };

  const validateRoom = (room: string) => {
    const roomRegex = /^\d{3}$/;
    return roomRegex.test(room);
  };

  const handlePhoneNumChange = (phoneNum: string) => {
    setPhoneNum(phoneNum);
    setIsPhoneNumValid(validatePhoneNumber(phoneNum));
  };

  const handleRoomChange = (room: string) => {
    setRoom(room);
    setIsRoomValid(validateRoom(room));
  };

  // Change Password
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(true);

  const handleCurrentPasswordChange = (currentPassword: string) => {
    setCurrentPassword(currentPassword);
  };

  const handleNewPasswordChange = (newPassword: string) => {
    setNewPassword(newPassword);
    setIsNewPasswordValid(validatePassword(newPassword));
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View className="flex h-full w-full items-center justify-start bg-white">
      {loading && <Loader />}
      <View className="flex h-1/3 w-full items-center justify-center gap-5 bg-rose-800">
        <FontAwesome name="user-circle-o" size={64} color="white" />
        <Text className="text-xl font-bold text-white">{name}</Text>
        {/* <TouchableOpacity className='h-10 w-20 bg-white flex justify-center items-center rounded-xl' onPress={() => fetchUserDetails()}>
            <Text className='text-rose-800 text-lg font-bold'>Refresh</Text>
          </TouchableOpacity> */}
      </View>
      <View className="flex h-2/3 w-full items-center justify-start gap-8 bg-white p-10">
        <Text className="w-full p-2 text-lg font-medium text-gray-500">Setting</Text>
        <TouchableOpacity
          className="flex h-auto w-full items-center justify-center rounded-xl border-2 border-rose-800 bg-white p-3"
          onPress={() => setProfileModalVisible(!profileModalVisible)}>
          <Text className="text-lg font-bold text-rose-800">Edit Profile</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => {
            setProfileModalVisible(!profileModalVisible);
          }}>
          <View className="flex h-full w-full items-center justify-center bg-gray-100/70">
            <View className="flex h-auto w-4/5 items-center justify-center gap-3 rounded-lg bg-white p-8">
              <View className="f-1/6 flex w-full flex-row items-center justify-between p-2">
                <Text className="text-2xl font-semibold">Edit Profile</Text>
                <Pressable onPress={() => setProfileModalVisible(!profileModalVisible)}>
                  <FontAwesome6 name="xmark" size={18} color="black" />
                </Pressable>
              </View>
              <View className="flex h-auto w-full items-center justify-center gap-2">
                <TextInput
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                  className="my-5 h-auto w-5/6 rounded-sm border-b-2 border-b-gray-400 bg-white p-4 text-lg text-black"
                />
                <View className="flex h-auto w-5/6 flex-row items-center justify-start ">
                  <Text className="bg-rose-800 p-3 text-center text-lg font-semibold text-white">
                    +60
                  </Text>
                  <TextInput
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    value={phoneNum}
                    maxLength={10}
                    onChangeText={handlePhoneNumChange}
                    className="h-auto w-5/6 rounded-sm border-b-2 border-b-gray-400 bg-white p-4 text-lg text-black"
                  />
                </View>
                {!isPhoneNumValid && (
                  <Text className="w-full px-4 text-sm text-red-500 ">
                    Please enter a valid phone number.
                  </Text>
                )}

                <View className="my-5 h-auto w-5/6 rounded-lg border border-gray-300">
                  <Picker
                    style={{
                      height: 50,
                      backgroundColor: 'white',
                      width: '100%',
                      borderBottomWidth: 2,
                      borderBottomColor: '#9F1239',
                    }}
                    selectedValue={block}
                    onValueChange={(itemValue, itemIndex) => setBlock(itemValue)}>
                    <Picker.Item label="Block A" value="Block A" />
                    <Picker.Item label="Block B" value="Block B" />
                    <Picker.Item label="Block C" value="Block C" />
                    <Picker.Item label="Block D" value="Block D" />
                    <Picker.Item label="Block E" value="Block E" />
                  </Picker>
                </View>
                <TextInput
                  placeholder="Room Number"
                  keyboardType="numeric"
                  value={room}
                  maxLength={3}
                  onChangeText={handleRoomChange}
                  className="h-auto w-5/6 rounded-sm border-b-2 border-b-gray-400 bg-white p-4 text-lg text-black"
                />
                {!isRoomValid && (
                  <Text className="w-full px-4 text-sm text-red-500 ">
                    Please enter a three-digit room number.
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={handleUpdateProfile}
                className="my-4 flex h-14 w-3/5 items-center justify-center rounded-xl bg-rose-800 ">
                <Text className="text-xl font-bold text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          className="flex h-auto w-full items-center justify-center rounded-xl border-2 border-rose-800 bg-white p-3"
          onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}>
          <Text className="text-lg font-bold text-rose-800">Change Password</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={changePasswordModalVisible}
          onRequestClose={() => {
            setChangePasswordModalVisible(!changePasswordModalVisible);
          }}>
          <View className="flex h-full w-full items-center justify-center bg-gray-100/70">
            <View className="flex h-auto w-4/5 items-start justify-center gap-3 rounded-lg bg-white p-8">
              <View className="f-1/6 flex w-full flex-row items-center justify-between p-2">
                <Text className="text-2xl font-semibold">Change Password</Text>
                <Pressable
                  onPress={() => setChangePasswordModalVisible(!changePasswordModalVisible)}>
                  <FontAwesome6 name="xmark" size={18} color="black" />
                </Pressable>
              </View>
              <View className="flex h-auto w-full items-center justify-center gap-2">
                <TextInput
                  placeholder="Current Password"
                  value={currentPassword}
                  onChangeText={handleCurrentPasswordChange}
                  secureTextEntry
                  className="my-5 h-auto w-5/6 rounded-sm border-b-2 border-b-gray-400 bg-white p-4 text-lg text-black"
                />
                <TextInput
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={handleNewPasswordChange}
                  secureTextEntry
                  className="my-5 h-auto w-5/6 rounded-sm border-b-2 border-b-gray-400 bg-white p-4 text-lg text-black"
                />
                {!isNewPasswordValid && (
                  <Text className="w-full px-4 text-sm text-red-500 ">
                    Password must contain at least 8 characters, one letter, one number and one
                    special character.
                  </Text>
                )}

                <TouchableOpacity
                  onPress={handleUpdatePassword}
                  className="my-4 flex h-14 w-3/5 items-center justify-center rounded-xl bg-rose-800 ">
                  <Text className="text-xl font-bold text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          className="flex h-auto w-full items-center justify-center rounded-xl border-2 border-rose-800 bg-white p-3"
          onPress={handleSignOut}>
          <Text className="text-lg font-bold text-rose-800">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserIndex;
