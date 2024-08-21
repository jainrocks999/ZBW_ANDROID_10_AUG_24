import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';
import Upload from '../../assets/Icon/Upload.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BackArrow from '../../assets/Icon/BackArrow.svg';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../LocalStorage';
import Toast from 'react-native-simple-toast';
import Loader from '../Loader';
import axios from 'axios';
import Modal from 'react-native-modal';
import FormData, {getHeaders} from 'form-data';
import CircleCross from '../../assets/Icon/CircleCross.svg';
import HTMLView from 'react-native-htmlview';
import Constants from '../../Redux/Constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Documentation = ({onPress}) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const [isVisible, setVisible] = useState(false);

  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoType, setPhotoType] = useState('');

  const [gst, setGst] = useState('');
  const [gstName, setGstName] = useState('');
  const [gstType, setGstType] = useState('');

  const [pan, setPan] = useState('');
  const [panName, setPanName] = useState('');
  const [panType, setPanType] = useState('');

  const [aadhar, setAadhar] = useState('');
  const [aadharName, setAadharName] = useState('');
  const [aadharType, setAadharType] = useState('');

  const [iec, setIec] = useState('');
  const [iecName, setIecName] = useState('');
  const [iecType, setIecType] = useState('');

  const [bis, setBis] = useState('');
  const [bisName, setBisName] = useState('');
  const [bisType, setBisType] = useState('');

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);

    let config = {
      method: 'get',
      url: `${Constants.MainUrl}homepage/term/condition`,
      headers: {
        Authorization: `${user_token}`,
      },
    };
    setLoader(true);
    axios
      .request(config)
      .then(response => {
        if (response.data.code == '200') {
          // Toast.show(response.data.message)
          setData(response.data.data);
          setLoader(false);
        } else {
          setLoader(false);
          // Toast.show(response.data.message)
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };

  const becomeAmember = async () => {
    const personalAddress = await AsyncStorage.getItem(Storage.personalAddress);
    const personalLocation = await AsyncStorage.getItem(
      Storage.personalLocation,
    );
    const personalPincode = await AsyncStorage.getItem(Storage.personalPincode);
    const personalPhoneNumber = await AsyncStorage.getItem(
      Storage.personalPhoneNumber,
    );
    const personalEmail = await AsyncStorage.getItem(Storage.personalEmail);
    const personalEmergencyNumber = await AsyncStorage.getItem(
      Storage.personalEmergencyNumber,
    );
    const personalDob = await AsyncStorage.getItem(Storage.personalDob);
    const addMoreArray = await AsyncStorage.getItem(Storage.addMoreArray);
    const businessName = await AsyncStorage.getItem(Storage.businessName);
    const gstNumber = await AsyncStorage.getItem(Storage.businessGst);
    const bussinessAddress = await AsyncStorage.getItem(
      Storage.businessAddress,
    );
    const businessLocation = await AsyncStorage.getItem(
      Storage.businessLocation,
    );
    const businessPhone = await AsyncStorage.getItem(Storage.businessPhone);
    const businessEmail = await AsyncStorage.getItem(Storage.businessEmail);

    const user_token = await AsyncStorage.getItem(Storage.user_token);

    if (personalAddress == '' || personalAddress == null) {
      Toast.show('Please fill Personal Details');
    } else if (personalLocation == '' || personalLocation == null) {
      Toast.show('Please fill Personal Details');
    } else if (personalPincode == '' || personalPincode == null) {
      Toast.show('Please fill Personal Details');
    } else if (personalPhoneNumber == '' || personalPhoneNumber == null) {
      Toast.show('Please fill Personal Details');
    } else if (personalEmail == '' || personalEmail == null) {
      Toast.show('Please fill Personal Details');
    } else if (
      personalEmergencyNumber == '' ||
      personalEmergencyNumber == null
    ) {
      Toast.show('Please fill Personal Details');
    } else if (personalDob == '' || personalDob == null) {
      Toast.show('Please fill Personal Details');
    } else if (businessName == '' || businessName == null) {
      Toast.show('Please fill Business Details');
    } else if (gstNumber == '' || gstNumber == null) {
      Toast.show('Please fill Business Details');
    } else if (bussinessAddress == '' || bussinessAddress == null) {
      Toast.show('Please fill Business Details');
    } else if (businessLocation == '' || businessLocation == null) {
      Toast.show('Please fill Business Details');
    } else if (businessPhone == '' || businessPhone == null) {
      Toast.show('Please fill Business Details');
    } else if (businessEmail == '' || businessEmail == null) {
      Toast.show('Please fill Business Details');
    } else if (photoName == '') {
      Toast.show('Please select your photograph');
    } else if (gstName == '') {
      Toast.show('Please select GST Certificate');
    } else if (panName == '') {
      Toast.show('Please select PAN Card');
    } else if (aadharName == '') {
      Toast.show('Please select Aadhar Card');
    } else if (toggleCheckBox == false) {
      Toast.show('Please agree with Terms and Conditions');
    } else {
      setLoader(true);
      const data = new FormData();

      data.append('address', personalAddress);
      data.append('location', personalLocation);
      data.append('pincode', personalPincode);
      data.append('personal_mobile', personalPhoneNumber);
      data.append('email', personalEmail);
      data.append('emergency_number', personalEmergencyNumber);
      data.append('dob', personalDob);
      data.append('business_name', businessName);
      data.append('gst', gstNumber);
      data.append('business_address', bussinessAddress);
      data.append('business_location', businessLocation);
      data.append('mobile', businessPhone);
      data.append('business_email', businessEmail);
      data.append('mobile_number', '');
      data.append('gst_certificate', gstNumber);
      data.append('website', 'google.com');
      data.append('mem_asso', JSON.parse(addMoreArray).join(','));
      data.append('photo', {
        uri: photo,
        name: photoName.substring(photoName.lastIndexOf('/') + 1),
        type: photoType,
      });
      data.append('pan_card', {
        uri: pan,
        name: panName.substring(panName.lastIndexOf('/') + 1),
        type: panType,
      });
      data.append('gst_certificate', {
        uri: gst,
        name: gstName.substring(gstName.lastIndexOf('/') + 1),
        type: gstType,
      });
      data.append('adhar_card', {
        uri: aadhar,
        name: aadharName.substring(aadharName.lastIndexOf('/') + 1),
        type: aadharType,
      });

      if (iec) {
        data.append('iec_certificate', {
          uri: iec,
          name: iecName.substring(iecName.lastIndexOf('/') + 1),
          type: iecType,
        });
      } else {
        data.append('iec_certificate', '');
      }
      if (bis) {
        data.append('bis_certificate', {
          uri: bis,
          name: bisName.substring(bisName.lastIndexOf('/') + 1),
          type: bisType,
        });
      } else {
        data.append('bis_certificate', '');
      }

      let config = {
        method: 'post',
        url: `${Constants.MainUrl}member/create`,
        headers: {
          Authorization: `${user_token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
      try {
        axios
          .request(config)
          .then(response => {
            console.log(response);
            Toast.show(response.data.message);
            AsyncStorage.setItem(Storage.personalAddress, '');
            AsyncStorage.setItem(Storage.personalLocation, '');
            AsyncStorage.setItem(Storage.personalPincode, '');
            AsyncStorage.setItem(Storage.personalPhoneNumber, '');
            AsyncStorage.setItem(Storage.personalEmail, '');
            AsyncStorage.setItem(Storage.personalEmergencyNumber, '');
            AsyncStorage.setItem(Storage.personalDob, '');
            AsyncStorage.setItem(Storage.addMoreArray, ['']);

            AsyncStorage.setItem(Storage.businessName, '');
            AsyncStorage.setItem(Storage.businessGst, '');
            AsyncStorage.setItem(Storage.businessAddress, '');
            AsyncStorage.setItem(Storage.businessLocation, '');
            AsyncStorage.setItem(Storage.businessPhone, '');
            AsyncStorage.setItem(Storage.businessEmail, '');
            setPhoto('');
            setPhotoName('');
            setPhotoType('');
            setGst('');
            setGstName('');
            setGstType('');
            setPan('');
            setPanName('');
            setPanType('');
            setAadhar('');
            setAadharName('');
            setAadharType('');
            setIec('');
            setIecName('');
            setIecType('');
            setBis('');
            setBisName('');
            setBisType('');
            setToggleCheckBox(false);
            setLoader(false);
          })
          .catch(error => {
            console.log('this is catch block', error);
            // Toast.show(error.response.data.message)
            setPhoto('');
            setPhotoName('');
            setPhotoType('');
            setGst('');
            setGstName('');
            setGstType('');
            setPan('');
            setPanName('');
            setPanType('');
            setAadhar('');
            setAadharName('');
            setAadharType('');
            setIec('');
            setIecName('');
            setIecType('');
            setBis('');
            setBisName('');
            setBisType('');
            setToggleCheckBox(false);
            setLoader(false);
          });
      } catch (error) {
        setLoader(false);
        //  console.log("errorer", error.response.data);
      }
    }
  };

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
  };

  const launchCameraForPhoto = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setPhoto(res.uri);
        setPhotoName(res.fileName);
        setPhotoType(res.type);
      }
    });
  };
  const launchCameraForCertificate = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setGst(res.uri);
        setGstName(res.fileName);
        setGstType(res.type);
      }
    });
  };
  const launchCameraForPan = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setPan(res.uri);
        setPanName(res.fileName);
        setPanType(res.type);
      }
    });
  };
  const launchCameraForAadhar = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setAadhar(res.uri);
        setAadharName(res.fileName);
        setAadharType(res.type);
      }
    });
  };
  const launchCameraForIec = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setIec(res.uri);
        setIecName(res.fileName);
        setIecType(res.type);
      }
    });
  };
  const launchCameraForBis = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setBis(res.uri);
        setBisName(res.fileName);
        setBisType(res.type);
      }
    });
  };

  const _pickDocument = async type => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const res = result;
      if (type == 'photograph') {
        setPhoto(res.uri);
        setPhotoName(res.name);
        setPhotoType(res.type);
      }
      if (type == 'gstCertificate') {
        setGst(res.uri);
        setGstName(res.name);
        setGstType(res.type);
      }
      if (type == 'pancard') {
        setPan(res.uri);
        setPanName(res.name);
        setPanType(res.type);
      }
      if (type == 'aadharcard') {
        setAadhar(res.uri);
        setAadharName(res.name);
        setAadharType(res.type);
      }
      if (type == 'iecCertificate') {
        setIec(res.uri);
        setIecName(res.name);
        setIecType(res.type);
      }
      if (type == 'bisCertificate') {
        setBis(res.uri);
        setBisName(res.name);
        setBisType(res.type);
      } else {
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
  const _pickDocument2 = async type => {
    try {
      // const result = await DocumentPicker.pickSingle({
      //   type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      // });
      const result=await launchImageLibrary(checklistImage)
      const res = result?.assets[0];
      if (type == 'photograph') {
        setPhoto(res.uri);
        setPhotoName(res.fileName);
        setPhotoType(res.type);
      }
      if (type == 'gstCertificate') {
        setGst(res.uri);
        setGstName(res.fileName);
        setGstType(res.type);
      }
      if (type == 'pancard') {
        setPan(res.uri);
        setPanName(res.fileName);
        setPanType(res.type);
      }
      if (type == 'aadharcard') {
        setAadhar(res.uri);
        setAadharName(res.fileName);
        setAadharType(res.type);
      }
      if (type == 'iecCertificate') {
        setIec(res.uri);
        setIecName(res.fileName);
        setIecType(res.type);
      }
      if (type == 'bisCertificate') {
        setBis(res.uri);
        setBisName(res.fileName);
        setBisType(res.type);
      } else {
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
    <ImageBackground
      source={require('../../assets/Logo/background.png')}
      style={styles.container}>
      {loader ? <Loader /> : null}
      <ScrollView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.main}>
            {/* <Text style={styles.title}>Your Photograph</Text> */}
            <View style={styles.row}>
              <Text style={styles.text1}>{'Your Photograph'}</Text>
              <Text style={{color: 'red'}}>*</Text>
            </View>
            <TouchableOpacity
              onPress={() => setVisible1(true)}
              style={[styles.touch, {marginTop: 5}]}>
              <Upload />
              {photo ? (
                <Text
                  numberOfLines={1}
                  style={[styles.text2, {marginRight: 20}]}>
                  {photoName}
                </Text>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.text}>{'Your Photograph'}</Text>
                  {/* <Text style={{ color: 'red' }}>*</Text> */}
                </View>
              )}
            </TouchableOpacity>

            <View style={{marginTop: 15}}>
              <View style={styles.row}>
                <Text style={styles.text1}>{'GST Certificate'}</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TouchableOpacity
                onPress={() => setVisible2(true)}
                style={[styles.touch, {marginTop: 5}]}>
                <Upload />
                {gst ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.text2, {marginRight: 20}]}>
                    {gstName}
                  </Text>
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.text}>{'GST Certificate'}</Text>
                    {/* <Text style={{ color: 'red' }}>*</Text> */}
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <View style={styles.row}>
                <Text style={styles.text1}>{'PAN Card'}</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setVisible3(true);
                }}
                style={[styles.touch, {marginTop: 5}]}>
                <Upload />
                {pan ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.text2, {marginRight: 20}]}>
                    {panName}
                  </Text>
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.text}>{'PAN Card'}</Text>
                    {/* <Text style={{ color: 'red' }}>*</Text> */}
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <View style={styles.row}>
                <Text style={styles.text1}>{'Aadhar Card'}</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setVisible4(true);
                }}
                style={[styles.touch, {marginTop: 5}]}>
                <Upload />
                {aadhar ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.text2, {marginRight: 20}]}>
                    {aadharName}
                  </Text>
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.text}>{'Aadhar Card'}</Text>
                    {/* <Text style={{ color: 'red' }}>*</Text> */}
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={styles.title}>IEC Certificate</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible5(true);
                }}
                style={[styles.touch, {marginTop: 5}]}>
                <Upload />
                {iec ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.text2, {marginRight: 20}]}>
                    {iecName}
                  </Text>
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.text}>{'IEC Certificate'}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={styles.title}>BIS Certificate</Text>
              <TouchableOpacity
                onPress={() => {
                  setVisible6(true);
                }}
                style={[styles.touch, {marginTop: 5}]}>
                <Upload />
                {bis ? (
                  <Text
                    numberOfLines={1}
                    style={[styles.text2, {marginRight: 20}]}>
                    {bisName}
                  </Text>
                ) : (
                  <View style={styles.row}>
                    <Text style={styles.text}>{'BIS Certificate'}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              paddingHorizontal: 17,
            }}>
            <CheckBox
              style={{height: 25, width: 30}}
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#FCDA64', false: '#FCDA64'}}
              onTintColor="#FCDA64"
              onCheckColor="#FCDA64"
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: '#000',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {'I agree to the '}
              </Text>

              <Text
                onPress={() => setVisible(true)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#000',
                  fontSize: 15,
                  color: '#000',
                }}>
                Terms and Conditions
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={onPress} style={styles.arrow}>
              <BackArrow />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => becomeAmember()}
              style={styles.button}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>

            <View style={{width: 40}} />
          </View>
          <Modal isVisible={isVisible}>
            <View
              style={{
                backgroundColor: '#FDEDB1',
                borderRadius: 16,
                paddingBottom: 20,
              }}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={{alignSelf: 'flex-end', margin: 5}}>
                <CircleCross />
              </TouchableOpacity>
              <ScrollView style={{padding: 20}}>
                {data ? (
                  <HTMLView
                    value={data
                      .trim()
                      .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                  />
                ) : null}
                <View style={{height: 30}} />
              </ScrollView>
            </View>
          </Modal>

          <Modal isVisible={visible1}>
            <View style={styles.first1}>
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
                    setVisible1(false);
                    setTimeout(() => {
                      launchCameraForPhoto();
                    }, 500);
                  }}
                  style={styles.camera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible1(false);
                    setTimeout(() => {
                      _pickDocument('photograph');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Document
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible1(false);
                    setTimeout(() => {
                      _pickDocument2('photograph');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={visible2}>
            <View style={styles.first1}>
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
                    setVisible2(false);
                    setTimeout(() => {
                      launchCameraForCertificate();
                    }, 500);
                  }}
                  style={styles.camera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible2(false);
                    setTimeout(() => {
                      _pickDocument('gstCertificate');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Document
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible2(false);
                    setTimeout(() => {
                      _pickDocument2('gstCertificate');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 14,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={visible3}>
            <View style={styles.first1}>
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
                    setVisible3(false);
                    setTimeout(() => {
                      launchCameraForPan();
                    }, 500);
                  }}
                  style={styles.camera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible3(false);
                    setTimeout(() => {
                      _pickDocument('pancard');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Document
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible3(false);
                    setTimeout(() => {
                      _pickDocument2('pancard');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 14,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={visible4}>
            <View style={styles.first1}>
              <View style={styles.row1}>
                <View />
                <TouchableOpacity
                  onPress={() => setVisible4(false)}
                  style={styles.touch1}>
                  <CircleCross />
                </TouchableOpacity>
              </View>
              <View style={styles.modal}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible4(false);
                    setTimeout(() => {
                      launchCameraForAadhar();
                    }, 500);
                  }}
                  style={styles.camera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible4(false);
                    setTimeout(() => {
                      _pickDocument('aadharcard');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Document
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible4(false);
                    setTimeout(() => {
                      _pickDocument2('aadharcard');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={visible5}>
            <View style={styles.first1}>
              <View style={styles.row1}>
                <View />
                <TouchableOpacity
                  onPress={() => setVisible5(false)}
                  style={styles.touch1}>
                  <CircleCross />
                </TouchableOpacity>
              </View>
              <View style={styles.modal}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible5(false);
                    setTimeout(() => {
                      launchCameraForIec();
                    }, 500);
                  }}
                  style={styles.camera}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible5(false);
                    setTimeout(() => {
                      _pickDocument('iecCertificate');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 12,
                    }}>
                    Document
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible5(false);
                    setTimeout(() => {
                      _pickDocument2('iecCertificate');
                    }, 500);
                  }}
                  style={styles.button1}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 14,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal isVisible={visible6}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.first1}>
                <View style={styles.row1}>
                  <View />
                  <TouchableOpacity
                    onPress={() => setVisible6(false)}
                    style={styles.touch1}>
                    <CircleCross />
                  </TouchableOpacity>
                </View>
                <View style={styles.modal}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible6(false);
                      setTimeout(() => {
                        launchCameraForBis();
                      }, 500);
                    }}
                    style={styles.camera}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 12,
                      }}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible6(false);
                      setTimeout(() => {
                        _pickDocument('bisCertificate');
                      }, 500);
                    }}
                    style={styles.button1}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 12,
                      }}>
                      Document
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible6(false);
                      setTimeout(() => {
                        _pickDocument2('bisCertificate');
                      }, 500);
                    }}
                    style={styles.button1}>
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 12,
                      }}>
                      Gallery
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  );
};
export default Documentation;
const styles = StyleSheet.create({
  modal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  camera: {
    backgroundColor: '#000',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
  button1: {
    backgroundColor: '#000',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
  first1: {
    backgroundColor: '#FDEDB1',
    height: 125,
    borderRadius: 16,
    width: '100%',
    alignSelf: 'center',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  touch1: {
    marginRight: 5,
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  touch: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FCDA64',

    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 40,
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
    color: '#a0a0a0',
  },
  text2: {
    marginLeft: 40,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  text1: {
    // marginLeft: 40,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  bottom: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 24,
    // position: 'absolute',
    // bottom: 40,
    // left: 24,
    // right: 24
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 40,
    backgroundColor: '#000000',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 40,
  },
  button: {
    height: 43,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
  },
  submit: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  title: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
});
