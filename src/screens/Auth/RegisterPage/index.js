import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ForwardArrow from "../../../assets/Icon/ForwardArrow.svg";
import Arrow from "../../../assets/Icon/Arrow.svg";
import Eye from "../../../assets/Icon/eye.svg";
import Eye1 from "../../../assets/Icon/eye1.svg";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import styles from "./styles";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import CheckBox from "@react-native-community/checkbox";
import Modal from "react-native-modal";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import HTMLView from "react-native-htmlview";
import Constants from "../../../Redux/Constants";
import {
  getHash,
  startOtpListener,
  useOtpVerify,
  removeListener
} from 'react-native-otp-verify';


const Register = () => {
  const navigation = useNavigation()
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [business, setBusiness] = useState('')
  const [eye, setEye] = useState(true)
  const [eye1, setEye1] = useState(true)
  const [gst, setGst] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loader, setLoader] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [data, setData] = useState()
  const [isVisible, setVisible] = useState(false)
  const [hashCode,setHashCode]=useState('')


  useEffect(() => {
    getHash().then(hash => {
      // use this hash in the message.
      console.log('thisis hash code',hash[0]);
      setHashCode(hash[0])
    }).catch(console.log);
  
    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{6})/g.exec(message)[1];
     
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
    apiCall()
  }, [])

  const apiCall = async () => {



    let config = {
      method: 'get',
      url: `${Constants.MainUrl}homepage/term/condition`,
      // headers: {
      //     'Authorization': `${user_token}`
      // }
    };
    setLoader(true)
    axios.request(config)
      .then((response) => {
        if (response.data.code == '200') {
          // Toast.show(response.data.message)
          setData(response.data.data)
          setLoader(false)
        }
        else {
          setLoader(false)
          // Toast.show(response.data.message)
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        setLoader(false)
        console.log(error);
      });
  }


  const handleRegister = async () => {

    if (first == '') {
      Toast.show('Please enter your first name')
    }
    else if (last == '') {
      Toast.show('Please enter your last name')
    }
    else if (business == '') {
      Toast.show('Please enter your business name')
    }
    else if (gst == '') {
      Toast.show('Please enter your GST number')
    }
    else if (mobile == '') {
      Toast.show('Please enter your phone number')
    }
    else if (mobile.length < 10) {
      Toast.show('Please enter 10 digit phone number')
    }
    else if (password == '') {
      Toast.show('Please enter your password')
    }
    else if (confirm == '') {
      Toast.show('Please enter your confirm password')
    }
    else if (password != confirm) {
      Toast.show('password and confirm password must be same')
    }
    else if (toggleCheckBox == false) {
      Toast.show('Please agree with Terms and Conditions')
    }
    else {
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/send/otp`,
        data: {
          "mobile": mobile,
          "action": "signup",
          "hashkey":hashCode
        }
      })
        .then(function (response) {
          if (response.data.code == '200') {
            setLoader(false)
            console.log('this is resposs', response.data);
            navigation.navigate('Otp', {
              first: first,
              last: last,
              business: business,
              gst: gst,
              mobile: mobile,
              password: password,
              confirm: confirm,
              data: response.data.data
            })
          }
          else {
            setLoader(false)
            Toast.show(response.data.message)
          }
        })
        .catch(function (error) {
          setLoader(false)
          console.log("error", error)
          Toast.show(error.response.data.message)

        })
    }
  }


  return (
    <LinearGradient colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']} style={{ flex: 1 }}>
      {loader ? <Loader /> : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS=='android'?-200:100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{

          }}>
            <View style={styles.main}>
              <Image style={[styles.logo, { resizeMode: 'contain' }]} source={require('../../../assets/Logo/Zbwa1.png')} />
            </View>
            <View style={[styles.view, { marginTop: 30, height: 530 }]}>
              <View style={styles.yellow}>
                <View style={styles.login}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.loginText}>Login </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginButton}>
                    <ForwardArrow />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -10, marginBottom: 15, marginLeft: 35 }}>
                  <CheckBox
                    style={{ height: 25, width: 30 }}
                    //  disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    //  tintColors={{true: '#FCDA64', false: '#FCDA64'}}
                    //  onTintColor='#FCDA64'
                    //  onCheckColor='#FCDA64'    
                    tintColors={{ true: '#000', false: '#000' }}
                    onTintColor='#000'
                    onCheckColor='#000'
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, marginLeft: 10, color: '#000' }}>{'I agree to the '}</Text>
                    <View style={{ borderBottomWidth: Platform.OS == 'ios' ? 1 : 0 }}>
                      <Text onPress={() => setVisible(true)} style={{ borderBottomWidth: 1, borderBottomColor: '#000', fontSize: 15, color: '#000' }}>Terms and Conditions</Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.black}>
                    <View style={styles.padding}>
                      <Text style={styles.new}>New user?</Text>
                      <Text style={styles.sign}>Sign up</Text>
                      <View style={[styles.border, { marginTop: 20 }]}>
                        <TextInput style={styles.input}
                          placeholder="First Name"
                          placeholderTextColor={'#FFFFFF'}
                          value={first}
                          onChangeText={(val) => setFirst(val)}
                          keyboardType="default"
                        />
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <TextInput style={styles.input}
                          placeholder="Last Name"
                          placeholderTextColor={'#FFFFFF'}
                          value={last}
                          onChangeText={(val) => setLast(val)}
                          keyboardType="default"
                        />
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <TextInput style={styles.input}
                          placeholder="Business Name"
                          placeholderTextColor={'#FFFFFF'}
                          value={business}
                          onChangeText={(val) => setBusiness(val)}
                          keyboardType="default"
                        />
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <TextInput style={styles.input}
                          placeholder="GST Number"
                          placeholderTextColor={'#FFFFFF'}
                          value={gst}
                          onChangeText={(val) => setGst(val)}
                          keyboardType="default"
                        />
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <Text style={[styles.ninety, { marginTop:Platform.OS=='android'?2: 5 }]}>+91</Text>
                        <TextInput style={[styles.input,{marginLeft:5}]}
                          placeholder="Phone Number"
                          placeholderTextColor={'#FFFFFF'}
                          keyboardType="number-pad"
                          value={mobile}
                          onChangeText={(val) => setMobile(val)}
                          maxLength={10}
                        />
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <TextInput style={styles.input}
                          placeholder="Password"
                          placeholderTextColor={'#FFFFFF'}
                          value={password}
                          onChangeText={(val) => setPassword(val)}
                          keyboardType="default"
                          secureTextEntry={eye}
                        />
                        {/* <Eye /> */}
                        {eye ?
                          <TouchableOpacity style={{ padding: 6 }} onPress={() => setEye(!eye)}>
                            <Eye />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity style={{ padding: 6 }} onPress={() => setEye(!eye)}>
                            <Eye1 />
                          </TouchableOpacity>
                        }
                      </View>
                      <View style={[styles.border, { marginTop: 15 }]}>
                        <TextInput style={styles.input}
                          placeholder="Confirm Password"
                          placeholderTextColor={'#FFFFFF'}
                          value={confirm}
                          onChangeText={(val) => setConfirm(val)}
                          keyboardType="default"
                          secureTextEntry={eye1}
                        />
                        {/* <Eye /> */}
                        {eye1 ?
                          <TouchableOpacity style={{ padding: 6 }} onPress={() => setEye1(!eye1)}>
                            <Eye />
                          </TouchableOpacity>
                          :
                          <TouchableOpacity style={{ padding: 6 }} onPress={() => setEye1(!eye1)}>
                            <Eye1 />
                          </TouchableOpacity>
                        }
                      </View>

                    </View>
                    <View style={{ marginTop: 30, alignItems: 'flex-end' }}>
                      <TouchableOpacity
                        onPress={() => handleRegister()}
                        style={styles.button}>
                        <Text style={styles.signup}>Sign up</Text>
                        <Arrow />
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
              </View>

            </View>

          </View>

          <View style={{ height: 160 }} />
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* <SafeAreaView style={{flex:1}}> */}
      <Modal isVisible={isVisible}>
        <View style={{
          backgroundColor: '#FDEDB1',
          borderRadius: 16,
          paddingBottom: 20,
          // overflow: 'hidden',
          marginTop:Platform.OS=='android'?0:50

        }}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{ alignSelf: 'flex-end', margin: 5 }}>
            <CircleCross />
          </TouchableOpacity>
          <ScrollView style={{ padding: 20 }}>
            {data ? <HTMLView
              value={data
                .trim()
                .replace(new RegExp('<p>', 'g'), '<span>')
              }
              addLineBreaks={false}
            /> : null}
            <View style={{ height: 30 }} />
          </ScrollView>

        </View>
      </Modal>
      {/* </SafeAreaView> */}
    </LinearGradient>
    // </View>
  )
}
export default Register;