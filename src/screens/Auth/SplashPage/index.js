import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Linking,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import axios from 'axios';
import ScalableImage from 'react-native-scalable-image';
import Constants from '../../../Redux/Constants';

const Splash = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [androidUrl, setAndroidUrl] = useState('');
  const [iosUrl, setIosUrl] = useState('');

  useEffect(() => {
    // initial();
    appVersion();
  }, []);

  useEffect(() => {
    requestPermissions();
  }, []);

  const appVersion = async url => {
    try {
      const response = await axios({
        method: 'GET',
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: `${Constants.MainUrl}account/version`,
      });
      if (Platform.OS == 'android') {
        console.log('thuisdisis version',response.data?.data?.android_version);
        
        if (response.data?.data?.android_version > '4.1.9') {
          setAndroidUrl(response.data.data.android_url);
          setModalVisible(true);
        } else {
          initial();
        }
      } else {
        if (response.data?.data?.ios_version > '4.0.9') {
          setIosUrl(response.data.data.ios_url);
          setModalVisible(true);
        } else {
          initial();
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'ZBWA Notification Permission',
          message:
            'ZBWA would like to send you push notifications ' +
            'to keep you updated on the latest app features.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Don’t Allow',
          buttonPositive: 'Allow',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      }
      console.log('this', granted);
    } catch (err) {
      console.warn(err);
    }
  };

  const initial = async () => {
    let Token = await AsyncStorage.getItem('user_token');
    if (!Token) {
      setTimeout(() => {
        navigation.replace('FirstPage');
      }, 2000);
    } else {
      setTimeout(() => navigation.replace('Home'), 2000);
    }
  };

  const openUrl = () => {
    if (Platform.OS == 'android') {
      // AsyncStorage.setItem('user_token', '');
      Linking.openURL(androidUrl);
    } else {
      Linking.openURL(iosUrl);
    }
  };

  return (
    <LinearGradient
      colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ScalableImage
        width={Dimensions.get('window').width - 50}
        source={require('../../../assets/Logo/ZBW_black_logo-transformed.png')}
      />
      {/* <Image style={{ width: '99%', height: 256 }} source={require('../../../assets/Logo/ZBW_black_logo-transformed.png')} /> */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={{width: '100%'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {'New Update Available'}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontFamily: 'Montserrat-SemiBold',
              textAlign: 'center',
              marginTop: 5,
            }}>
            A newer version of this app is available for update, Kindly update
            the app.
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: 10,
            }}>
            <TouchableOpacity style={styles.popup} onPress={() => openUrl()}>
              <Text style={styles.ModelBtntext}>Update Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};
export default Splash;
