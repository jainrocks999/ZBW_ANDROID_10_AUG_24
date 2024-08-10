import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform,ImageBackground } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Header from "../../../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import axios from "axios";
import Constants from "../../../Redux/Constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Upload from "../../../assets/Icon/Upload.svg";
import Modal from "react-native-modal";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Compress from 'react-native-compressor';


const AddComplaints = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [firmName, setFirmName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [visible,setVisible]=useState(false)
    const [complaint,setComplaints]=useState('')
    const [complaintName,setComplaintsName]=useState('')
    const [complaintType,setComplaintsType]=useState('')
    const [complaintArray,setComplaintArray]=useState([])

    const navigation = useNavigation()

    const handlePress = async () => {
       console.log('this is length',complaintArray.length);
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (firstName == '') {
            Toast.show('Please enter first name')
        }
        else if (lastName == '') {
            Toast.show('Please enter last name')
        }
        else if (phone == '') {
            Toast.show('Please enter phone number')
        }
        else if (phone.length < 10) {
            Toast.show('Please enter 10 digit phone number ')
        }
        else if (!phone.match('[0-9]{10}')) {
            Toast.show('Please enter valid phone number')
        }
        else if (firmName == '') {
            Toast.show('Please enter firm name')
        }
        else if (email == '') {
            Toast.show('Please enter email address')
        }
        else if (reg.test(email) === false) {
            Toast.show('Please enter valid email address')
        }
        else if (address == '') {
            Toast.show('Please enter your full address')
        }
        else if (value == null) {
            Toast.show('Please select issue type')
        }
        else if (description == '') {
            Toast.show('Please enter issue description')
        }
        else if(complaintArray.length>4){
            Toast.show('Only 4 images you can select for a complaint.')
        }
        else {
            setLoader(true)
            const data = new FormData()
            data.append("accusedName", `${firstName} ${lastName}`)
            data.append("phone", phone)
            data.append("firmName", firmName)
            data.append("email", email)
            data.append("address", address)
            data.append("subject", value)
            data.append("detail", description)
            if(complaintArray.length==1){
                data.append("complaintPhoto", complaintArray[0])
            }
            else if(complaintArray.length==2){
                data.append("complaintPhoto", complaintArray[0])
                data.append("complaintPhoto", complaintArray[1])
            }
            else if(complaintArray.length==3){
                data.append("complaintPhoto", complaintArray[0])
                data.append("complaintPhoto", complaintArray[1])
                data.append("complaintPhoto", complaintArray[2])
            }
            else if(complaintArray.length==4){
                data.append("complaintPhoto", complaintArray[0])
                data.append("complaintPhoto", complaintArray[1])
                data.append("complaintPhoto", complaintArray[2])
                data.append("complaintPhoto", complaintArray[3])
            }
              else{
                data.append("complaintPhoto",'')
              }
            let config = {
                method: 'post',
                url: `${Constants.MainUrl}complaint/create/complain`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `${user_token}`
                },
                data: data
            };
          try {
            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    Toast.show(response.data.message)
                    navigation.goBack()
                    setLoader(false)
                })
                .catch((error) => {
                    console.log(error);
                    setLoader(false)
                });
            } catch (error) {
                setLoader(false)
            }
           
        }

    }
    const checklistImage = {
        title: 'Select Image',
        quality: 0.7,
        maxWidth: 500,
        maxHeight: 500,
        saveToPhotos: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      }

      const launchCameraForPhoto = async () => {
        
        try {
            setComplaintArray([])
            launchCamera(checklistImage, async (response) => {
                if (response.didCancel) {
                    // Handle cancelation
                } else if (response.error) {
                    // Handle error
                } else {
                    const res = response.assets[0];
                    var arr = [];
                    try {
                        const compressedRes = await Compress.Image.compress(res.uri, {
                            progressDivider: 10,
                            downloadProgress: (progress) => {
                                console.log('downloadProgress: ', progress);
                            },
                        });
                        arr.push({ uri: compressedRes,type:res.type,name:res.fileName });
                        setComplaintArray(arr)
                    } catch (error) {
                        console.error('Error occurred during compression:', error);
                    }
                }
            });
        } catch (error) {
            console.error('Error in launchCameraForPhoto:', error);
        }
    };

      const _pickDocument = async (type) => {
        setComplaintArray([])
        try {
          const result = await DocumentPicker.pick({
            // type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            type: [DocumentPicker.types.images],
            allowMultiSelection:true
          });
          console.log('this is response data', result);
          const promises = result.map(async (item) => {
            console.log(item.uri);
            const result1 = await Compress.Image.compress(item.uri, {
                progressDivider: 10,
                downloadProgress: (progress) => {
                    console.log('downloadProgress: ', progress);
                },
            });
        return { uri: result1,name:item.name,type:item.type }; // Return the object directly instead of pushing to arr
        });
        
        Promise.all(promises)
            .then((result) => {
                setComplaintArray(result)
                console.log("FINAL RESULT-------", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        
            
        console.log('ths is data',data);
            // setComplaintArray(result)
            setComplaints('')
            setComplaintsName('')
            setComplaintsType('')
        
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled file picker');
          } else {
            console.log('DocumentPicker err => ', err);
            throw err;
          }
        }
      };
    


    const inputRef = useRef();
    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.conatiner}>
            {loader ? <Loader /> : null}
            <Header
                title={'Add Complaints'}
                onPress={() => navigation.goBack()}
                onPress2={() => navigation.navigate('Notification')}
            />
            <ScrollView style={styles.main}
                contentContainerStyle={{ flexGrow: 1, }}
            >
                <KeyboardAwareScrollView
                    extraScrollHeight={Platform.OS=='android'?-200:100}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Text style={styles.view}>Opposite Party Details:</Text>
                    <View style={{ marginTop: 18 }}>
                        <Text style={styles.first}>First Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={firstName}
                                onChangeText={(val) => setFirstName(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Last Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={lastName}
                                onChangeText={(val) => setLastName(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Phone Number</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={phone}
                                onChangeText={(val) => setPhone(val)}
                                maxLength={10}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Firm Name</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={firmName}
                                onChangeText={(val) => setFirmName(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Email</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={email}
                                onChangeText={(val) => setEmail(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Address</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                value={address}
                                onChangeText={(val) => setAddress(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium', height: 40, width: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={styles.row}>
                            <Text style={styles.type}>Issue Type</Text>
                        </View>
                        <View style={styles.inputView2}>
                            <Dropdown
                                style={[styles.dropdown,]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Select the option' : '...'}
                                searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setValue(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View style={styles.space}>
                            <Text style={styles.issue}>Issue Description</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => inputRef.current.focus()}
                            style={styles.inputView1}>
                            <TextInput
                                ref={inputRef}
                                value={description}
                                multiline
                                onChangeText={(val) => setDescription(val)}
                                style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.first}>Upload Complaints</Text>
                        <TouchableOpacity
                        onPress={()=>setVisible(true)}
                         style={{
                            height: 40,
                            width: '100%',
                            borderWidth: 1,
                            borderColor: '#FCDA64',
                            justifyContent: 'flex-start',
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop:5
                        }}>
                            <Upload />
                           {complaintArray.length>0? <Text style={styles.text4}>{`${complaintArray.length} Image Attached`}</Text>:
                            <Text style={styles.text}>{'Upload Complaints'}</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            onPress={() => handlePress()}
                            style={styles.touch}>
                            <Text style={styles.submit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 240 }} />
                </KeyboardAwareScrollView>
            </ScrollView>
            <Modal isVisible={visible}>
                <View style={styles.first1}>
                    <View style={styles.row1}>
                        <View />
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={styles.touch1}>
                            <CircleCross />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible(false)
                                setTimeout(() => {
                                    launchCameraForPhoto()
                                }, 500);
                                
                            }}
                            style={styles.camera}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                 setVisible(false)
                                 setTimeout(() => {
                                  _pickDocument()
                                 }, 500);
                            }
                            }
                            style={styles.button1}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}
export default AddComplaints;
const styles = StyleSheet.create({
    text4:{
        marginLeft: 40,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        marginRight:20
    },
    modal: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20
    },
    camera: {
        backgroundColor: '#000',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 8,
    },
      button1: {
        backgroundColor: '#000',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 8
    },
    first1: {
        backgroundColor: '#FDEDB1',
        height: 125,
        borderRadius: 16,
        width: '84%',
        alignSelf: 'center',
    },
      row1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    touch1: {
        marginRight: 5,
        marginTop: 5
    },
    text: {
        marginLeft: 40,
        fontSize: 13,
        fontFamily: 'Montserrat-Medium',
        color: '#a0a0a0',
    },
    dropdown: {
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#000000'
    },
    selectedTextStyle: {
        fontSize: 14,
        color: '#000000',
        fontFamily: 'Montserrat-Medium'
    },
    conatiner: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    main: {
        paddingHorizontal: 24,
        marginTop: 20
    },
    view: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: '#000000'
    },
    first: {
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    inputView: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginTop: 5,
        paddingHorizontal: 8
    },
    inputView2: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginTop: 5,
        // paddingHorizontal:8
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    type: {
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    space: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    issue: {
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    inputView1: {
        height: 86,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginTop: 5,
        padding: 8

    },
    buttonView: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touch: {
        height: 43,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCDA64',
        borderRadius: 20
    },
    submit: {
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        fontSize: 14
    }
});
const data = [
    { label: 'Theft', value: 'Theft' },
    { label: 'Robbery', value: 'Robbery' },
    { label: 'Cheating', value: 'Cheating' },
    { label: 'Extortion', value: 'Extortion' },
    { label: 'Labour issue', value: 'Labour issue' },
    { label: 'Return Of Property', value: 'Return Of Property' },
    { label: 'Other', value: 'Other' },
];
