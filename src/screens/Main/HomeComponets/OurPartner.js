import react, { useState ,useEffect} from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image,Linking,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import Plus from "../../../assets/Icon/Plus.svg";
import Modal from "react-native-modal";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import Partner from "../../../assets/LocalImage/Partner.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Loader from "../../../components/Loader";
import Toast from "react-native-simple-toast";
import axios from "axios";
import Constants from "../../../Redux/Constants";


const OurPartner = () => {
    const navigation = useNavigation()
    const [isVisible, setVisible] = useState(false)
    const [loader,setLoader]=useState(false)
    const [partner,setPartner]=useState()
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
            url: `${Constants.MainUrl}partner/all/1`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
                console.log('this is response',response.data.data);
                setPartner(response.data.data)
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
            url: `${Constants.MainUrl}partner/all/${page}`,
            headers: `Authorization: ${user_token}`
          })
          .then(function(response) {
            if(response.data.code=='200'){
                console.log('this is response',response.data.data);
                var newData=response.data.data
                var stateAssetArr = [...partner, ...newData]
                setPartner(stateAssetArr)
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
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
            {loader?<Loader/>:null}
            <Header
                title={'Our Partners'}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={styles.main}>
                <FlatList
                    data={partner}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>handleApiOnReachEnd()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => setVisible(true)}
                            style={styles.view}>
                            <View style={[styles.view1,{width:'100%'}]}>
                                <View style={{width:'30%'}}>
                                    {/* {item.complainNumber} */}
                                    <Image 
                                    resizeMode="contain" 
                                    style={{width:100,height:80}}
                                     source={{uri:item.logo.location}}/>
                                </View>
                                <View style={{ marginLeft: 10,width:'65%' }}>
                                    <Text style={styles.title}>{item.name}</Text>
                                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${item.number}`)}>
                                    <Text style={styles.number}>{item.number}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>Linking.openURL(`mailto:${item.email}`)}>
                                    <Text style={styles.email}>{item.email}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground>
    )
}
export default OurPartner;
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    main: { 
        paddingHorizontal: 25, 
        paddingTop: 24 
    },
    view: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#fff',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    view1: { 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        // alignItems: 'center' 
    },
    title: { 
        fontSize: 14, 
        fontFamily: 'Montserrat-SemiBold', 
        color: '#000000' ,
        width:'90%'
    },
    number: { 
        color: '#000000', 
        fontSize: 12, 
        fontFamily: 'Montserrat-Regular', 
        marginTop: 6 
    },
    email: { 
        color: '#000000', 
        fontSize: 12, 
        fontFamily: 'Montserrat-Regular', 
        marginTop: 6 
    }
})
const data = [
    { title: 'Ambr Xpress\nLogistic', complainNumber: <Partner />, email: 'info@axlpl.com', number: '9136140340', },

]