import React, {useState, useEffect} from 'react';
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
import BackArrow from '../../../assets/Icon/BackArrow.svg';
import Arrow from '../../../assets/Icon/Arrow.svg';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Edit from '../../../assets/Icon/edit.svg';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import Constants from '../../../Redux/Constants';
import {
  getHash,
  startOtpListener,
  useOtpVerify,
  removeListener,
} from 'react-native-otp-verify';
// import auth from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState('');
  const [show, setShow] = useState(false);
  const [hashCode, setHashCode] = useState('');
  const {hash, otp, message, timeoutError, stopListener, startListener} =
    useOtpVerify({numberOfDigits: 6});

  console.log('this is hash code', hashCode);
  useEffect(() => {
    getHash()
      .then(hash => {
        // use this hash in the message.
        console.log('thisis hash code', hash[0]);
        setHashCode(hash[0]);
      })
      .catch(console.log);

    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      try {
        const otp = /(\d{6})/g.exec(message)[1];
        console.log('this is otp code', message);
        setCode(otp);
      } catch (error) {
        console.log(error);
      }

      // setOtp(otp);
    });
    return () => removeListener();
  }, []);

  const manageSend = () => {
    if (mobile == '') {
      Toast.show('Please enter your phone number');
    } else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number');
    } else {
      setLoader(true);
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/send/otp`,
        data: {
          mobile: mobile,
          action: 'reset_password',
          hashkey: hashCode,
        },
      })
        .then(function (response) {
          if (response.data.code == '200') {
            setLoader(false);
            Toast.show(response.data.message);
            setShow(true);
            console.log('this is response', response.data);
            // navigation.replace('CreatePassword',{
            //   data:response.data.data,
            //   mobile:mobile
            // })
          } else {
            setLoader(false);
            Toast.show(response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          setLoader(false);
          console.log('error', error);
          Toast.show(error?.response?.data?.message);
        });
    }
  };

  const resendOtp = () => {
    if (mobile == '') {
      Toast.show('Please enter your phone number');
    } else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number');
    } else {
      setLoader(true);

      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/send/otp`,
        data: {
          mobile: mobile,
          action: 'reset_password',
          hashkey: hashCode,
        },
      })
        .then(function (response) {
          if (response.data.code == '200') {
            setLoader(false);
            setShow(true);
            Toast.show(response.data.message);
            console.log('this is response', response.data);
          } else {
            setLoader(false);
            Toast.show(response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          setLoader(false);
          console.log('error', error.response.data);
          Toast.show(error?.response?.data?.message);
        });
    }
  };

  const verifyOtp = () => {
    if (mobile == '') {
      Toast.show('Please enter your phone number');
    } else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number');
    } else if (code == '') {
      Toast.show(`Please enter otp sent on ${mobile}`);
    } else if (code.length < 6) {
      Toast.show(`Please enter 6 digit otp `);
    } else {
      setLoader(true);
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/verify/otp`,
        data: {
          otp: code,
          mobile: mobile,
          action: 'reset_password',
        },
      })
        .then(function (response) {
          if (response.data.code == '200') {
            setLoader(false);
            Toast.show(response.data.message);
            navigation.navigate('ChangePassword', {
              mobile: mobile,
            });
            console.log('this is response', response.data);
          } else {
            setLoader(false);
            Toast.show(response.data.message);
          }
          setLoader(false);
        })
        .catch(function (error) {
          setLoader(false);
          console.log('error', error.response.data);
          Toast.show(error?.response?.data?.message);
          console.log('error', error);
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
          <View>
            <View style={[styles.view]}>
              <View style={{height: 310}}>
                <LottieView
                  style={styles.lottie}
                  source={require('../../../assets/Json/OTP Animation.json')}
                  autoPlay
                  loop
                />
              </View>
            </View>
            <View style={[styles.main, {marginTop: 30, height: 310}]}>
              <View style={styles.yellow}>
                <View style={styles.high}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.back}>Back </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}
                    style={styles.arrowContainer}>
                    <BackArrow />
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.container}>
                    <View style={styles.padding}>
                      <Text style={styles.you}>
                        You want to change your password?
                      </Text>
                      <Text style={styles.forgot}>Forgot Password</Text>
                      <View style={{marginTop: 0}}>
                        <View style={styles.inputViews}>
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
                          {show ? (
                            <Edit />
                          ) : (
                            <View>
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  backgroundColor: '#FCDA64',
                                  paddingHorizontal: 4,
                                  paddingVertical: 2,
                                  borderRadius: 6,
                                }}
                                onPress={() => manageSend()}>
                                <Text style={styles.otpText}>OTP</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      </View>
                      {show ? (
                        <View style={{marginTop: 10}}>
                          <OtpInputs
                            handleChange={code => setCode(code)}
                            numberOfInputs={6}
                            // secureTextEntry
                            // value={code}
                            defaultValue={code}
                            autofillFromClipboard={false}
                            keyboardType={'numeric'}
                            style={styles.inputView1}
                            inputContainerStyles={{
                              width: 35,
                              alignItems: 'center',
                            }}
                            // inputContainerStyles={[styles.otp]}
                            inputStyles={styles.otp1}
                          />
                        </View>
                      ) : null}
                      {show ? (
                        <View style={{marginTop: 15}}>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => resendOtp()}>
                            <Text style={styles.resend}>Resend OTP</Text>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                    </View>
                    <View
                      style={{
                        marginTop: show ? 27 : 105,
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => verifyOtp()}
                        disabled={code ? false : true}
                        activeOpacity={0.5}
                        style={[
                          styles.touch,
                          {backgroundColor: code ? '#FCDA64' : '#C7BFA2'},
                        ]}>
                        <Text style={styles.verify}>Verify</Text>
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
export default ForgotPassword;
