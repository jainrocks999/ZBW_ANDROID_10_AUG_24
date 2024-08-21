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
import CheckBox from '@react-native-community/checkbox';
import BackArrow from '../../assets/Icon/BackArrow.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../components/LocalStorage';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BusinessDetail = ({onPress}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
  const [name, setName] = useState('');
  const [gst, setGst] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    handleLoad();
  }, []);

  const handleLoad = async () => {
    const name = await AsyncStorage.getItem(Storage.businessName);
    const gst = await AsyncStorage.getItem(Storage.businessGst);
    const address = await AsyncStorage.getItem(Storage.businessAddress);
    const location = await AsyncStorage.getItem(Storage.businessLocation);
    const phone = await AsyncStorage.getItem(Storage.businessPhone);
    const email = await AsyncStorage.getItem(Storage.businessEmail);

    setName(name);
    setGst(gst);
    setAddress(address);
    setLocation(location);
    setPhone(phone);
    setEmail(email);
  };

  const handleBusinessDetails = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    var phone1 = '1234567890';
    if (name == '' || name == null) {
      Toast.show('Please enter your business name');
    } else if (gst == '' || gst == null) {
      Toast.show('Please enter your GST Number');
    } else if (address == '' || address == null) {
      Toast.show('Please enter your business address');
    } else if (location == '' || location == null) {
      Toast.show('Please enter your location');
    } else if (phone == '' || phone == null) {
      Toast.show('Please enter your phone number');
    } else if (phone && phone.length < 10) {
      Toast.show('Please enter 10 digit phone number ');
    } else if (!phone.match('[0-9]{10}')) {
      Toast.show('Please enter valid phone number');
    } else if (email == '' || email == null) {
      Toast.show('Please enter your email address');
    } else if (reg.test(email) === false) {
      Toast.show('Please enter valid email address');
    } else {
      AsyncStorage.setItem(Storage.businessName, name);
      AsyncStorage.setItem(Storage.businessGst, gst);
      AsyncStorage.setItem(Storage.businessAddress, address);
      AsyncStorage.setItem(Storage.businessLocation, location);
      AsyncStorage.setItem(Storage.businessPhone, phone);
      AsyncStorage.setItem(Storage.businessEmail, email);
      Toast.show('Business Details Saved Successfully!');
    }
  };

  const handleToggle = async newValue => {
    console.log('this is new value', newValue);
    if (newValue == true) {
      const mobile = await AsyncStorage.getItem(Storage.personalPhoneNumber);
      setPhone(mobile);
    }
    setToggleCheckBox(newValue);
  };
  const handleToggle1 = async newValue => {
    if (newValue == true) {
      const email = await AsyncStorage.getItem(Storage.personalEmail);
      setEmail(email);
    }
    setToggleCheckBox1(newValue);
  };

  return (
    <ImageBackground
      source={require('../../assets/Logo/background.png')}
      style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAwareScrollView
          extraScrollHeight={Platform.OS == 'android' ? -200 : 100}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.main}>
            <View style={{}}>
              <Text style={styles.heading}>
                Business Name <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  value={name}
                  onChangeText={val => setName(val)}
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
                GST Number <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  value={gst}
                  onChangeText={val => setGst(val)}
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
                Business Address <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  value={address}
                  onChangeText={val => setAddress(val)}
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
                Location <Text style={{color: 'red'}}>*</Text>
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  value={location}
                  onChangeText={val => setLocation(val)}
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
            {/* <View style={{marginTop:15}}>
                <Text style={styles.heading}>Phone</Text>
                <View style={styles.inputView}>
                    <TextInput/>
                </View>
            </View> */}
            <View style={{marginTop: 15}}>
              <View style={styles.view}>
                <Text style={styles.heading}>
                  Phone <Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={styles.row}>
                  <CheckBox
                    style={{height: 25, width: 30}}
                    disabled={false}
                    value={toggleCheckBox}
                    onValueChange={newValue => handleToggle(newValue)}
                    tintColors={{true: '#FCDA64', false: '#FCDA64'}}
                    onTintColor="#FCDA64"
                    onCheckColor="#FCDA64"
                  />
                  <Text style={styles.same}>Same as personal</Text>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={phone}
                  contextMenuHidden={true}
                  onChangeText={val => {
                    const regex = /^\d{0,10}$/;
                    if (regex.test(val)) {
                      setPhone(val);
                    }
                  }}
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
              <View style={styles.view}>
                <Text style={styles.heading}>
                  Email <Text style={{color: 'red'}}>*</Text>
                </Text>
                <View style={styles.row}>
                  <CheckBox
                    style={{height: 25, width: 30}}
                    disabled={false}
                    value={toggleCheckBox1}
                    onValueChange={newValue => handleToggle1(newValue)}
                    tintColors={{true: '#FCDA64', false: '#FCDA64'}}
                    onTintColor="#FCDA64"
                    onCheckColor="#FCDA64"
                  />
                  <Text style={styles.same}>Same as personal</Text>
                </View>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={email}
                  onChangeText={val => setEmail(val)}
                  style={{
                    color: '#000000',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    width: '100%',
                    height: 40,
                  }}
                  keyboardType="email-address"
                />
              </View>
            </View>
          </View>
          <View style={{height: 214}} />
          {/* height:214 */}
          <View style={styles.bottom}>
            <TouchableOpacity onPress={onPress} style={styles.back}>
              <BackArrow />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleBusinessDetails()}
              style={styles.button}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
            <View style={{width: 40}} />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </ImageBackground>
  );
};
export default BusinessDetail;
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
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  same: {
    fontSize: 10,
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
  },
  bottom: {
    marginTop: 128,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
  },
  back: {
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
});
