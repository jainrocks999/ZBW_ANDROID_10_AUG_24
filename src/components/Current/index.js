import React,{useState,useEffect} from "react";
import { View, Text, FlatList, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Loader from "../Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../LocalStorage";
import Toast from "react-native-simple-toast";
import Image from "react-native-scalable-image";
import { useNavigation } from "@react-navigation/native";
import Constants from "../../Redux/Constants";

const Current = () => {
    
    const [loader,setLoader]=useState(false)
    const [currentData,setCurrentData]=useState()
    const navigation=useNavigation()
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
            url: `${Constants.MainUrl}event/all/current/1`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
                console.log('this is response',response.data.data);
                setCurrentData(response.data.data)
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
        console.log('this is user token',user_token);
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}event/all/current/${page}`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
                console.log('this is response',response.data.data);
                // setCurrentData(response.data.data)
                var newData=response.data.data
                var stateAssetArr = [...currentData, ...newData]
                setCurrentData(stateAssetArr)
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

    


    return (
        <View style={styles.container}>
            {loader?<Loader/>:null}
            <FlatList
                data={currentData}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                onEndReached={()=>handleApiOnReachEnd()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('EventDetails',{
                        id:item._id
                    })}
                    style={styles.main}>
                       
                         {item.images[0].image?<Image
                            width={Dimensions.get('window').width - 50}
                            source={{ uri: item.images[0].image }}>
                        </Image>:
                         <View style={{
                            width:Dimensions.get('window').width - 50,
                            height:105,
                            alignItems:'center',
                            justifyContent:'center'
                            }}>
                            <Text>Image not Found</Text>
                            </View>
                        }
                        <View style={[styles.view, { alignSelf: 'flex-end', marginTop: -27, marginBottom: 10, marginRight: 10 }]}>
                        <Text style={styles.live}>{item.status}</Text>
                        </View>
                        <View style={styles.view2}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}

export default Current;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#FFFFFF'
    },
    main: {
        marginBottom: 20,
        width: Dimensions.get('window').width - 50
    },
    background: {
        width: Dimensions.get('window').width - 50,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: 120,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingBottom: 10
    },
    view: {
        width: 40,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCDA64',
        borderRadius: 10
    },
    live: {
        color: '#000000',
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        marginTop: -2
    },
    view2: {
        backgroundColor: '#FCDA64',
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    title: {
        color: '#000000',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12
    }
})

const data = [
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet' },
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet' },
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet' },
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet' }
]

