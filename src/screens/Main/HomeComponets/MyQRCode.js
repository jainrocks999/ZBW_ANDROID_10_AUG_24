import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView,ImageBackground } from "react-native";
import Image from "react-native-scalable-image";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";

import UpcommingEventQRCode from "../../../components/UpcommingEventQRCode";
import PastEventQRCode from "../../../components/PastEventQRCode";
import CurrentEventQRCode from "../../../components/CurrentEventQRCode";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Constants from "../../../Redux/Constants";

const QRCode = () => {
  const navigation=useNavigation()
  const [loader, setLoader] = useState(false)
  const [events, setEvents] = useState()
  const [currentEvents,setCurrentEvents]=useState([])
  const [pastEvents,setPastEvents]=useState([])
  const [upcommingEvents,setUpcommingEvents]=useState([]) 
  const flatList = React.useRef(null)

  useEffect(() => {
      apiCall()
  }, [])

  const apiCall = async () => {

      const user_token = await AsyncStorage.getItem(Storage.user_token)
       console.log('this is user token',user_token);
      let config = {
          method: 'get',
          url: `${Constants.MainUrl}event/applied/event/qr`,
          headers: {
              'Authorization': `${user_token}`
          }
      };
      setLoader(true)
      axios.request(config)
          .then((response) => {
              if (response.data.code == '200') {
                  Toast.show(response.data.message)
                  let allEvents=response.data.data
                  if(allEvents.length>0)
                   allEvents.map((item)=>{
                    if(new Date(item?.events?.date)==new Date()){
                        setCurrentEvents(oldArray => [...oldArray,item] );
                    }
                    else if(new Date(item?.events?.date) < new Date()){
                        setPastEvents(oldArray => [...oldArray,item] );
                    }
                    else if(new Date(item?.events?.date) > new Date()){
                        setUpcommingEvents(oldArray => [...oldArray,item] );
                    }
                   })
                  setLoader(false)
              }
              else {
                  setLoader(false)
                  Toast.show(response.data.message)
              }
          })
          .catch((error) => {
              setLoader(false)
              console.log(error);
          });

  }
const [selectedId, setSelectedId] = useState(1)

    const onSwipeLeft = (gestureState) => {
        if (selectedId == 3) {
            setSelectedId(3)
        }
        else if (selectedId == 2) {
            setSelectedId(selectedId + 1)
            flatList.current.scrollToEnd();
        }
        else {
            setSelectedId(selectedId + 1)
        }
    }

    const onSwipeRight = (gestureState) => {
        if (selectedId == 1) {
            setSelectedId(1)
        }
        else if (selectedId == 2) {
            setSelectedId(selectedId - 1)
            flatList.current.scrollToOffset({ animated: true, offset: 0 });
        }
        else {
            setSelectedId(selectedId - 1)
        }
    }

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    detectSwipeUp: false,
    detectSwipeDown: false,
};


const managePress = (item) => {
    if (item.id == 1) {
        setSelectedId(item.id)
        flatList.current.scrollToOffset({ animated: true, offset: 0 });
    }
    else if (item.id == 3) {
        setSelectedId(item.id)
        flatList.current.scrollToEnd();
    }
    else {
        setSelectedId(item.id)
    }
}

    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {loader?<Loader/>:null}
            <Header
                title={"My QR Code"}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={{ flex: 1 }}>
                <View>
                    <FlatList
                        ref={flatList}
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => managePress(item)}
                                style={{ marginHorizontal: 20, paddingVertical: 10, }}>
                                {selectedId == item.id ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ height: 15, width: 14, backgroundColor: '#FCDA64', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, marginTop: 1 }} />
                                        <Text style={[{
                                            color: selectedId == item.id ? '#000000' : 'grey', fontFamily: selectedId == item.id ? 'Montserrat-SemiBold' : 'Montserrat-Medium', marginLeft: -10, fontSize: 14
                                        }]}>
                                            {item.title}
                                        </Text>
                                    </View> :
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: selectedId == item.id ? 'Montserrat-SemiBold' : 'Montserrat-Medium',
                                        color: 'grey'
                                    }}>{item.title}</Text>
                                }
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <ScrollView>
                <GestureRecognizer
                    onSwipeLeft={(state) => onSwipeLeft(state)}
                    onSwipeRight={(state) => onSwipeRight(state)}
                    config={config}
                    style={{
                        flex: 1,
                    }}>
                    <View style={{ flex: 1 }}>
                        {selectedId == 1 ? <CurrentEventQRCode data={currentEvents==null?[]:currentEvents} /> : null}
                        {selectedId == 2 ? <PastEventQRCode data={pastEvents==null?[]:pastEvents}  onPress={() => onSwipeRight()} /> : null}
                        {selectedId == 3 ? <UpcommingEventQRCode data={upcommingEvents==null?[]:upcommingEvents} onPress={() => setSelectedId(selectedId - 1)} /> : null}
                    </View>
                </GestureRecognizer>
                </ScrollView>
            </View>
        </ImageBackground>
    )
}
export default QRCode;
const data = [{ title: 'Current Events', id: 1, }, { title: 'Past Events', id: 2, }, { title: 'Upcomming Events', id: 3 }]







// {loader?<Loader/>:null}
// <View style={{
//     width: 300,
//     height: 300,
//     borderWidth: 1,
//     borderColor: '#FCDA64',
//     marginBottom: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.26,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 20,
//     elevation: 5,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     alignItems:'center',
//     justifyContent:'center'
// }}>
//     {data?<Image
//         source={{ uri: data.qrcode }}
//     />:null}
// </View>