import React, { useState,useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView,Platform } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackArrow from "../../../assets/Icon/BackArrow.svg";
import Arrow from "../../../assets/Icon/Arrow.svg";
import { useNavigation } from "@react-navigation/native";
import OtpInputs from "react-native-otp-inputs";
import styles from "./style";
import LinearGradient from "react-native-linear-gradient";
import LottieView from 'lottie-react-native';
import axios from "axios";
import Loader from "../../../components/Loader";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Constants from "../../../Redux/Constants";
import {
  getHash,
  startOtpListener,
  useOtpVerify,
  removeListener
} from 'react-native-otp-verify';

const OtpPage = ({route}) => {
  const navigation = useNavigation()
  const data=route.params
  // console.log('this is route data',data);
  const [code, setCode] = useState()
  const [mobile,setMobile]=useState(data.mobile)
  const [loader,setLoader]=useState(false)
  const [hashCode,setHashCode]=useState('')

  const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 6});


  useEffect(() => {
    getHash().then(hash => {
      // use this hash in the message.
      setHashCode(hash[0])
      console.log('thisis hash code',hash);
    }).catch(console.log);
  
    startOtpListener(message => {
      try {
        const otp = /(\d{6})/g.exec(message)[1];
        console.log('this is otp code',otp);
        setCode(otp)
      } catch (error) {
        console.log(error);
      }
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      
      // setOtp(otp);
    });
    return () => removeListener();
  }, []);



  const verifyOtp =async()=>{
    console.log('this is otp code',code);
    const fcm_token=await AsyncStorage.getItem(Storage.fcm_token)
    console.log(fcm_token);
    if(mobile==''){
      Toast.show('Please enter your phone number')
    }
    else if(code==''){
      Toast.show('Please enter otp code')
    }
    
    else{
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/signup`,
        data: {
          "mobile": mobile,
          "password": data.password,
          "first_name": data.first,
          "last_name": data.last,
          "business_name": data.business,
          "gst": data.gst,
          "email": "",
          "otp": code,
          "fcm_token":fcm_token==null?'':fcm_token
        }
      })
      .then(function(response) {
        if(response.data.code=='200'){
          setLoader(false)
          navigation.replace('PinScreen',{
            data:response.data.data._id
          })
        }
        else{
          setLoader(false)
          Toast.show(response.data.message )
        }
      })
      .catch(function(error) {
        setLoader(false)
        Toast.show(error?.response?.data?.message)
        console.log("error", error?.response?.data?.message)
      })
   }
  }

  const resendOtp=()=>{
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
          Toast.show(response.data.message)
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

 
  return (
    <LinearGradient colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']} style={{ flex: 1 }}>
       {loader?<Loader/>:null}
       <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
        <KeyboardAwareScrollView
         extraScrollHeight={Platform.OS=='android'?-200:100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          
          <View style={{}}>
          <View style={styles.view}>
            <View style={{ height: 310 }}>
              <LottieView style={styles.lottie} source={require('../../../assets/Json/OTP Animation.json')} autoPlay loop />
            </View>
          </View>
          <View style={[styles.main,{marginTop:44,height:340}]}>
            <View style={styles.yellow}>
              <View style={styles.backView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.back}>Back </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.goBack()}
                  style={styles.arrow}>
                  <BackArrow />
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={styles.view1}>
                  <View style={styles.view2}>
                    <Text style={styles.verify1}>Verify your phone number</Text>
                    <Text style={styles.otp1}>OTP</Text>
                    <View style={[styles.border, { marginTop: 20 }]}>
                    <TextInput style={styles.input}
                          placeholder="Phone Numbers"
                          placeholderTextColor={'#FFFFFF'}
                          value={mobile}
                          onChangeText={(val) => setMobile(val)}
                          keyboardType="number-pad"
                          editable={false}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <OtpInputs
                        handleChange={code => setCode(code)}
                        numberOfInputs={6}
                        autofillFromClipboard={false}
                        keyboardType={'numeric'}
                        style={styles.inputView}
                        defaultValue={code}
                        // value={code}
                        inputContainerStyles={{width:35,alignItems:'center'}}
                        inputStyles={styles.otp}
                      />
                    </View>
                    <View style={{ marginTop: 10 }}>
                      <TouchableOpacity 
                      onPress={()=>resendOtp()}
                      activeOpacity={0.5}>
                      <Text style={styles.resend}>Resend OTP</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[styles.buttonContainer,{marginTop:17}]}>
                    <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>verifyOtp()}
                     style={styles.button}>
                      <Text style={styles.verify}>Verify</Text>
                      <Arrow />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          </View>
          <View style={{height:140}}/>
      </KeyboardAwareScrollView>
      </ScrollView>
    </LinearGradient>
  )
}
export default OtpPage;