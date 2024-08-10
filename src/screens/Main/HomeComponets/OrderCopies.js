import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions,Platform,ImageBackground } from "react-native";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import BlackEye from "../../../assets/Icon/BlackEye.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import Pdf1 from "../../../assets/Icon/pdf.svg";
import Pdf from 'react-native-pdf';

import Modal from "react-native-modal";
import Constants from "../../../Redux/Constants";

const OrderCopies = () => {
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState()
    const [isVisible, setVisible] = useState(false)
    const [showPdf,setShowPdf]=useState(false)
    const [pdfData, setPdfData] = useState([])
    const [url, setUrl] = useState('')

    useEffect(() => {
        apiCall()
    }, [])

    const apiCall = async () => {

        const user_token = await AsyncStorage.getItem(Storage.user_token)

        let config = {
            method: 'get',
            url: `${Constants.MainUrl}ordercopie/all/1`,
            headers: {
                'Authorization': `${user_token}`
            }
        };
        setLoader(true)
        axios.request(config)
            .then((response) => {
                console.log('res', response);
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
    console.log('this is setUUUrl',url);
    const handlePdf=(item)=>{
        navigation.navigate('VideoView',{
            url:item.cert_pdf
        })
        // setUrl(item.cert_pdf)
        // setTimeout(() => {
        //     setShowPdf(true)
        // }, 100);
        
    }
    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
            {loader ? <Loader /> : null}
            <Header
                title={'Order Copies'}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <View style={styles.main}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.view}>
                            <Text style={{ fontSize: 15, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{item.name}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setPdfData(item.certificate_type)
                                    setVisible(true)
                                    // setShowPdf(true)
                                }}
                                activeOpacity={0.5}>
                                <BlackEye />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
            <Modal isVisible={isVisible}>
                <View style={{
                    backgroundColor: '#FDEDB1',
                    // height: 125,
                    borderRadius: 16,
                    paddingLeft: 20,
                    // paddingRight:20,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 20
                }}>
                    <View style={styles.row}>
                        <View />
                        <TouchableOpacity
                            onPress={() =>
                                setVisible(false)

                            }
                            style={styles.touch}>
                            <CircleCross />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={pdfData}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible(false)
                                        handlePdf(item)
                                        //  setShowPdf(true)
                                        // setUrl(item.cert_pdf)
                                    }}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
                                    // borderBottomWidth: data.length == index ? 0 : 1,
                                     borderTopWidth: index==0?0:1,
                                     paddingRight: 10, width: '93%', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                        <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{`${index + 1}. `}</Text>
                                        <Text numberOfLines={1} style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold', width: '90%' }}>{item.cert_pdf.substr(item.cert_pdf.lastIndexOf("/") + 1)}</Text>
                                    </View>
                                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                                        <Pdf1 width={25} height={25} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>


                </View>
            </Modal>

            <Modal style={{ margin: 0,marginTop:Platform.OS=='ios'?25:0 }} isVisible={showPdf}>
                <View style={{
                    backgroundColor: '#FDEDB1',
                    borderRadius: 16,
                    flex: 1,
                    margin: 0
                    
                }}>

                    <TouchableOpacity
                        onPress={() => setShowPdf(false)}
                        style={{ alignSelf: 'flex-end', margin: 5 }}>
                        <CircleCross />
                    </TouchableOpacity>
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: 'http://45.79.123.102:49002/uploads/user-id-card (1)~cc1d.pdf', cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log("error    ", error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={{
                            flex: 1
                            // width: Dimensions.get('window').width,
                            // height: Dimensions.get('window').height,
                        }} />
                </View>
            </Modal>

        </ImageBackground>
    )
}
export default OrderCopies;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    main: {
        paddingHorizontal: 25,
        marginTop: 30
    },
    view: {
        width: '100%',
        backgroundColor: '#FCDA6480',
        borderRadius: 20,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 15,
        shadowColor: '#FCDA6480',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    touch: {
        marginRight: 5,
        marginTop: 5
    },
    buttonCancel: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        left: 13,
        top: 15,
    },
    textBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})

const data = [
    { title: 'ADG OF RAILWAY POLICE' },
    { title: 'SENIOR PI LT MARG POLICE STATION' }
]