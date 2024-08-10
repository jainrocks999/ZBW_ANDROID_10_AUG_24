import React,{useEffect,useState} from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions,Platform ,Alert,ImageBackground} from "react-native";
import Header from "../../../components/CustomHeader";
import Dash from "../../../assets/Icon/Dash.svg";
import Plus from "../../../assets/Icon/Plus.svg";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Constants from "../../../Redux/Constants";

const SecondaryMember = () => {
  const navigation = useNavigation()
  const [loader,setLoader]=useState(false)
  const [member,setMember]=useState()
  const [secondaryMember,setSecondaryMember]=useState()
  const isFocus=useIsFocused()

  useEffect(()=>{
    if(isFocus){
      handleApiCall()
    }
    
  },[isFocus])

  const handleApiCall=async()=>{
    const user_token=await AsyncStorage.getItem(Storage.user_token)
    console.log(user_token);
    setLoader(true)
    axios({
        method: 'get',
        url: `${Constants.MainUrl}member/secondary/member/list`,
        headers: `Authorization: ${user_token}`
      })
      .then(function(response) {
        if(response.data.code=='200'){
          Toast.show(response.data.message )
            setMember(response.data.data)
            setSecondaryMember(response.data.data.secondary_members)
            console.log('this is member list',JSON.stringify(response.data));
            setLoader(false)
        }
        else{
          setLoader(false)
          Toast.show(response.data.message )
        }
      })
      .catch(function(error) {
        setLoader(false)
        console.log('this is reponse fata',error.response.data);
        Toast.show(error.response.data.message)
      })
  }
  const handleDeleteMember=async(id)=>{
    const user_token=await AsyncStorage.getItem(Storage.user_token)
    let config = {
      method: 'get',
      url: `${Constants.MainUrl}member/secondary/member/list/delete/${id}`,
      headers: { 
        'Authorization': `${user_token}`
        }
    };
    setLoader(true)
    axios.request(config)
    .then((response) => {
      if(response.data.code == '200'){
        Toast.show(response.data.message)
        handleApiCall()
        setLoader(false)
      }
      else{
        Toast.show(response.data.message)
        setLoader(false)
      }
    })
    .catch((error) => {
      setLoader(false)
      console.log(error);
    });
    
  }

  return (
    <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
      {loader?<Loader/>:null}
      <Header
        title={'Secondary Member'}
        onPress={() => navigation.goBack()}
        onPress2={()=>navigation.navigate('Notification')}
      />
      <View style={styles.main}>
        <Text style={styles.add}>Add upto 4 Secondary members</Text>
      </View>
      <View style={styles.view}>
        <FlatList
          data={secondaryMember}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <TouchableOpacity
                onPress={()=>{
                  Alert.alert('Confirmation', 'Are you sure you want to Delete Secondary Member?', [
                  {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                  },
                  {text: 'OK', onPress: () =>{
                      handleDeleteMember(item._id)
                  }},
                  ]);
              }}
               style={styles.touch}>
                <Dash />
              </TouchableOpacity>
              <View style={styles.row}>
                <View style={styles.center}>
                  <View style={{ marginTop: -36 }}>
                    <Image style={{height:82,width:82,borderRadius:82}}
                    //  source={item.img}
                      source= {{uri:item.documents.employeeSelfie.location}}
                       />
                  </View>
                </View>
                <Text style={[styles.title,{textAlign:'center'}]}>
                  {`${item.firstName} ${item.lastName}`}
                  {/* {item.title} */}
                  </Text>
                  <TouchableOpacity
                  onPress={()=>{
                    navigation.navigate('ViewIdSecondary',{
                      Id:item._id
                    })
                  }}
                   style={{
                    backgroundColor:'#FCDA64',
                    paddingHorizontal:7,
                    paddingVertical:3,
                    marginTop:10,
                    borderRadius:6
                  }}>
                    <Text style={{marginTop:-2,fontSize:13,color:'#000',fontFamily:'Montserrat-SemiBold'}}>View ID Card</Text>
                  </TouchableOpacity>
              </View>

            </View>
          )}
        />
      </View>
      <View style={styles.position}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddSecondaryMember',{
            memberId:member.member_id
          })}
          style={styles.button}>
          <Plus />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}
export default SecondaryMember;
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  main: { 
    paddingVertical: 10, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  add: { 
    fontFamily: 'Montserrat-Regular', 
    fontSize: 14, 
    color: '#000000' 
  },
  view: { 
    alignItems: 'center', 
    marginTop: 5 
  },
  item: { 
    width: Dimensions.get('window').width/3+28, 
    // width:'40%',
    height: 185, 
    marginHorizontal: 20, 
    marginVertical: 15 
  },
  touch: { 
    borderWidth: 1, 
    height: 15, 
    width: 15, 
    borderColor: '#6B6B6B', 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignSelf: 'flex-end', 
    marginRight: 20 
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5, left: 0, right: 0
  },
  center: {
    height: 60,
    width: 100,
    backgroundColor: '#FCDA64',
    borderBottomLeftRadius: Platform.OS=='android'?50:65,
    borderBottomRightRadius:Platform.OS=='android'?50:65,
    alignItems: 'center',
    // borderWidth:1
  },
  title: { 
    fontFamily: 'Montserrat-Medium', 
    fontSize: 14, 
    color: '#000000', 
    marginTop: 10 
  },
  position: { 
    position: 'absolute', 
    bottom: 30, 
    right: 20 
  },
  button: { 
    height: 48, 
    width: 48, 
    borderRadius: 24, 
    backgroundColor: '#FCDA64', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
})

const data = [
  { title: 'Pradip Ghanekar', img: require('../../../assets/LocalImage/Ellipse9.png') },
  // { title: 'Rahul Rathod', img: require('../../../assets/LocalImage/Ellipse10.png') },
  // { title: 'Mayank Kothari', img: require('../../../assets/LocalImage/Ellipse11.png') },

]