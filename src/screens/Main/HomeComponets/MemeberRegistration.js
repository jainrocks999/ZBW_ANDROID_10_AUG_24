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
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Header from '../../../components/CustomHeader';
import Claendar from '../../../assets/Icon/Calendar.svg';
import Upload from '../../../assets/Icon/Upload.svg';
import Toast from 'react-native-simple-toast';
import Storage from '../../../components/LocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CircleCross from '../../../assets/Icon/CircleCross.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import Radio from '../../../components/Radio';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Constants from '../../../Redux/Constants';
import Loading from '../../../components/Loader';
const MemeberRegistration = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {chauvhir} = useSelector(state => state);
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
  const [inputs, setInputs] = useState({
    memberName: '',
    companyName: '',
    amemberName: '',
    phone: '',
    radio: '',
  });
  const [visible, setVisible] = useState({
    photo: false,
    adhar: false,
    visible: false,
  });
  const handleInputs = (param, value) => {
    const newwal = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setInputs(prev => ({...prev, [param]: newwal}));
  };
  const [aadhar, setAddhar] = useState({
    name: '',
    type: '',
    uri: '',
  });
  const [photo, setPhoto] = useState({
    name: '',
    type: '',
    uri: '',
  });
  const launchCameraForAadhar = async () => {
    try {
      launchCamera(checklistImage, response => {
        if (response.didCancel) {
        } else if (response.error) {
        } else {
          const res = response.assets[0];
          if (visible.adhar) {
            setAddhar({
              name: res.fileName,
              type: res.type,
              uri: res.uri,
            });
          } else if (visible.photo) {
            setPhoto({
              name: res.fileName,
              type: res.type,
              uri: res.uri,
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setVisible(prev => {
        return {
          adhar: false,
          photo: false,
          visible: false,
        };
      });
    }
  };
  const _pickDocument = async type => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const res = result;

      if (visible.adhar) {
        setAddhar({
          name: res.name,
          type: res.type,
          uri: res.uri,
        });
      } else if (visible.photo) {
        setPhoto({
          name: res.name,
          type: res.type,
          uri: res.uri,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    } finally {
      setVisible(prev => {
        return {
          adhar: false,
          photo: false,
          visible: false,
        };
      });
    }
  };
  const handleOnSubmit = () => {
    if (!inputs.memberName) {
      Toast.show('Please enter Member Name');
      return;
    }
    if (!inputs.companyName) {
      Toast.show('Please enter Company Name ');
      return;
    }
    if (!inputs.amemberName) {
      Toast.show('Please enter Associated Member Name ');
      return;
    }
    if (!inputs.phone) {
      Toast.show('Please enter Mobile Number ');
      return;
    }
    if (!inputs.phone) {
      Toast.show('Please enter Mobile Number ');
      return;
    }

    if (!inputs.radio) {
      Toast.show('Please select radio button');
      return;
    }
    if (!photo.name) {
      Toast.show('Please upload photo');
      return;
    }
    if (!aadhar.name) {
      Toast.show('Please upload aadhar');
      return;
    }

    doRegister();
    // navigation.navigate('ChauviharEventList');
  };
  const doRegister = async () => {
    try {
      setLoading(true);
      const user_token = await AsyncStorage.getItem(Storage.user_token);
      const chauvhiar_id = chauvhir[0]['_id'];
      const data = new FormData();
      data.append('photo', {
        ...photo,
        name: photo.name.substring(photo.name.lastIndexOf('/') + 1),
      });
      data.append('aadhar', {
        ...aadhar,
        name: aadhar.name.substring(aadhar.name.lastIndexOf('/') + 1),
      });
      data.append('memberName', inputs.memberName);
      data.append('companyName', inputs.companyName);
      data.append('assoMemName', inputs.amemberName);
      data.append('phone', inputs.phone);
      data.append('post', inputs.radio == '0' ? 'Proprietor' : 'Staff');
      data.append('chouviharEvId', chauvhiar_id);
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}chouviharevent/non-member/registration`,
        headers: {
          Authorization: `${user_token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      const response = await axios(config);
      if (response.data.code == 200) {
        navigation.replace('ChauviharEventList', {
          nonMember: response.data?.data,
        });
      } else {
        Toast.show(response.data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log('this is error', error);
      Toast.show('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      <Header
        title={'Member Registration'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />

      {loading && <Loading />}
      {/* <ScrollView style={{flex: 1}}> */}
      <KeyboardAwareScrollView
        extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.main}>
          <View style={{}}>
            <Text style={styles.heading}>
              Member Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={inputs.memberName}
                onChangeText={i => {
                  handleInputs('memberName', i);
                }}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.heading}>
              Company Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={inputs.companyName}
                onChangeText={val => {
                  handleInputs('companyName', val);
                }}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.heading}>
              Associated Member Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={inputs.amemberName}
                onChangeText={val => {
                  handleInputs('amemberName', val);
                }}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                  height: 40,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={styles.heading}>
              Phone Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View style={styles.inputView}>
              <TextInput
                value={inputs.phone}
                onChangeText={val => handleInputs('phone', val)}
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  width: '100%',
                  height: 40,
                }}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Radio
              id={inputs.radio}
              onPress={id => handleInputs('radio', id)}
            />
          </View>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() => {
                setVisible(prev => ({
                  visible: true,
                  adhar: false,
                  photo: true,
                }));
              }}
              style={[styles.touch, {marginTop: 5}]}>
              <Upload />
              {true ? (
                <Text
                  numberOfLines={1}
                  style={[styles.text2, {marginRight: 20}]}>
                  {photo.name != '' ? photo.name : 'Photo'}
                  {photo.name == '' && <Text style={{color: 'red'}}> *</Text>}
                </Text>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.text}>{'Photo'}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() => {
                setVisible(prev => ({
                  visible: true,
                  adhar: true,
                  photo: false,
                }));
              }}
              style={[styles.touch, {marginTop: 5}]}>
              <Upload />
              {true ? (
                <Text
                  numberOfLines={1}
                  style={[styles.text2, {marginRight: 20}]}>
                  {aadhar.name != '' ? aadhar.name : 'Aadhar Card'}
                  {aadhar.name == '' && <Text style={{color: 'red'}}> *</Text>}
                </Text>
              ) : (
                <View style={styles.row}>
                  <Text style={styles.text}>{'Aadhar Card'}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          // style={styles.bottom}
          style={{
            marginTop: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={handleOnSubmit} style={styles.touch1}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 140}} />
      </KeyboardAwareScrollView>
      {/* </ScrollView> */}
      <Modal transparent visible={visible.photo || visible.adhar}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.first1}>
            <View style={styles.row1}>
              <View />
              <TouchableOpacity
                onPress={() => {
                  setVisible({photo: false, adhar: false});
                }}
                style={{marginRight: 5, marginTop: 5}}>
                <CircleCross />
              </TouchableOpacity>
            </View>
            <View style={styles.modal}>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    launchCameraForAadhar();
                  }, 500);
                }}
                style={styles.camera}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 14,
                  }}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setTimeout(() => {
                    _pickDocument('aadharcard');
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
        </View>
      </Modal>
    </ImageBackground>
  );
};
export default MemeberRegistration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  heading: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  inputView: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FCDA64',
    marginTop: 5,
    paddingHorizontal: 8,
  },
  touch: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#FCDA64',
    marginTop: 5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  dob: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
  bottom: {
    marginTop: 128,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  touch1: {
    height: 43,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  buttton: {
    backgroundColor: '#FCDA64',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  text: {fontSize: 12, fontFamily: 'Montserrat-SemiBold', color: '#000'},
  button1: {
    backgroundColor: '#000',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
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
    alignItems: 'center',
  },

  // touch1: {
  //   marginRight: 5,
  //   marginTop: 5,
  // },
  modal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  camera: {
    backgroundColor: '#000',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    marginLeft: 20,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
});
