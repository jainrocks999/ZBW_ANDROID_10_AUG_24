import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../../Redux/Constants';
import axios from 'axios';
import Storage from '../../../components/LocalStorage';
const {width} = Dimensions.get('window');
import Loading from '../../../components/Loader';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import permission from '../../utils/permission';
import RNFetchBlob from 'rn-fetch-blob';
import CircleCross from '../../../assets/Icon/CircleCross.svg';
import Clipboard from '@react-native-community/clipboard';
const ChouviharEvent = () => {
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const {chauvhir} = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [status, setStatus] = useState('');
  const [showMember, setShowMemeber] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [qrCode, setQrCode] = useState('');
  useEffect(() => {
    getMember();
  }, []);
  const getMember = async () => {
    const member = await AsyncStorage.getItem('Member');
    setShowMemeber(member);
  };
  const onPressMenu = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}chouviharevent/get/${chauvhir[0]['_id']}`,
      headers: {
        Authorization: `${user_token}`,
      },
    };
    try {
      setLoading(true);
      axios.request(config).then(res => {
        const response = res.data;
        if (response.success) {
          navigation.navigate('ChauViharMenuDates', {data: response.data});
        }
        Toast.show(response?.message);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      Toast.show('Something went wrong');
    }
  };
  const navigation = useNavigation();
  useEffect(() => {
    getChauviharEventStatus();
  }, []);
  const getChauviharEventStatus = async () => {
    try {
      const member = await AsyncStorage.getItem('Member');
      // if (member !== 'Not a member') {
      //   setStatus('Member');
      //   return;
      // }
      setLoading1(true);
      const user_token = await AsyncStorage.getItem(Storage.user_token);
      console.log('thisis token', user_token);
      const user_id = await AsyncStorage.getItem(Storage.user_id);
      console.log('user idf', user_id);
      const endPoint =
        member === 'Not a member'
          ? `chouviharevent/check/approval/status/${chauvhir[0]['_id']}`
          : `chouviharevent/check/applied/${chauvhir[0]['_id']}`;
      console.log('this is endfpoint', endPoint);
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}${endPoint}`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      const response = await axios(config);
      console.log('this is responsedar', response.data);

      //code 400 // You are not approved yet. please contact admin support.-- penidng
      //code 200 Approved

      //code 404 No Details found.
      if (response.data.code == 200) {
        setStatus(member === 'Not a member' ? 'Approved' : '');
      } else if (response.data.code == 400) {
        setStatus(member === 'Not a member' ? 'Pending' : 'Member');
        setStatusMsg(response.data.message);
      } else {
        setStatus('');
      }
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
      console.log('this is erro', err);
    }
  };
  const getQR = async () => {
    try {
      setLoading(true);
      const user_token = await AsyncStorage.getItem(Storage.user_token);
      // const endPoint = `chouviharevent/generate/qrcode/for/nonmember/${
      //   chauvhir[0]['_id']
      // }/${showMember === 'Not a member' ? '0' : '1'}`;
      const endPoint = `chouviharevent/generate/qrcode/${chauvhir[0]['_id']}/${
        showMember === 'Not a member' ? '0' : '1'
      }`;
      let config = {
        method: 'get',
        url: `${Constants.MainUrl}${endPoint}`,
        headers: {
          Authorization: `${user_token}`,
        },
      };
      const response = await axios.request(config);
      if (response.data.code == 200) {
        setQrCode(response.data.data);
        setQrCodeVisible(true);
      } else {
        Toast.show(response.data.message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const saveToGallery1 = async qrCode => {
    try {
      setLoading(true);
      const name = await AsyncStorage.getItem(Storage.username);
      await permission();
      const d = new Date();
      console.log(d);
      let day = d.getDate();
      let year = d.getFullYear();
      if (day.length < 2) day = '0' + day;
      let month = d.getDate() + 1;
      const base64Image = qrCode;
      var Base64Code = base64Image.split('data:image/png;base64,'); //base64Image is my image base64 string
      const dirs = RNFetchBlob.fs.dirs;
      var path =
        dirs.DCIMDir +
        `/${
          true
            ? `${name.split(' ').join('') + '_ChauviharQR'}`
            : `${name.split(' ').join('') + '_ChauviharQR'}`
        }-${day}-${month}-${year}.png`;
      RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
        console.log('File : ', res);
        Toast.show('QR Code saved successfully');
        setQrCodeVisible(false);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      Toast.show('Error for QR code saving');
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      {loading ? <Loading /> : null}
      {loading1 ? <Loading /> : null}
      <Header
        title={'Chauvihar House'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!loading1 && (
          <View style={{marginTop: -45}}>
            {status == '' ? (
              <TouchableOpacity
                disabled={status == 'Pending'}
                onPress={async () => {
                  const showMember = await AsyncStorage.getItem('Member');
                  if (showMember == 'Not a member') {
                    if (status == 'Pending') {
                      Toast.show(statusMsg);
                    } else {
                      navigation.navigate('MemeberRegistration');
                    }
                  } else {
                    navigation.navigate('ChauviharEventList');
                    // navigation.navigate('MemeberRegistration');
                  }
                }}
                style={[styles.touch1]}>
                <Text style={styles.text}>{'Registration'}</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                onPressMenu();
              }}
              style={styles.touch1}>
              <Text style={styles.text}>{'Menu'}</Text>
            </TouchableOpacity>
            {status !== '' || status == 'Member' ? (
              <TouchableOpacity
                onPress={() => {
                  getQR();
                  // navigation.navigate('MemeberRegistration');
                }}
                style={styles.touch1}>
                <Text style={styles.text}>{'Download QR'}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
      <Modal transparent visible={qrCodeVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View style={styles.first1}>
            {loading1 && <Loading />}
            <TouchableOpacity
              onPress={() => {
                setQrCodeVisible(false);
              }}
              style={{position: 'absolute', right: '5%', top: '5%'}}>
              <CircleCross />
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 160, width: 160, marginTop: '-15%'}}
                source={{uri: qrCode}}
              />
              <TouchableOpacity
                onPress={() => {
                  saveToGallery1(qrCode);
                }}
                style={[
                  styles.touch1,
                  {position: 'absolute', bottom: 20, width: 160},
                ]}>
                <Text style={styles.text}>Save to Gallary</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ChouviharEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  touch1: {
    height: 43,
    width: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 20,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  touch1: {
    height: 43,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#000',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
  first1: {
    backgroundColor: '#FDEDB1',
    height: '50%',
    borderRadius: 16,
    width: '84%',
    alignSelf: 'center',
  },
});
