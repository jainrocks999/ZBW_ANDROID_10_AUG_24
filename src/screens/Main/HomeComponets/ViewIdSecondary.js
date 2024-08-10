import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, Image, PermissionsAndroid, Alert } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Constants from "../../../Redux/Constants";
import Image1 from "react-native-scalable-image";
import Logo from "../../../assets/Icon/DrawerLogo.svg";

const ViewId = ({ route }) => {
  const navigation = useNavigation()
  const [loader, setLoader] = useState(false)
  const [data, setData] = useState()

  useEffect(() => {
    handleMember()
  }, [])

  const handleMember = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token)
    let config = {
      method: 'post',
      // url: `${Constants.MainUrl}member/idcard/sec/member/${route.params.Id}`,
      url: `${Constants.MainUrl}member/idcard/sec/member/${route.params.Id}`,
      headers: {
        'Authorization': `${user_token}`
      }
    };
    setLoader(true)
    axios.request(config)
      .then((response) => {
        console.log('this is response', response.data);
        if (response.data.code == '200') {
          setData(response.data.data)
          setLoader(false)
        }
        else {
          setLoader(false)

        }
      })
      .catch((error) => {
        setLoader(false)
        console.log(error);
      });


  }



  // 
  const renderDate = (date) => {

    const d = new Date(date);
    let day = d.getDate();
    let year = d.getFullYear()
    if (day.length < 2)
      day = '0' + day;
    const month = d.getMonth() + 1
    return (
      <Text numberOfLines={2} style={{ fontSize: 16, marginTop: 4, fontFamily: 'Montserrat-SemiBold', color: '#000' }}>{`${year}-${month}-${day}`}</Text>
    )
  }

 

 



  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'View ID Card'}
        onPress={() => navigation.goBack()}
        download={false}
        onPress1={() => downloadFile()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ImageBackground
        source={require('../../../assets/Icon/Background.png')}
        style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ marginTop: 10 }}>
          <Logo />
        </View>
        {data ? <View style={{ marginTop: 10, }}>
          {data?.member.documents?.employeeSelfie?.location ? 
          <View style={{ height: 126, width: 126, borderRadius: 63, backgroundColor: '#fff', borderWidth: 3 ,borderColor:'#ff7372'}}>
          <Image style={{height: 120, width: 120, borderRadius: 60}}
            source={{ uri: data?.member.documents?.employeeSelfie?.location }} />
            </View>
            :
            <View style={{  height: 120, width: 120, borderRadius: 60, backgroundColor: '#fff', borderWidth: 3 ,borderColor:'#ff7372' }}>
            </View>
          }
        </View> : null}
        {data ? <View style={{ marginTop: 20, alignItems: 'center' }}>

          <Text style={{ fontSize: 24, color: '#000', fontFamily: 'Montserrat-Bold' }}>{`${data?.member?.firstName} ${data?.member?.lastName}`}</Text>
          <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Montserrat-Bold' }}>{`ZBW-${data?.member?.employeeId}`}</Text>

          {data?.qrcode ? <Image1
            source={{ uri: data?.qrcode }}

          /> : null}
          {/* <Text style={{ fontSize: 16, marginTop: 15, fontFamily: 'Montserrat-SemiBold', color: '#000' }}>Director</Text> */}
          <Text style={{ fontSize: 16, marginTop: 4, fontFamily: 'Montserrat-SemiBold', color: '#000' }}>{`Date of Birth : `}{renderDate(data?.member?.dob)}</Text>

          <Text style={{ fontSize: 16, marginTop: 4, fontFamily: 'Montserrat-SemiBold', color: '#000' }}>{`Emergency Contact : ${data?.member?.emergencyContact}`}</Text>
        </View> : null}
      </ImageBackground>
    </View>
  )
}
export default ViewId;