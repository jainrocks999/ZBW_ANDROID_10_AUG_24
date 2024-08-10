import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import Image from 'react-native-scalable-image';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import permission from '../../utils/permission';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import LocalStorage from '../../../components/LocalStorage';
const {width} = Dimensions.get('window');
const Chauviharcode = ({route}) => {
  const navigation = useNavigation();
  const data = route.params.data;
  const [visible, setVisible] = useState(false);
  const saveToGallery1 = async qrCode => {
    setVisible(true);
    const member = await AsyncStorage.getItem('Member');
    const name = await AsyncStorage.getItem(LocalStorage.username);
    await permission();
    const d = new Date();
    console.log(d);
    let day = d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    let month = d.getDate() + 1;
    const base64Image = qrCode;
    var Base64Code = base64Image.split('data:image/png;base64,'); //base64Image is my image base64 string
    const dirs = RNFetchBlob.fs.dirs;
    var path =
      dirs.DCIMDir +
      `/${
        member == 'Not a member'
          ? `${name.split(' ').join('') + '_ChauviharQR'}`
          : `${name.split(' ').join('') + '_ChauviharQR'}`
      }-${day}-${month}-${year}.png`;
    RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
      console.log('File : ', res);
      Toast.show('QR Code saved successfully');
      setVisible(false);
    });
  };
  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={{flex: 1}}>
      <Header
        title={'My QR'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        {true ? <Image source={{uri: data?.data}} /> : null}
        <TouchableOpacity
          onPress={() => {
            saveToGallery1(data?.data);
          }}
          style={styles.touch1}>
          <Text style={styles.text}>{'Save To Gallary'}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Chauviharcode;
const styles = StyleSheet.create({
  touch1: {
    height: 43,
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    marginTop: 50,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
});
