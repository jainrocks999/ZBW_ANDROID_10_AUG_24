import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ImageBackground,
} from 'react-native';
import Image from 'react-native-scalable-image';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import CircleCross from '../../../assets/Icon/CircleCross.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import HTMLView from 'react-native-htmlview';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from "react-native-blob-util";
import Constants from '../../../Redux/Constants';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

const EventDetails = ({route}) => {
  const [isVisible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const [qrCode, setQrCode] = useState('');
  const [isPremium, setIsPremium] = useState('');
  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    const premium = await AsyncStorage.getItem(Storage.isPremium);
    setIsPremium(premium);
    setLoader(true);
    axios({
      method: 'get',
      url: `${Constants.MainUrl}event/details/${route.params.id}`,
      headers: `Authorization: ${user_token}`,
    })
      .then(function (response) {
        if (response.data.code == '200') {
          console.log(response.data.data);
          setData(response.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(response.data.message);
        }
      })
      .catch(function (error) {
        setLoader(false);
        Toast.show(error.response.data.message);
      });
  };

  const renderDate = date => {
    const d = new Date(date);
    let day = d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    const month = d.toLocaleString('default', {month: 'short'});
    return (
      <Text
        numberOfLines={2}
        style={{
          color: '#000',
          fontFamily: 'Montserrat-Medium',
          fontSize: 13,
        }}>{`${day} ${month}, ${year}`}</Text>
    );
  };

  const handleApplyEvents = async id => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    let data = '';

    let config = {
      method: 'post',
      url: `${Constants.MainUrl}event/apply/event/${id}`,
      headers: {
        Authorization: `${user_token}`,
      },
      data: data,
    };
    setLoader(true);
    try {
      axios
        .request(config)
        .then(response => {
          console.log('response=================', response);
          if (response.data.code == '200') {
            setQrCode(response.data.qr);
            AsyncStorage.setItem(Storage.qrcode, response.data.qr);
            setVisible(true);
            setLoader(false);
          } else {
            Toast.show(response.data.message);
            setLoader(false);
          }
        })
        .catch(error => {
          Toast.show(error.response.data.message);
          console.log('response=================', id, error.response.data);
          setLoader(false);
        });
    } catch (error) {
      console.log('this is error', error);
    }
  };

  const saveToGallery1 = () => {
    const d = new Date(data.date);
    console.log(d);
    let day = d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    let month = d.getDate() + 1;
    const base64Image = qrCode;
    var Base64Code = base64Image.split('data:image/png;base64,'); //base64Image is my image base64 string
    const dirs = RNFetchBlob.fs.dirs;
    var path = dirs.DCIMDir + `/${day}-${month}-${year}-${data.name}.png`;
    RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
      console.log('File : ', res);
      Toast.show('QR Code saved successfully');
      setVisible(false);
    });
  };

  const saveImage = () => {
    setVisible(false);
    setTimeout(() => {
      saveToGallery();
    }, 500);
  };

  const saveToGallery = async () => {
    await permission();
    let date = new Date();
    const {config, fs} = RNFetchBlob;
    let code = qrCode;
    const base64Image = code;
    var Base64Code = base64Image.split('data:image/png;base64,');
    const dirPath =
      Platform.OS == 'ios'
        ? `${fs.dirs.DocumentDir}/QRCode`
        : `${fs.dirs.PictureDir}`;
    const filePath =
      dirPath +
      '/' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      '.png';
    fs.writeFile(filePath, Base64Code[1], 'base64')
      .then(res => {
        Platform.OS === 'ios'
          ? RNFetchBlob.ios.previewDocument(filePath)
          : RNFetchBlob.fs.scanFile([{path: filePath, mime: 'image/png'}]);
        setVisible(false);
        // Toast.show('QR Code saved successfully')
      })
      .catch(err => {
        console.log('err', err);
        setVisible(false);
      });
  };

  const permission = async () => {
    const checkPermission = await checkMultiple(
      Platform.OS === 'android'
        ? [
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ]
        : [
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ],
    );
    if (
      checkPermission['ios.permission.PHOTO_LIBRARY'] === 'denied' ||
      checkPermission['ios.permission.PHOTO_LIBRARY_ADD_ONLY'] === 'denied' ||
      checkPermission['android.permission.WRITE_EXTERNAL_STORAGE'] ==
        'denied' ||
      checkPermission['android.permission.READ_EXTERNAL_STORAGE'] == 'denied'
    ) {
      const requestPermission = await requestMultiple(
        Platform.OS === 'android'
          ? [
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ]
          : [
              PERMISSIONS.IOS.PHOTO_LIBRARY,
              PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
            ],
      );
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={{backgroundColor: '#fff', flex: 1}}>
      {loader ? <Loader /> : null}
      <Header
        title={'Event Details'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      {data ? (
        <ScrollView>
          {data.images[0].image ? (
            <Image
              width={Dimensions.get('window').width}
              source={{uri: data.images[0].image}}></Image>
          ) : (
            <View
              style={{
                width: Dimensions.get('window').width,
                height: 105,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Image not Found</Text>
            </View>
          )}

          <View style={{padding: 20}}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {data.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
              }}>
              {renderDate(data.date)}
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  marginLeft: 20,
                }}>
                {data.time}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <HTMLView
                value={data.description
                  .trim()
                  .replace(new RegExp('<p>', 'g'), '<span>')}
                addLineBreaks={false}
              />
            </View>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
      ) : null}
      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: '#FFF',
            borderRadius: 16,
            paddingBottom: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Image source={{uri: qrCode}} />
            <TouchableOpacity
              onPress={() =>
                Platform.OS == 'ios' ? saveImage() : saveToGallery1()
              }
              style={{
                backgroundColor: '#FCDA64',
                marginTop: 20,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 14,
                  marginTop: -2,
                }}>
                Save to Gallery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {data ? (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            disabled={data?.approvalStatus == 'no' ? true : false}
            onPress={
              () => {
                console.log(data?.approvalStatus);
                handleApplyEvents(data._id);
              }
              // saveToGallery()
              // saveToGallery()
              // setVisible(true)
            }
            style={{
              backgroundColor:
                data?.approvalStatus == 'no' ? '#C7BFA2' : '#FCDA64', //C7BFA2
              width: '90%',
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: 45,
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily: 'Montserrat-Bold',
                marginTop: -3,
              }}>
              Apply Event
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ImageBackground>
  );
};
export default EventDetails;
