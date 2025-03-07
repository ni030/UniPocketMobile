import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import Home from 'app/home';
import ReportIndex from 'app/reportFacilities/reportIndex';
import FacilityIndex from 'app/facilityNavigation/facilityIndex';
import UserIndex from 'app/userManagement/userIndex';

const Tab = createBottomTabNavigator();

const  BottomTabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false,
        tabBarActiveTintColor: '#9f1239',
        tabBarInactiveTintColor: '#8e8e93',
      }}
      
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
            tabBarIcon: ({ color, size }) => (<Feather name="home" size={size} color={color} />),
          headerShown: false
        }} 
      />
      <Tab.Screen
        name="Report" 
        component={ReportIndex} 
        options={{ 
          tabBarIcon: ({ color, size }) => (<Feather name="flag" size={size} color={color} />),
        }} 
      />
      <Tab.Screen 
        name="Facility" 
        component={FacilityIndex} 
        options={{ 
          tabBarIcon: ({ color, size }) => (<Feather name="map" size={size} color={color} />),
        }} 
      />
      <Tab.Screen 
        name="User" 
        component={UserIndex} 
        options={{ 
          tabBarIcon: ({ color, size }) => (<Feather name="user" size={size} color={color} />),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
