import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView ,Platform} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BackArrow from "../../../assets/Icon/BackArrow.svg";
import Arrow from "../../../assets/Icon/Arrow.svg";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import LottieView from 'lottie-react-native';
import axios from "axios";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Eye from "../../../assets/Icon/eye.svg";
import Eye1 from "../../../assets/Icon/eye1.svg";
import Constants from "../../../Redux/Constants";

const SetPin = ({route}) => {

  const navigation = useNavigation()
  const [pin,setPin]=useState('')
  const [confirm,setConfirm]=useState('')
  const [loader,setLoader]=useState(false)
  const [eye,setEye]=useState(true)
  const [eye1,setEye1]=useState(true)

  const createPin =async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    if(pin==''){
      Toast.show('Please enter new mPIN')
    }
    else if(pin.length<4){
      Toast.show('Please enter 4 digit mPIN')
    }
    else if(confirm==''){
      Toast.show('Please enter confirm mPIN')
    }
    else if(confirm.length<4){
      Toast.show('Please enter 4 digit confirm mPIN')
    }
    else if(pin!=confirm){
      Toast.show('mPIN and confirm mPIN need to be same')
    }
    else{
      setLoader(true)
    axios({
      method: 'post',
      url: `${Constants.MainUrl}user/set/mpin`,
      data: {
        "mpin": pin,
        "userId":route.params.data
      }
    })
    .then(function(response) {
      if(response.data.code=='200'){
        setLoader(false)
        console.log('this is resposs',response.data);
        Toast.show(response.data.message )
        AsyncStorage.setItem(Storage.user_id,response.data.data._id)
        AsyncStorage.setItem(Storage.username,`${response.data.data.firstName} ${response.data.data.lastName}`)
        AsyncStorage.setItem(Storage.user_token,response.data.data.token)
        AsyncStorage.setItem(Storage.isPremium,JSON.stringify(response.data.data.isPrimary))
        // navigation.replace('Home')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      }
      else{
        setLoader(false)
        Toast.show(response.data.message )
      }
    })
    .catch(function(error) {
      setLoader(false)
      Toast.show(error.response.data.message)
      console.log("error", error)
    })
   }
  }



  return (
    <LinearGradient colors={['#FFFBD3', '#FFFFFF', '#FFF8BA']} style={{ flex: 1 }}>
      {loader?<Loader/>:null}
      <ScrollView contentContainerStyle={{flexGrow:1,}}>
      <KeyboardAwareScrollView
       extraScrollHeight={Platform.OS=='android'?-200:100}
       enableOnAndroid={true}
       keyboardShouldPersistTaps="handled"
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       contentContainerStyle={{ flexGrow: 1 }}>    
          <View>
            <View style={styles.lottieView}>
            <View style={{ height: 310 }}>
              <LottieView style={styles.lottie} source={require('../../../assets/Json/Mpin-forgotpass animation.json')} autoPlay loop />
            </View>
          </View>
          <View style={[styles.view,{marginTop:38,height:340}]}>
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
                    <Text style={styles.you}>Setup your mPIN?</Text>
                    <Text style={styles.forgot}>mPIN</Text>
                    <View style={{ marginTop: 0 }}>
                      <View style={styles.inputView}>
                        <TextInput style={styles.input}
                          placeholder="New mPIN"
                          keyboardType="number-pad"
                          placeholderTextColor={'#FFFFFF'}
                          value={pin}
                          onChangeText={(val)=>setPin(val)}
                          maxLength={4}
                          secureTextEntry={eye}
                        />
                        {eye?
                      <TouchableOpacity style={{padding:6}} onPress={()=>setEye(!eye)}>
                      <Eye/>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={{padding:6}} onPress={()=>setEye(!eye)}>
                      <Eye1/>
                      </TouchableOpacity>
                      }
                      </View>
                      <View style={styles.inputView}>
                        <TextInput style={styles.input}
                          placeholder="Confirm mPIN"
                          keyboardType="number-pad"
                          placeholderTextColor={'#FFFFFF'}
                          value={confirm}
                          onChangeText={(val)=>setConfirm(val)}
                          maxLength={4}
                          secureTextEntry={eye1}
                        />
                         {eye1?
                      <TouchableOpacity style={{padding:6}} onPress={()=>setEye1(!eye1)}>
                      <Eye/>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity style={{padding:6}} onPress={()=>setEye1(!eye1)}>
                      <Eye1/>
                      </TouchableOpacity>
                      }
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 57, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                     onPress={()=>createPin()}
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
export default SetPin;