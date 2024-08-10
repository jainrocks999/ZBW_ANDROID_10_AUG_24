import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Loader from "../Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../LocalStorage";
import Toast from "react-native-simple-toast";
import Image from "react-native-scalable-image";
import { useNavigation } from "@react-navigation/native";
import Constants from "../../Redux/Constants";

const Past = () => {
    const [loader, setLoader] = useState(false)
    const [pastData, setPastData] = useState()
    const navigation =useNavigation()
    const [page,setPage]=useState(1)

    useEffect(() => {
        handleApi()
    }, [])

    const handleApi = async () => {
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}event/all/past/${page}`,
            headers: `Authorization: ${user_token}`
        })
            .then(function (response) {
                if (response.data.code == '200') {
                    console.log('this is response', JSON.stringify(response.data.data));
                    setPastData(response.data.data)
                    setPage(page+1)
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    Toast.show(response.data.message)
                }
            })
            .catch(function (error) {
                setLoader(false)
                console.log("error", error.response.data)
                Toast.show(error.response.data.message)
            })
    }

    const handleApiOnReachEnd = async () => {
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        setLoader(true)
        axios({
            method: 'get',
            url: `${Constants.MainUrl}event/all/past/${page}`,
            headers: `Authorization: ${user_token}`
        })
            .then(function (response) {
                if (response.data.code == '200') {
                    console.log('this is response', JSON.stringify(response.data.data));
                    // setPastData(response.data.data)
                    var newData=response.data.data
                    var stateAssetArr = [...pastData, ...newData]
                    setPastData(stateAssetArr)
                    setPage(page+1)
                    setLoader(false)
                }
                else {
                    setLoader(false)
                    Toast.show(response.data.message)
                }
            })
            .catch(function (error) {
                setLoader(false)
                console.log("error", error.response.data)
                Toast.show(error.response.data.message)
            })
    }


    const date = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        if (day.length < 2)
            day = '0' + day;
        const month = d.toLocaleString('default', { month: 'short' });
        return (
            <Text numberOfLines={2} style={styles.date}>{`${day} ${month}`}</Text>
        )
    }
    return (
        <View style={styles.container}>
            {loader ? <Loader /> : null}
            <FlatList
                data={pastData}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.5}
                onEndReached={()=>handleApiOnReachEnd()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>navigation.navigate('EventDetails',{
                        id:item._id
                    })} style={styles.main}>
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
                        <View style={[styles.view, { alignSelf: 'flex-end', marginTop: -46, marginBottom: 10, marginRight: 10 }]}>
                            {date(item.date)}
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}
export default Past;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    main: {
        marginBottom: 20,
        width: Dimensions.get('window').width - 50
    },
    background: {
        // width:Dimensions.get('window').width-100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        // height:520,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingBottom: 10
    },
    view: {
        width: 38,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCDA64',
        borderRadius: 5,
        paddingHorizontal: 5
    },
    date: {
        color: '#000000',
        fontFamily: 'Montserrat-Regular',
        fontSize: 10,
        marginTop: -2,
        textAlign: 'center'
    },
    view1: {
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
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet', date: '19 Aug' },
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet', date: '20 Aug' },
    { img: require('../../assets/LocalImage/image.png'), title: 'All India Jewellers Meeet', date: '21 Aug' }


]

