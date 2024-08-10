import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Button,
  Platform,
  SafeAreaView,
  FlatList,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigation';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from "./src/components/LocalStorage";
// import messaging from "@react-native-firebase/messaging";
import crashlytics from '@react-native-firebase/crashlytics';
// import NetInfo from "@react-native-community/netinfo";
import { useNetInfo } from "@react-native-community/netinfo";
import * as RootNavigation from "./src/navigation/RootNavigation";


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);
const App = () => {

  const { type, isConnected } = useNetInfo();

  const manageLogin=async()=>{
  
    const user_id=await AsyncStorage.getItem('user_token')
    if(user_id==null){
      console.log('this is working null');
      RootNavigation.push('FirstPage')
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    }else if(user_id){
      console.log('this is working');
      RootNavigation.push('ZBWGroup')
      
      // navigationRef.current?.dispatch(StackActions.push('FirstPage'));
    }
  }
  PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
      AsyncStorage.setItem(Storage.fcm_token, token.token)
    },
    onNotification: function (notification) {
      PushNotification.localNotification({
        title: notification.message,
        message: notification.title,
      });
      console.log('this is notifi',notification);
      if(notification.userInteraction===true && notification.foreground==false && notification.title=='New Message on ZBWA Group') {
        // RootNavigation.push('Splash')
        manageLogin()
      }
      else{
        if (notification.userInteraction==true && notification.foreground==true && notification.title=='New Message on ZBWA Group') {
          manageLogin()
        }
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });


  // const getFCMToken = async () => {
  //   try {
  //     const apnsToken = await messaging().getAPNSToken();
  //     if (apnsToken) {
  //       await messaging().setAPNSToken(apnsToken);
  //     } else {
  //       await messaging().setAPNSToken('APN_TOKEN');
  //     }

  //     var token = await messaging().getToken();
  //     Alert.alert(token)
  //     AsyncStorage.setItem(Storage.fcm_token,token)
  //     console.log('this iifcm token', token);
  //   } catch (err) {
  //     console.log('thisis erroryo', err);
  //   }
  // };
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     PushNotification.localNotification({
  //       message: remoteMessage.notification.body,
  //       title: remoteMessage.notification.title,
  //     });
  //     console.log('this is remote notification', remoteMessage);
  //   });
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   Platform.OS == 'ios' ? getFCMToken() : null
  // }, []);




  useEffect(() => {
    handleCrash()
  }, [])

  const handleCrash = async () => {
    crashlytics().log('Analytics page just mounted')
    getCrashlyticsDetail()
    return () => {
      crashlytics().log('Analytics page just unmounted')
    }
  }

  const getCrashlyticsDetail = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id)
    const name = await AsyncStorage.getItem(Storage.username)
    try {
      crashlytics().setUserId(user_id)
      crashlytics().setAttribute('username', name)
    } catch (err) {
      crashlytics().recordError(err)
    }
  }



  return (
    <Fragment>
      {isConnected == null ? <View /> : <View style={{ flex: 1 }}>
        {isConnected ? <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Platform.OS == 'ios' ? '#000' : '#fff',
          }}>
          <Provider store={Store}>
            <RootApp />
          </Provider>
          <StatusBar
            backgroundColor={"#000"}
            barStyle={"light-content"}
          />
        </SafeAreaView> :
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Platform.OS == 'ios' ? '#000' : '#fff',
            }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Image source={require('./src/assets/Icon/network.png')} />
              <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>Please Check Your Internet Connection!</Text>
            </View>
          </SafeAreaView>}
      </View>}
    </Fragment>
  );
};

export default App;

