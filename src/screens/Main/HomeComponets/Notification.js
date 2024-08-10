import React,{useState,useEffect} from "react";
import { View,FlatList,Text, ImageBackground } from "react-native";
import axios from "axios";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Header from "../../../components/CustomHeader";
import {useNavigation} from "@react-navigation/native";
import Loader from "../../../components/Loader";
import Constants from "../../../Redux/Constants";

const Notification=()=>{

    const [data,setData]=useState()
    const [loader,setLoader]=useState(false)
    const navigation=useNavigation()
    const [page,setPage]=useState(1)
    


    
    useEffect(() => {
        apiCall()
    }, [])

    const apiCall = async () => {

        const user_token = await AsyncStorage.getItem(Storage.user_token)

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}pushnotification/notification/1`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                if (response.data.code == '200') {
                    // Toast.show(response.data.message)
                    setData(response.data.data)
                    setPage(page+1)
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

    const handleApiOnReachEnd=async()=>{
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}pushnotification/notification/${page}`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            console.log('after recall',response.data);
            if(response.data.code=='200'){
                var newData=response.data.data
                var stateAssetArr = [...data, ...newData]
                // setNews(stateAssetArr)
                setData(stateAssetArr)
                setPage(page+1)
                setLoader(false)
            }
            else{
              setLoader(false)
              Toast.show(response.data.message )
            }
          })
          .catch(function(error) {
            setLoader(false)
            console.log("error", error.response.data)
            Toast.show(error.response.data.message)
          })
    }

    const renderDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let year=d.getFullYear()
        if (day.length < 2)
            day = '0' + day;
        const month = d.toLocaleString('default', { month: 'short' });
        return (
            <Text numberOfLines={2} style={{color: '#000', fontFamily: 'Montserrat-Regular', fontSize: 13,marginTop:3}}>{`${day} ${month}, ${year}`}</Text>
        )
    }
    return(
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={{flex:1,backgroundColor:'#fff'}}>
            {loader?<Loader/>:null}
            <Header
             title={'Notification'}
             onPress={() => navigation.goBack()}
             notification={true}
             
            />
            <View style={{marginTop:15}}>
                <FlatList
                 data={data}
                 style={{marginBottom:60}}
                 onEndReachedThreshold={0.5}
                 onEndReached={()=>handleApiOnReachEnd()}
                 renderItem={({item})=>(
                    <View style={{
                        marginHorizontal:15,
                        borderWidth:1,
                        marginBottom:15,
                        padding:8,
                        borderRadius:6,
                        borderWidth: 1,
                        borderColor: '#FCDA64',
                        borderRadius: 10,
                        shadowColor: '#fff',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 20,
                        elevation: 5,
                        backgroundColor: '#FFFFFF',
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        }}>
                        <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-SemiBold'}}>{item.title}</Text>
                        <Text style={{fontSize:13,color:'#000',fontFamily:'Montserrat-Regular',marginTop:3}}>{item.description}</Text>
                        {renderDate(item.createdAt)}
                        {/* <Text style={{fontFamily:'Montserrat-Regular',color:'#000',fontSize:13,marginTop:3}}>{item.createdAt}</Text> */}
                    </View>
                 )}
                />

            </View>

        </ImageBackground>
    )
}
export default Notification;
const data1=[
    {title:'Here are tha data sjflsdafj kjf lkj fsdjfl kdjflks',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},
    {title:'Here are tha data',description:'this is details as per time and here are member'},

]