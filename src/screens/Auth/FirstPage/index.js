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
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import {
  EntryExitTransition,
  SharedTransitionType,
} from 'react-native-reanimated';
import Constants from '../../../Redux/Constants';

const Login = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const userLogin = () => {
    if (mobile == '') {
      Toast.show('Please enter your phone number');
    } else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number');
    } else {
      setLoader(true);
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/check/first/login`,
        data: {
          mobile: mobile,
        },
      })
        .then(function (response) {
          if (response.data.code == '200') {
            setLoader(false);
            Toast.show(response.data.message);
            console.log('this detal', response.data);
            if (response.data.data == null) {
              navigation.replace('Login');
            }
            if (response.data.data.firstLogin == false) {
              navigation.replace('Login');
            } else if (response.data.data.firstLogin == true) {
              // setMobile('')
              // navigation.replace('Login')
              navigation.navigate('CreatemPinForOldUser', {
                data: response.data.data._id,
                mobile: mobile,
              });
            }
            // data:response.data.data._id
            // navigation.replace('Home')
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
              {/* <Image source={require('../../../assets/Logo/diamond.png')}/> */}
              <Image
                style={styles.logo}
                source={require('../../../assets/Logo/Zbwa1.png')}
              />
            </View>
            <View style={[styles.container, {marginTop: 30, height: 350}]}>
              <View style={styles.yellow}>
                <View style={styles.view}>
                  <View style={{flexDirection: 'row'}}>
                    {/* <Text style={styles.signup}>Sign up </Text>
                  <Text style={styles.free}>for free</Text> */}
                  </View>
                  {/* <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('RegisterPage')}
                  style={styles.arrowContainer}>
                  <ForwardArrow />
                </TouchableOpacity> */}
                </View>
                <View style={{alignItems: 'center', marginTop: 23}}>
                  <View style={styles.black}>
                    <View style={{paddingHorizontal: 40, marginTop: 10}}>
                      <Text style={styles.already}>
                        Please enter mobile number first
                      </Text>
                      <Text style={styles.login}>Verification</Text>
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
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginTop: 120,
                      }}>
                      <TouchableOpacity
                        onPress={() => userLogin()}
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
