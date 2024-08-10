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
import Edit from "../../../assets/Icon/edit.svg";
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Constants from "../../../Redux/Constants";

const CreatePassword = ({route}) => {
console.log('this is route',route.params);
  const navigation = useNavigation()
  const [code, setCode] = useState('')
  const [mobile,setMobile]=useState(route.params.mobile)
  const [loader,setLoader]=useState(false)

  useEffect(()=>{
      setCode(route.params.data)
  },[])
  
  const resendOtp =()=> {
    if(mobile==''){
      Toast.show('Please enter your phone number')
    }
    else{
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/send/otp`,
        data: {
          "mobile": mobile,
          "action": "reset_password"
        }
      })
    .then(function(response) {
      if(response.data.code=='200'){
        setCode(response.data.data)
        setLoader(false)
        Toast.show(response.data.message )
        console.log('this is response',response.data);
      }
      else{
        setLoader(false)
        Toast.show(response.data.message )
      }
      setLoader(false)
    })
    .catch(function(error) {
      setLoader(false)
      console.log("error", error.response.data)
      Toast.show(error?.response?.data?.message)
    })
   }
  }

  const verifyOtp=()=>{
    // navigation.navigate('ChangePassword')
    if(mobile==''){
      Toast.show('Please enter your phone number')
    }
    else if(JSON.stringify(mobile).length<10){
      Toast.show('Please enter 10 digit phone number')
    }
    else if(code==''){
      Toast.show(`Please enter otp sent on ${mobile}`)
    }
    else{
      setLoader(true)
      axios({
        method: 'post',
        url: `${Constants.MainUrl}user/verify/otp`,
        data: {
          "otp": code,
          "mobile": mobile,
          "action": "reset_password"
      }
      })
    .then(function(response) {
      if(response.data.code=='200'){
        setLoader(false)
        Toast.show(response.data.message )
        navigation.navigate('ChangePassword',{
          mobile:mobile
        })
        console.log('this is response',response.data);
      }
      else{
        setLoader(false)
        Toast.show(response.data.message )
      }
      setLoader(false)
    })
    .catch(function(error) {
      setLoader(false)
      console.log("error", error.response.data)
      Toast.show(error?.response?.data?.message)
      console.log("error", error)
    })
    }
  }


  return (
    <LinearGradient colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']} style={{ flex: 1 }}>
      {loader?<Loader/>:null}
      <ScrollView contentContainerStyle={{flexGrow:1,}}>
      <KeyboardAwareScrollView
      // style={{flex:1}}
      extraScrollHeight={Platform.OS=='android'?-200:100}
       enableOnAndroid={true}
       keyboardShouldPersistTaps="handled"
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       contentContainerStyle={{ flexGrow: 1 }}>    

          <View style={{
            // position:'absolute',bottom:144,left:0,right:0
            }}>
          <View style={styles.lottieView}>
            <View style={{ height: 310 }}>
              <LottieView style={styles.lottie} source={require('../../../assets/Json/Mpin-forgotpass animation.json')} autoPlay loop />
            </View>
          </View>
          <View style={[styles.view,{marginTop:34,height:340}]}>
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
                <View style={styles.black}>
                  <View style={styles.view1}>
                    <Text style={styles.you}>You want to change your password?</Text>
                    <Text style={styles.forgot}>Forgot Password</Text>
                    <View style={{ marginTop: 0 }}>
                      <View style={styles.inputView}>
                      <TextInput style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor={'#FFFFFF'}
                        value={mobile}
                        onChangeText={(val)=>setMobile(val)}
                        keyboardType="number-pad"
                        maxLength={10}
                      />
                        <Edit/>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <OtpInputs
                          handleChange={code => setCode(code)}
                          numberOfInputs={6}
                          // secureTextEntry
                          // value={code}
                          defaultValue={code}
                          // autofillFromClipboard={true}
                          keyboardType={'numeric'}
                          style={styles.inputView1}
                          inputContainerStyles={{width:35,alignItems:'center'}}
                          // inputContainerStyles={[styles.otp]}
                          inputStyles={styles.otp}
                        />
                      </View>
                      
                    </View>
                     <View style={{ marginTop: 15 }}>
                      <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={()=>resendOtp()}
                      >
                      <Text style={styles.resend}>Resend OTP</Text>
                      </TouchableOpacity>
                    </View> 
                  </View>
                  <View style={{ marginTop: 27, alignItems: 'flex-end' }}>
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
export default CreatePassword;