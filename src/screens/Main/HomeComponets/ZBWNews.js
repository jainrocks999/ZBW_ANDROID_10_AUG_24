import React,{useEffect,useState} from "react";
import { View,Text,FlatList,StyleSheet,Dimensions,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Loader from "../../../components/Loader";
import Toast from "react-native-simple-toast";
import axios from "axios";
import HTMLView from "react-native-htmlview";
import Image from "react-native-scalable-image";
import Constants from "../../../Redux/Constants";
const ZBWNews=()=>{
    const navigation=useNavigation()
    const [loader,setLoader]=useState(false)
    const [news,setNews]=useState()
    const [page,setPage]=useState(1)

    useEffect(()=>{
        handleApi()
    },[])

    const handleApi=async()=>{
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        console.log('this is user token',user_token);
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}news/all/1`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            console.log('this is response',response);
            if(response.data.code=='200'){
                setNews(response.data.data)
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

    const handleApiOnReachEnd=async()=>{
        const user_token=await AsyncStorage.getItem(Storage.user_token)
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}news/all/${page}`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
                var newData=response.data.data
                var stateAssetArr = [...news, ...newData]
                setNews(stateAssetArr)
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
            // Toast.show(error.response.data.message)
          })
    }

    return(
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
            {loader?<Loader/>:null}
            <Header
               title={"ZBW News"}
               onPress={()=>navigation.goBack()}
               onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={{paddingHorizontal:25}}>
                <View style={styles.heading}>
                    <Text style={styles.latest}>Latest News</Text>
                </View>
                <View>
                    <FlatList
                     data={news}
                     onEndReachedThreshold={0.5}
                     onEndReached={()=>handleApiOnReachEnd()}
                     style={{marginBottom:130}}
                     renderItem={({item})=>(
                        <View style={styles.view}>                           
                           <Text style={styles.title}>{item.title}</Text>
                           <Text style={styles.date}>{'22 Sept, 2023'}</Text>
                           <HTMLView
                            addLineBreaks={false}
                            value={item.description.trim()
                                .replace(new RegExp('<p>', 'g'), '<span>')}
                        />
                        {item?.multi_image[0]?.image?<View style={{marginTop:20,marginBottom:20}}>
                         <Image
                            width={Dimensions.get('window').width - 68}
                            source={{ uri: item.multi_image[0].image }}></Image>
                        </View>:null}
                        </View>
                     )}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}
export default ZBWNews;
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    heading:{
        borderBottomWidth:1,
        alignSelf:'flex-start',
        borderColor:'#FCDA64',
        marginTop:19
    },
    latest:{
        fontFamily:'Montserrat-Bold',
        fontSize:16,
        color:'#000000'
    },
    view:{
        padding:8,
        borderWidth:1,
        borderColor:'#FCDA64',
        marginVertical:10,
        borderRadius:15
    },
    title:{
        color:'#000000',
        fontSize:15,
        fontFamily:'Montserrat-Bold'
    },
    date:{
        color:'#000000',
        fontSize:12,
        fontFamily:'Montserrat-Regular'
    }
})

const data=[
    {title:'New update available - android',date:'22 Sept, 2023',description:'Update to the latest version of our Android and ios app for a smoother registration Process.... '},
    {title:'New update available - android',date:'22 Sept, 2023',description:'Update to the latest version of our Android and ios app for a smoother registration Process.... '},
    {title:'New update available - android',date:'22 Sept, 2023',description:'Update to the latest version of our Android and ios app for a smoother registration Process.... '},
    {title:'New update available - android',date:'22 Sept, 2023',description:'Update to the latest version of our Android and ios app for a smoother registration Process.... '},

]