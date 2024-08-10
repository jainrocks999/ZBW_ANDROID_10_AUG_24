import React, { useState, useEffect } from "react";
import { View,Text, ScrollView,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import Constants from "../../../Redux/Constants";

const Term =()=>{
   
  const navigation = useNavigation()
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
      apiCall()
  }, [])

  const apiCall = async () => {

      const user_token = await AsyncStorage.getItem(Storage.user_token)

      let config = {
          method: 'get',
          url: `${Constants.MainUrl}homepage/term/condition`,
          headers: {
              'Authorization': `${user_token}`
          }
      };
      setLoader(true)
      axios.request(config)
          .then((response) => {
              if (response.data.code == '200') {
                  Toast.show(response.data.message)
                  setData(response.data.data)
                  setLoader(false)
              }
              else {
                  setLoader(false)
                  Toast.show(response.data.message)
              }
              console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
              setLoader(false)
              console.log(error);
          });

  }
  console.log('this is data',data);
    return(
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={{flex:1,backgroundColor:'#FFFFFF'}}>
           {loader ? <Loader /> : null}
          <Header
          title={'Terms of Service'}
          onPress={()=>navigation.goBack()}
          onPress2={()=>navigation.navigate('Notification')}
          />
           <ScrollView style={{padding:20}}>
           {data? <HTMLView
                value={data
                  .trim()
                    .replace(new RegExp('<p>', 'g'), '<span>')
                  }
                addLineBreaks={false}
            />:null}
            <View style={{height:30}}/>
            </ScrollView>
        </ImageBackground>
    )
}
export default Term;