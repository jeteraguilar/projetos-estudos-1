import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';
import CusttomTabBar from '../components/CusttomTabBar';
const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator tabBar={props => <CusttomTabBar {...props} /> } >
    <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
    <Tab.Screen options={{headerShown: false}} name="Search" component={Search} />
    <Tab.Screen options={{headerShown: false}} name="Appointments" component={Appointments} />
    <Tab.Screen options={{headerShown: false}} name="Favorites" component={Favorites} />
    <Tab.Screen options={{headerShown: false}} name="Profile" component={Profile} />
  </Tab.Navigator>
);