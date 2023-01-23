import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/home/Dashboard';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import StartScreen from './screens/auth/StartScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import CardActions from 'react-native-paper/lib/typescript/components/Card/CardActions';


export default function StackProvider() {
  const [authStatus,setAuthStatus] = useState(false);
    const theme = useTheme();
  return (
    <View style={{backgroundColor:theme.colors.onSurface,flex:1}}>
      {authStatus?<SignInStack/>:<SignOutStack/>}
    </View>
  )
}


function SignInStack(){
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='Dashboard' screenOptions={{headerShown:false}}>
       <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  )
}

function SignOutStack(){
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='StartScreen' screenOptions={{headerShown:false,animation:'slide_from_right'}}>
       <Stack.Screen name="StartScreen" component={StartScreen} />
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
       <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}