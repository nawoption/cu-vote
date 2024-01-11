import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

import {fcmServices} from './src/FCMServices';
import {LocalNotificatinonServices} from './src/LocalNotificationServices';
import messaging from '@react-native-firebase/messaging';
import King from './screens/King';
import Queen from './screens/Queen';
import Login from './screens/Login';
import Detail from './screens/Detail';
import Contact from './screens/Contact';
import Policy from './screens/Policy';
import Result from './screens/Result';
import Voted from './screens/Voted';

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#03A9F4',
        headerStyle: {backgroundColor: '#03A9F4'},
        headerTintColor: '#fff',
      }}>
       <Tab.Screen
        name="Voted"
        component={Voted}
        options={{
          tabBarLabel: 'Voted',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="how-to-vote" color={color} size={size} />
          ),
          headerTitle: 'You Voted',
        }}
      />
      <Tab.Screen
        name="King"
        component={King}
        options={{
          tabBarLabel: 'King',
          tabBarIcon: ({color, size}) => (
            <Fontisto name="male" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Queen"
        component={Queen}
        options={{
          tabBarLabel: 'Queen',
          tabBarIcon: ({color, size}) => (
            <Fontisto name="female" color={color} size={size} />
          ),
          headerTitle: 'Queen',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarLabel: 'Contact',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="contact-mail" color={color} size={size} />
          ),
          headerTitle: 'Contact',
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  useEffect(() => {
    fcmServices.registerAppWithFCM();
    fcmServices.register(onRegister, onNotification, onOpenNotification);
    LocalNotificatinonServices.configure(onOpenNotification);

    return () => {
      console.log('[App] unRegister');
      fcmServices.unRegister();
      LocalNotificatinonServices.unRegister();
    };
  }, []);

  function onRegister(token) {
    console.log('[App] on register ', token);
  }

  function onNotification(notify) {
    console.log('[App] on notification ', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };
    LocalNotificatinonServices.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  }

  function onOpenNotification(notify) {
    console.log('[App] onOpenNotification ', notify);
  }
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#03A9F4" />
     
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#fff',
          headerStyle: {backgroundColor: '#03A9F4'},
        }}>
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: 'Login',
          }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Result"
          component={Result}
          options={{
            headerTitle: 'Admin Dashboard',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen
          name="Policy"
          component={Policy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
