import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ForwardArrow from '../../../assets/Icon/ForwardArrow.svg';
import Arrow from '../../../assets/Icon/Arrow.svg';
import Eye from '../../../assets/Icon/eye.svg';
import Eye1 from '../../../assets/Icon/eye1.svg';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import Constants from '../../../Redux/Constants';

const Login = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(true);

  const userLogin = async () => {
    const fcm_token = await AsyncStorage.getItem(Storage.fcm_token);
    console.log('this is fcm token', fcm_token);
    if (mobile == '') {
      Toast.show('Please enter your phone number');
    } else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number');
    } else if (password == '') {
      Toast.show('Please enter your password');
    } else {
      setLoader(true);
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/login`,
        data: {
          mobile: mobile,
          action: 'password',
          password: password,
        },
      })
        .then(function (response) {
          if (response.data.code == '200') {
            let data = JSON.stringify({
              fcm_token: fcm_token == null ? '' : fcm_token,
            });

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: `${Constants.MainUrl}user/update/fcm/token`,
              headers: {
                'Content-Type': 'application/json',
                Authorization: response.data.data.token,
              },
              data: data,
            };

            axios
              .request(config)
              .then(response1 => {
                if (response1.data.code == 200) {
                  console.log('this is user detail', response.data);
                  setLoader(false);
                  Toast.show(response.data.message);
                  AsyncStorage.setItem(Storage.user_id, response.data.data._id);
                  AsyncStorage.setItem(
                    Storage.username,
                    `${response.data.data.firstName} ${response.data.data.lastName}`,
                  );
                  AsyncStorage.setItem(
                    Storage.user_token,
                    response.data.data.token,
                  );
                  AsyncStorage.setItem(
                    Storage.isPremium,
                    JSON.stringify(response.data.data.isPrimary),
                  );
                  navigation.replace('Home');
                } else {
                  setLoader(false);
                }
              })
              .catch(error => {
                setLoader(false);
                console.log(error);
              });
          } else {
            setLoader(false);
            Toast.show(response.data.message);
          }
        })
        .catch(function (error) {
          setLoader(false);
          console.log('error', error);
          Toast.show(error.response.data.message);
        });
    }
  };

  return (
    <LinearGradient
      colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']}
      style={{flex: 1}}>
      {loader ? <Loader /> : null}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{}}>
            <View style={styles.main}>
              <Image
                style={[styles.logo, {resizeMode: 'contain'}]}
                source={require('../../../assets/Logo/Zbwa1.png')}
              />
            </View>
            <View style={[styles.container, {marginTop: 30, height: 350}]}>
              <View style={styles.yellow}>
                <View style={styles.view}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.signup}>Sign up </Text>
                    <Text style={styles.free}>for free</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('RegisterPage')}
                    style={styles.arrowContainer}>
                    <ForwardArrow />
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.black}>
                    <View style={{paddingHorizontal: 40, marginTop: 10}}>
                      <Text style={styles.already}>
                        Already Registered user?
                      </Text>
                      <Text style={styles.login}>Login</Text>
                      <View style={styles.country}>
                        <Text style={styles.ninety}>+91</Text>
                        <TextInput
                          contextMenuHidden
                          style={styles.input}
                          placeholder="Phone Number"
                          placeholderTextColor={'#FFFFFF'}
                          value={mobile}
                          onChangeText={val => {
                            const regex = /^\d{0,10}$/;
                            if (regex.test(val)) {
                              setMobile(val);
                            }
                          }}
                          keyboardType="number-pad"
                          maxLength={10}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.pass}
                          placeholder="Password"
                          placeholderTextColor={'#FFFFFF'}
                          keyboardType="default"
                          value={password}
                          onChangeText={val => setPassword(val)}
                          secureTextEntry={visible}
                        />
                        {visible ? (
                          <TouchableOpacity
                            style={{padding: 6}}
                            onPress={() => setVisible(!visible)}>
                            <Eye />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{padding: 6}}
                            onPress={() => setVisible(!visible)}>
                            <Eye1 />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={{marginTop: 10}}>
                        <Text
                          onPress={() => navigation.navigate('Forgot')}
                          style={styles.forgot}>
                          Forgot Password?
                        </Text>
                        <Text
                          onPress={() => navigation.navigate('Pin')}
                          style={styles.mpin}>
                          Login with mPIN
                        </Text>
                      </View>
                    </View>
                    <View style={{marginTop: 30, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() =>
                          // navigation.replace('Home')
                          userLogin()
                        }
                        style={styles.button}>
                        <Text style={styles.text}>Login</Text>
                        <Arrow />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 140}} />
        </KeyboardAwareScrollView>
      </ScrollView>
    </LinearGradient>
  );
};
export default Login;
