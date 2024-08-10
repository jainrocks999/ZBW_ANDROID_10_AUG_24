import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import Pdf from "react-native-pdf";
import { useNavigation } from "@react-navigation/native";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import VideoPlayer from 'react-native-video-controls';

const ViewPdf=({route})=>{
    const navigation=useNavigation()
    // console.log('this is route data',route.params.currentMessage.file.url);
    return(
        <View style={{ padding: 0,flex:1 }}>
        <Pdf
            trustAllCerts={false}
            source={{ uri: route.params.url, cache: true }}
            onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
                console.log("error    ",error);
            }}
            onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
            }}
            style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
            }} />
        <TouchableOpacity
         onPress={()=>navigation.goBack()}
         style={styles.buttonCancel}>
            <CircleCross/>
        </TouchableOpacity>
    </View>
    )

}
export default ViewPdf;
const styles = StyleSheet.create({
    buttonCancel: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        left: 13,
        top: 10,
    },
    textBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

