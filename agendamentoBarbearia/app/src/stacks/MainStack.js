import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import MainTab from '../stacks/MainTab';
import Barber from '../screens/Barber';
import Home from '../screens/Home';
const Stack = createStackNavigator();
export default()=>(
    <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{
        headerShown:false,

         }}
         
        >
   

    


        <Stack.Screen options={{headerShown: false}} name ="Preload"  component={Preload} />
        <Stack.Screen options={{headerShown: false}} name ="SignIn" component={SignIn} />
        <Stack.Screen options={{headerShown: false}} name ="SignUp" component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name ="MainTab" component={MainTab} />
        <Stack.Screen options={{headerShown: false}}name ="Barber" component={Barber} />
     </Stack.Navigator>
);


