import React from "react";
import { View, Text ,Dimensions,ScrollView, ImageBackground} from "react-native";
import Image from "react-native-scalable-image";
import Header from "../CustomHeader";
import { useNavigation } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";

const EventDetails = ({ route }) => {
    console.log('thia ia rout ', route.params.item);
    const navigation = useNavigation()
    const data = route.params.item

    const renderDate = (date) => {
        const d = new Date(date);
        let day = d.getDate();
        let year = d.getFullYear()
        if (day.length < 2)
            day = '0' + day;
        const month = d.toLocaleString('default', { month: 'short' });
        return (
            <Text numberOfLines={2} style={{ color: '#000', fontFamily: 'Montserrat-Medium', fontSize: 13 }}>{`${day} ${month}, ${year}`}</Text>
        )
    }
    return (
        <ImageBackground source={require('../../assets/Logo/background.png')} style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                onPress={() => navigation.goBack()}
                title={'QR Details'}
            />
            <View style={{height:Dimensions.get('window').height/3}}>
            <ScrollView  style={{ padding: 20,height:140 }}>
                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-SemiBold' }}>{data.events.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:5,marginBottom:5 }}>
                    {renderDate(data.events.date)}
                    <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Medium', marginLeft: 10 }}>{data.events.time}</Text>

                </View>
                <HTMLView
                    value={data.events.description.trim()
                        .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                />
                {/* <Text style={{fontSize:40}}>{'The link script might not take effect if you have non-default project structure, please visit the wiki to link the package manually Grant Permission to External storage for Android 5.0 or lower The mechanism for granting Android permissions has slightly different since Android 6.0 released, please refer to Official Document.If you re going to access external storage (say, SD card storage) for Android 5.0 (or lower) devices, you might have to add the following line to AndroidManifest.xml.'}</Text> */}
            </ScrollView>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start',position:'absolute',top:'40%',left:0,right:0,bottom:0 }}>
                    {data ? <Image
                        source={{ uri: data.qr_code }}
                    /> : null}
                </View>
        </ImageBackground>
    )

}
export default EventDetails