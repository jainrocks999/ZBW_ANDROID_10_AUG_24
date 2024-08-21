import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../components/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import RadioGroup from '../../../components/Radio/RadioComponent';
import ArrowDown from '../../../assets/Icon/ArrowDown.svg';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../../components/Loader';
import Constants from '../../../Redux/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorage from '../../../components/LocalStorage';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';
import RNFetchBlob from 'rn-fetch-blob';
import permission from '../../utils/permission';
import CircleCross from '../../../assets/Icon/CircleCross.svg';

const ChauviharEventdetails = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const {chauvhir} = useSelector(state => state);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const nonMember = route?.params?.nonMember;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(-1);
  const hideMenu = () => setVisible(-1);
  const showMenu = index => setVisible(index);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedtime, setSelectedtime] = useState({});

  const handleRadioPress = (itemIndex, selectedId) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [itemIndex]: selectedId,
    }));
    setSelectedtime(prev => ({
      ...prev,
      [itemIndex]: '',
    }));
  };

  const handleMenuPress = (itemIndex, selected) => {
    setSelectedtime(prev => ({
      ...prev,
      [itemIndex]: selected,
    }));
    setVisible(-1);
  };

  const renderRow = ({item, index}) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text
          style={{
            color: '#000000',
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 14,
          }}>
          {item.e_date}
        </Text>
      </View>
      <View style={styles.cell}>
        <RadioGroup
          containerStyle={{
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'space-between',
          }}
          labelStyle={{
            fontSize: 12,
            fontFamily: 'Montserrat-SemiBold',
            color: '#000000',
            width: 74,
          }}
          radioButtons={item.option1}
          onPress={id => {
            handleRadioPress(index, id);
          }}
          selectedId={selectedOptions[index]}
        />
      </View>
      <View style={styles.cell}>
        {selectedOptions[index] && selectedOptions[index] !== '1' ? (
          <Menu
            visible={index == visible}
            anchor={
              <TouchableOpacity
                onPress={() => {
                  showMenu(index);
                }}
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {selectedtime[index] ? (
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                    }}>
                    {selectedtime[index]}
                  </Text>
                ) : (
                  <View
                    style={{
                      padding: 5,
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      borderRadius: 6,
                      elevation: 5,
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Montserrat-SemiBold',
                        color: 'black',
                      }}>
                      {'Select '}
                    </Text>
                    <View style={{marginTop: 5, marginLeft: 5}}>
                      <ArrowDown height={10} width={10} color={'red'} />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            }
            onRequestClose={hideMenu}>
            {Object.keys(item.option2)
              .filter(item =>
                selectedOptions[index] != '-1' ? item : item != 'Both',
              )
              .map(item => {
                return (
                  <>
                    <MenuItem
                      textStyle={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-Medium',
                        color: '#000000',
                      }}
                      onPress={() => handleMenuPress(index, item)}>
                      {item}
                    </MenuItem>
                    <MenuDivider />
                  </>
                );
              })}
          </Menu>
        ) : (
          <Text>{'-'}</Text>
        )}
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Date</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}> {''}</Text>
      </View>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Slots</Text>
      </View>
    </View>
  );

  // const handleSubmit = () => {
  //   const mergedData = chauvhiarDates.map((item, index) => ({
  //     e_date: item.e_date,
  //     selectedOption: selectedOptions[index] ?? '',
  //     selectedTime: selectedtime[index] ?? '',
  //   }));
  //   dispatch({
  //     type: 'setHome',
  //   });
  //   const unSelectedDates = mergedData
  //     .filter(item => item.selectedOption == '')
  //     .map(item => item.e_date);
  //   if (unSelectedDates.length === mergedData.length) {
  //     Alert.alert('Alert', 'have to select at least 1 day');
  //     return;
  //   }
  //   const selecteDates = mergedData.filter(
  //     item => item.selectedOption != '' && item.selectedOption != '1',
  //   );
  //   const unsilectedtime = selecteDates
  //     .filter(item => item.selectedOption != '1' && item.selectedTime == '')
  //     .map(item => item.e_date);
  //   if (unsilectedtime.length > 0) {
  //     Alert.alert(
  //       'Alert',
  //       unsilectedtime.length > 1
  //         ? `select the slot for these dates ${unsilectedtime.join(',')}`
  //         : `select the slot for these date ${unsilectedtime[0]}`,
  //     );
  //     return;
  //   }
  //   if (unSelectedDates.length > 0) {
  //     Alert.alert(
  //       'Alert',
  //       unSelectedDates.length > 1
  //         ? `Are you sure to not attend the event on these days ${unSelectedDates.join(
  //             ',',
  //           )}?? `
  //         : `Are you sure to not attend the event on these day ${unSelectedDates.join(
  //             ',',
  //           )}?? `,
  //     );
  //   }

  //   console.log('Merged Data:', JSON.stringify(mergedData));
  // };
  const validate = () => {
    const mergedData = chauvhiarDates.map((item, index) => ({
      e_date: item.e_date,
      selectedOption: selectedOptions[index] ?? '',
      selectedTime: selectedtime[index] ?? '',
    }));

    const unselectedDates = mergedData
      .filter(item => !item.selectedOption)
      .map(item => item.e_date);
    if (unselectedDates.length === mergedData.length) {
      Alert.alert('Alert', 'You must select at least one day.');
      return;
    }

    const selectedDates = mergedData.filter(
      item => item.selectedOption && item.selectedOption !== '1',
    );
    const datesWithoutTime = selectedDates
      .filter(item => !item.selectedTime)
      .map(item => item.e_date);
    if (datesWithoutTime.length > 0) {
      Alert.alert(
        'Alert',
        datesWithoutTime.length > 1
          ? `Please select a slot for these dates: ${datesWithoutTime.join(
              ', ',
            )}`
          : `Please select a slot for this date: ${datesWithoutTime[0]}`,
      );
      return;
    }

    if (unselectedDates.length > 0) {
      Alert.alert(
        'Alert',
        unselectedDates.length > 1
          ? `Are you sure you don't want to attend the event on these days: ${unselectedDates.join(
              ', ',
            )}?`
          : `Are you sure you don't want to attend the event on this day: ${unselectedDates[0]}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch({
                type: 'setHome',
              });
              handleOnSubmit(mergedData);
            },
          },
        ],
      );
      return;
    }
    dispatch({
      type: 'setHome',
    });
    handleOnSubmit(mergedData);

    // navigation.reset({index: 0, routes: [{name: 'Home'}]});
    // console.log('Merged Data:', JSON.stringify(mergedData));
  };
  const handleOnSubmit = async data => {
    try {
      // console.log('tuyyuyyuyyyu', nonMember[0]['_id']);
      setLoading(true);
      const user_token = await AsyncStorage.getItem(LocalStorage.user_token);
      const member = await AsyncStorage.getItem('isMember');
      const isSecondary = await AsyncStorage.getItem('isSecondary');
      const chauvhiar_id = chauvhir[0]['_id'];
      const event_data = {
        chouviharEvId: chauvhiar_id,
        isMember: isSecondary == 1 ? 1 : member == 1 ? 1 : 0,
        nonMember: nonMember ? nonMember[0]['_id'] : '',
        foods: data,
      };
      console.log('data====>>>>', JSON.stringify(event_data));
      // return
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}chouviharevent/apply`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${user_token}`,
        },
        data: JSON.stringify(event_data),
      };
      // const response = responsee;
      const response = await axios(config);
      console.log('response======>>', JSON.stringify(response.data));
      if (response.data?.code == 200) {
        if (isSecondary == 1) {
          setQrCodeVisible(true);
          setQrCode(response.data.data);
        } else {
          if (member == 0) {
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
          } else if (member == 1) {
            setQrCodeVisible(true);
            setQrCode(response.data.data);
          }
        }
      } else {
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
      Toast.show(response.data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const saveToGallery1 = async qrCode => {
    try {
      setLoading(true);
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
          true
            ? `${name.split(' ').join('') + '_ChauviharQR'}`
            : `${name.split(' ').join('') + '_ChauviharQR'}`
        }-${day}-${month}-${year}.png`;
      RNFetchBlob.fs.writeFile(path, Base64Code[1], 'base64').then(res => {
        console.log('File : ', res);
        Toast.show('QR Code saved successfully');
        setQrCodeVisible(false);
        setLoading(false);
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      });
    } catch (err) {
      Toast.show('Error for QR code saving');
      setLoading(false);
    }
  };
  useEffect(() => {
    const backAction = () => {
      Toast.show('Please complete the form');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      <Header
        title={'Chauvihar Event'}
        onPress={() => {
          Toast.show('Please complete the form');
        }}
        onPress2={() => navigation.navigate('Notification')}
        notification={true}
      />
      {loading && <Loading />}
      {renderHeader()}
      <FlatList
        data={chauvhiarDates}
        contentContainerStyle={{paddingBottom: 10}}
        renderItem={renderRow}
      />
      <TouchableOpacity onPress={validate} style={styles.touch1}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      <Modal transparent visible={qrCodeVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <View style={styles.first1}>
            {loading && <Loading />}
            <TouchableOpacity
              onPress={() => {
                setQrCodeVisible(false);
                navigation.reset({index: 0, routes: [{name: 'Home'}]});
              }}
              style={{position: 'absolute', right: '5%', top: '5%'}}>
              <CircleCross />
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 160, width: 160, marginTop: '-15%'}}
                source={{uri: qrCode}}
              />
              <TouchableOpacity
                onPress={() => {
                  saveToGallery1(qrCode);
                }}
                style={[
                  styles.touch1,
                  {position: 'absolute', bottom: 20, width: 160},
                ]}>
                <Text style={styles.text}>Save to Gallary</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ChauviharEventdetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  headerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: 'black',
  },
  table: {
    borderWidth: 0.5,
    borderColor: '#000',
    margin: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch1: {
    height: 43,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    height: '50%',
    borderRadius: 16,
    width: '84%',
    alignSelf: 'center',
  },
});

export const chauvhiarDates = [
  {
    e_date: '31-08-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '01-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '02-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '03-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '04-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '05-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
  {
    e_date: '06-09-2024',
    option1: [
      {id: '1', label: 'Ekasana', value: 'Ekasana'},
      {id: '2', label: 'Biyasana', value: 'Biyasana'},
      {id: '3', label: 'Chauvihar', value: 'Chauvihar'},
    ],
    option2: {
      Morning: 'Morning',
      Evening: 'Evening',
      Both: 'Both',
    },
  },
];

const responsee = {
  data: {
    message: 'Record created!',
    data: 'data:image/png;base64,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',
    code: 200,
    success: true,
  },
};
