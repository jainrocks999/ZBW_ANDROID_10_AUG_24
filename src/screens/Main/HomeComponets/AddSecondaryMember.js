import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Platform,ImageBackground} from "react-native";
import Header from "../../../components/CustomHeader";
import Upload from "../../../assets/Icon/Upload.svg";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'
import Claendar from "../../../assets/Icon/Calendar.svg";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-simple-toast";
import Loader from "../../../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Storage from "../../../components/LocalStorage";
import axios from "axios";
import Modal from "react-native-modal";
import CircleCross from "../../../assets/Icon/CircleCross.svg";
import Constants from "../../../Redux/Constants";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const AddSecondaryMember = ({ route }) => {
    const navigation = useNavigation()
    const [isVisible1, setVisible1] = useState(false)
    const [isVisible2, setVisible2] = useState(false)
    const [isVisible3, setVisible3] = useState(false)

    const [loader, setLoader] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [emergencyNumber, setEmergencyNumber] = useState('')
    const [phone1, setPhone1] = useState('')
    const [emergencyNumber1, setEmergencyNumber1] = useState('')

    const [photo, setPhoto] = useState('')
    const [photoName, setPhotoName] = useState('')
    const [photoType, setPhotoType] = useState('')

    const [aadhar, setAadhar] = useState('')
    const [aadharName, setAadharName] = useState('')
    const [aadharType, setAadharType] = useState('')

    const [salary, setSalary] = useState('')
    const [salaryName, setSalaryName] = useState('')
    const [salaryType, setSalaryType] = useState('')

    const [dob, setDob] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    console.log('this is route id', dob);

    const handleApi = async () => {
        const user_token = await AsyncStorage.getItem(Storage.user_token)
        if (firstName == '') {
            Toast.show('Please enter your first name')
        }
        else if (lastName == '') {
            Toast.show('Please enter your last name')
        }
        else if (phone == '') {
            Toast.show('Please enter your phone number1')
        }
        else if (phone.length < 10) {
            Toast.show('Please enter 10 digit phone number1')
        }
        else if(!phone.match('[0-9]{10}')){
            Toast.show('Please enter valid phone number1')
        }
        else if (emergencyNumber == '') {
            Toast.show('Please enter your emergency number1')
        }
        else if (emergencyNumber.length < 10) {
            Toast.show('Please enter 10 digit emergency number1')
        }
        else if(!emergencyNumber.match('[0-9]{10}')){
            Toast.show('Please enter valid emergency number1')
        }
        // else if (phone1 == '') {
        //     Toast.show('Please enter your phone number2')
        // }
        else if (phone1 && phone1.length < 10) {
            Toast.show('Please enter 10 digit phone number2')
        }
        else if (phone1 && !phone1.match('[0-9]{10}')) {
            Toast.show('Please enter valid phone number2')
        }
        // else if (emergencyNumber1 == '') {
        //     Toast.show('Please enter your emergency number2')
        // }
        else if (emergencyNumber1 && emergencyNumber1.length < 10) {
            Toast.show('Please enter 10 digit emergency number2')
        }
        else if (emergencyNumber1 && !emergencyNumber1.match('[0-9]{10}')) {
            Toast.show('Please enter valid emergency number2')
        }
        else if (dob == '') {
            Toast.show('Please select date of birth')
        }
        else if (photo == '') {
            Toast.show('Please upload your Photograph')
        }
        else if (aadhar == '') {
            Toast.show('Please upload your Aadhar card')
        }
        else if (salary == '') {
            Toast.show('Please upload your Salary slip / Company authentication letter')
        }
        else{
            
        }
        // else {
            setLoader(true)
            const data = new FormData()
            data.append('phone_number_1', phone);
            data.append('emergency_number_1', emergencyNumber);
            data.append('phone_number_2', phone1);
            data.append('emergency_number_2', emergencyNumber1);
            data.append('dob', dob);
            data.append('photo', {
                uri: photo,
                name: photoName.substring(photoName.lastIndexOf('/') + 1),
                type: photoType
            });
            data.append('adhar_card', {
                uri: aadhar,
                name: aadharName.substring(aadharName.lastIndexOf('/') + 1),
                type: aadharType
            });
            data.append('salary_slip', {
                uri: salary,
                name: salaryName.substring(salaryName.lastIndexOf('/') + 1),
                type: salaryType
            });
            data.append('firstName', firstName);
            data.append('lastName', lastName);
            data.append('primaryMember', route.params.memberId);

            let config = {
                method: 'post',
                url: `${Constants.MainUrl}member/secondary/create`,
                headers: {
                    'Authorization': `${user_token}`,
                    "Content-Type": "multipart/form-data",
                },
                data: data
            };
            axios.request(config)
                .then((response) => {
                    if (response.data.code == '200') {
                        Toast.show(response.data.message)
                        setLoader(false)
                        navigation.goBack()
                    }
                    else {
                        setLoader(false)
                        Toast.show(response.data.message)
                        navigation.goBack()
                    }

                    setLoader(false)
                })
                .catch((error) => {
                    setLoader(false)
                    Toast.show(error.response.data.message)
                    navigation.goBack()
                    console.log(error.response.data);
                });
        // }
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
        launchCamera(checklistImage, response => {
            console.log('this is respo', response);
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                const res = response.assets[0]
                setPhoto(res.uri)
                setPhotoName(res.fileName)
                setPhotoType(res.type)
            }
        });
    }

    const launchCameraForAadhar = async () => {
        launchCamera(checklistImage, response => {
            console.log('this is respo', response);
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                const res = response.assets[0]
                setAadhar(res.uri)
                setAadharName(res.fileName)
                setAadharType(res.type)
            }
        });
    }
    const launchCameraForSalary = async () => {
        launchCamera(checklistImage, response => {
            console.log('this is respo', response);
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                const res = response.assets[0]
                setSalary(res.uri)
                setSalaryName(res.fileName)
                setSalaryType(res.type)
            }
        });
    }
    const _pickDocument = async (type) => {
        try {
            const result = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });
            const res = result;
            console.log('this is response data', result);
            if (type == 'photograph') {
                setPhoto(res.uri)
                setPhotoName(res.name)
                setPhotoType(res.type)
            }
            if (type == 'aadharCard') {
                setAadhar(res.uri)
                setAadharName(res.name)
                setAadharType(res.type)
            }
            if (type == 'salarySlip') {
                setSalary(res.uri)
                setSalaryName(res.name)
                setSalaryType(res.type)
            }
            else {

            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled file picker');
            } else {
                console.log('DocumentPicker err => ', err);
                throw err;
            }
        }
    };


    return (
        <ImageBackground source={require('../../../assets/Logo/background.png')} style={styles.container}>
            {loader ? <Loader /> : null}
            <Header
                title={'Add Secondary Member'}
                onPress={() => navigation.goBack()}
                onPress2={()=>navigation.navigate('Notification')}
            />
            <ScrollView style={styles.main}>
            <KeyboardAwareScrollView
                extraScrollHeight={Platform.OS=='android'?-200:100}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                contentContainerStyle={{ flexGrow: 1 }}> 
                <View style={{ marginTop: 0 }}>
                    <Text style={styles.heading}>First Name</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={firstName}
                            onChangeText={(val) => setFirstName(val)}
                            keyboardType="default"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>Last Name</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={lastName}
                            onChangeText={(val) => setLastName(val)}
                            keyboardType="default"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>Phone Number1</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={phone}
                            onChangeText={(val) => setPhone(val)}
                            keyboardType="number-pad"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>Emergency Number1</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={emergencyNumber}
                            onChangeText={(val) => setEmergencyNumber(val)}
                            keyboardType="number-pad"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>Phone Number2</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={phone1}
                            onChangeText={(val) => setPhone1(val)}
                            keyboardType="number-pad"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>Emergency Number2</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            value={emergencyNumber1}
                            onChangeText={(val) => setEmergencyNumber1(val)}
                            keyboardType="number-pad"
                            style={{ fontSize: 14, color: '#000000', fontFamily: 'Montserrat-Medium',height:40,width:'100%' }}
                            maxLength={10}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.heading}>DOB</Text>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.touchContainer}>
                        <Text style={styles.dob}>{dob}</Text>
                        <Claendar />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        // _pickDocument('photograph')
                        setVisible1(true)
                    }
                    style={styles.view}>
                    <Upload />
                    {photo ? <Text numberOfLines={1} style={[styles.place, { marginRight: 20 }]}>{photoName}</Text> :
                        <View style={styles.row}>
                            <Text style={styles.place}>{'Your Photograph'}</Text>
                            <Text style={{ color: 'red' }}>*</Text>
                        </View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    // _pickDocument('aadharCard')
                    setVisible2(true)
                }
                    style={styles.view}>
                    <Upload />
                    {aadhar ? <Text numberOfLines={1} style={[styles.place, { marginRight: 20 }]}>{aadharName}</Text> :
                        <View style={styles.row}>
                            <Text style={styles.place}>{'Aadhar Card'}</Text>
                            <Text style={{ color: 'red' }}>*</Text>
                        </View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>
                    // _pickDocument('salarySlip')
                    setVisible3(true)
                }
                    style={styles.view}>
                    <Upload />
                    {salary ? <Text numberOfLines={1} style={[styles.place, { marginRight: 20 }]}>{salaryName}</Text> :
                        <View style={styles.row}>
                            <Text style={styles.place}>{'Salary Slip / Company Auth Letter'}</Text>
                            <Text style={{ color: 'red' }}>*</Text>
                        </View>}
                </TouchableOpacity>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        onPress={() => handleApi()}
                        style={styles.touch}>
                        <Text style={styles.submit}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 30 }} />
                </KeyboardAwareScrollView>
            </ScrollView>
            <DatePicker
                modal
                open={open}
                date={date}
                mode={'date'}

                maximumDate={date}
                onConfirm={(date) => {
                    setOpen(false)
                    // setDate(date)
                    var d = date
                    month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;

                    var finalDate = [month, day, year].join('/');
                    setDob(finalDate)

                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />

            <Modal isVisible={isVisible1}>
                <View style={styles.first}>
                    <View style={styles.row1}>
                        <View />
                        <TouchableOpacity
                            onPress={() => setVisible1(false)}
                            style={styles.touch1}>
                            <CircleCross />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible1(false)
                                setTimeout(() => {
                                launchCameraForPhoto()
                                }, 500);
                               
                            }}
                            style={styles.camera}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible1(false)
                                setTimeout(() => {
                                    _pickDocument('photograph')
                                }, 500);
                               
                            }
                            }
                            style={styles.button}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={isVisible2}>
                <View style={styles.first}>
                    <View style={styles.row1}>
                        <View />
                        <TouchableOpacity
                            onPress={() => setVisible2(false)}
                            style={styles.touch1}>
                            <CircleCross />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible2(false)
                                setTimeout(() => {
                                    launchCameraForAadhar()
                                }, 500);
                                
                            }}
                            style={styles.camera}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible2(false)
                                setTimeout(() => {
                                    _pickDocument('aadharCard')
                                }, 500);
                                
                            }}
                            style={styles.button}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={isVisible3}>
                <View style={styles.first}>
                    <View style={styles.row1}>
                        <View />
                        <TouchableOpacity
                            onPress={() => setVisible3(false)}
                            style={styles.touch1}>
                            <CircleCross />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modal}>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible3(false)
                                setTimeout(() => {
                                    launchCameraForSalary()
                                }, 500);
                                
                            }}
                            style={styles.camera}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setVisible3(false)
                                setTimeout(() => {
                                    _pickDocument('salarySlip')
                                }, 500);
                               
                            }}
                            style={styles.button}>
                            <Text style={{ color: '#fff', fontFamily: 'Montserrat-SemiBold', fontSize: 14 }}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ImageBackground>
    )
}
export default AddSecondaryMember;
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 8
    },
    first: {
        backgroundColor: '#FDEDB1',
        height: 125,
        borderRadius: 16,
        width: '84%',
        alignSelf: 'center',

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

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    main: {
        paddingHorizontal: 24,
        marginTop: 30
    },
    heading: {
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
        paddingHorizontal:8
    },
    touchContainer: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 7
    },
    dob: {
        color: '#000000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
    view: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderColor: '#FCDA64',
        marginTop: 38,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    place: {
        marginLeft: 20,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#000000'
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

})