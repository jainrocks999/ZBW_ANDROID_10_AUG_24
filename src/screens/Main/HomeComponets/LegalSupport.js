import React,{useEffect,useState} from "react";
import { View, Text, TextInput, FlatList, Image,Platform, StyleSheet,Dimensions,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import Constants from "../../../Redux/Constants";

const LegalSupport = () => {
    const navigation = useNavigation()
    const [loader,setLoader]=useState(false)
    const [data,setData]=useState()
    const [page,setPage]=useState(1)


    useEffect(()=>{
          apiCall()
    },[])

    const apiCall=async()=>{
    
        const user_token=await AsyncStorage.getItem(Storage.user_token)

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}legalsupport/all/1`,
            headers: { 
              'Authorization': `${user_token}`
            }
          };
          setLoader(true)
          axios.request(config)
          .then((response) => {
            if(response.data.code=='200'){
                Toast.show(response.data.message)
                setData(response.data.data)
                setPage(page+1)
                setLoader(false)
            }
            else{
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

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}legalsupport/all/${page}`,
            headers: { 
              'Authorization': `${user_token}`
            }
          };
          setLoader(true)
          axios.request(config)
          .then((response) => {
            if(response.data.code=='200'){
                Toast.show(response.data.message)
                var newData=response.data.data
                var stateAssetArr = [...news, ...newData]
                setData(stateAssetArr)
                setPage(page+1)
                setLoader(false)
            }
            else{
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

    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
            {loader?<Loader/>:null}
            <Header
                title={'Legal Support'}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={styles.main}>
                <FlatList
                    data={data}
                    numColumns={2}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>handleApiOnReachEnd()}
                    style={{marginBottom:50}}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View style={styles.view}>
                                <View style={styles.view1}>
                                    <View style={{ marginTop: -36 }}>
                                        <Image
                                        resizeMode="center"
                                        style={{height:82,width:82,borderRadius:82}}
                                         source={{uri:item.upload_image}} />
                                    </View>
                                </View>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.post}>{item.post}</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    )
}
export default LegalSupport;
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    main: { 
        alignItems: 'center', 
        marginTop: 25 
    },
    item: { 
        // width: '40%', 
        // height: 135, 
        // marginHorizontal: 20, 
        // marginVertical: 15 
        width: Dimensions.get('window').width/3+28, 
    // width:'40%',
    height: 155, 
    marginHorizontal: 20, 
    marginVertical: 15 
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 5, left: 0, right: 0
    },
    view1: {
        height: 60,
        width: 100,
        backgroundColor: '#FCDA64',
        borderBottomLeftRadius: Platform.OS=='android'?50:65,
        borderBottomRightRadius:Platform.OS=='android'?50:65,
        alignItems: 'center'
    },
    title: { 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 14, 
        color: '#000000', 
        marginTop: 8, 
        textAlign: 'center' 
    },
    post: { 
        fontFamily: 'Montserrat-Medium', 
        fontSize: 12, 
        color: '#000000', 
        marginTop: 2, 
        textAlign: 'center' 
    }
})
const data = [
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse9.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse10.png') },
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse11.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse9.png') },
    { title: 'Adv. Rajesh \nThakkar', img: require('../../../assets/LocalImage/Ellipse10.png') },
    { title: 'Adv. Sunny \nJain', img: require('../../../assets/LocalImage/Ellipse11.png') },

]