import React from "react";
import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    header: { 
        height: 50, 
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20 
    },
    img: { 
        height:120, 
        width:80 
    },
    slider: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: 200, 
        marginTop: -90, 
        // marginLeft:20
        // paddingHorizontal: 20 
    },
    img1: { 
        height: 57, 
        width: 57 
    },
    view: { 
        marginTop: -10, 
        paddingHorizontal: 10 
    },
    item: {
        backgroundColor: '#FCDA64BF',
        width: Platform.isPad?'47.4%':'44%',

        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#FCDA64BF',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 20,
        elevation: 5,
    },
    name: { 
        color: '#000000', 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: 12,
        marginTop: 10 
    },
    modal: { 
        backgroundColor: '#FDEDB1', 
        // height: 125, 
        borderRadius: 16, 
        paddingLeft: 10, 
        width: '94%', 
        alignSelf: 'center' 
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    contact: { 
        fontSize: 16, 
        fontFamily: 'Montserrat-SemiBold', 
        color: '#000000', 
        marginTop: 20 
    },
    touch: { 
    },
    view1: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 10, 
        paddingRight: 15 
    },
    touch1: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 7 
    },
    text: { 
        marginTop: 0, 
        fontFamily: 'Montserrat-Medium', 
        color: '#000000', 
        fontSize: 14 
    },
    touch2: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 5 
    },
    email: { 
        marginTop: -10, 
        fontFamily: 'Montserrat-Medium', 
        color: '#000000', 
        fontSize: 14 
    },
    emailContainer: { 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
})