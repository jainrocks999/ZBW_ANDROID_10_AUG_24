import react, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Plus from '../../../assets/Icon/Plus.svg';
import Modal from 'react-native-modal';
import CircleCross from '../../../assets/Icon/CircleCross.svg';
import CircleCross2 from '../../../assets/Icon/CircleCross2.svg';
import axios from 'axios';
import Loader from '../../../components/Loader';
import Storage from '../../../components/LocalStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Constants from '../../../Redux/Constants';
import ScalableImage from 'react-native-scalable-image';
import Eye from '../../../assets/Icon/eye1.svg';
import FastImage from 'react-native-fast-image';

const Complaints = () => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const isFocused = useIsFocused();
  const [item, setItem] = useState();
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState('');
  useEffect(() => {
    if (isFocused) {
      apiCall();
    }
  }, [isFocused]);

  const apiCall = async () => {
    const user_token = await AsyncStorage.getItem(Storage.user_token);

    setLoader(true);
    axios({
      method: 'get',
      url: `${Constants.MainUrl}complaint/all`,
      headers: `Authorization: ${user_token}`,
    })
      .then(function (response) {
        console.log('this is rsponse', JSON.stringify(response.data));
        if (response.data.code == '200') {
          setData(response.data.data);

          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(response.data.message);
        }
      })
      .catch(function (error) {
        setLoader(false);
        Toast.show(error.response.data.message);
      });
  };

  const renderDate = date => {
    const d = new Date(date);
    let day = d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    const month = d.toLocaleString('default', {month: 'short'});
    return (
      <Text
        numberOfLines={2}
        style={styles.date}>{`${day} ${month} , ${year}`}</Text>
    );
  };
  const renderDate1 = date => {
    const d = new Date(date);
    let day = d.getDate();
    let year = d.getFullYear();
    if (day.length < 2) day = '0' + day;
    const month = d.toLocaleString('default', {month: 'short'});
    return (
      <Text
        numberOfLines={2}
        style={styles.date1}>{`${day} ${month} , ${year}`}</Text>
    );
  };
  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      {loader ? <Loader /> : null}
      <Header
        title={'Complaints'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <View style={styles.main}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.add}>
            Add and view the status of your complaints
          </Text>
        </View>
        {/* <View style={{ marginTop: 40,borderWidth:1,flexGrow:1 }}> */}
        <FlatList
          data={data}
          style={{marginTop: 30, marginBottom: 60}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                setItem(item);
              }}
              style={[
                styles.elevation,
                {
                  borderLeftColor:
                    item.status == 'Solved' ? '#35CD56' : '#359FCD',
                },
              ]}>
              <View style={styles.view}>
                <Text style={styles.title}>{item.subject}</Text>
                {renderDate(item.createdAt)}
                {/* <Text style={styles.date}>{item.createdAt}</Text> */}
              </View>
              <View style={styles.view1}>
                <Text style={styles.complainNumber}>
                  {'Complain Number : '}
                </Text>
                <Text style={styles.text}>{item.complaintId}</Text>
              </View>
              <Text style={styles.name}>{item?.accused?.name}</Text>
              <TouchableOpacity
                style={[
                  styles.touch,
                  {
                    backgroundColor:
                      item.status == 'Solved' ? '#35CD56' : '#359FCD',
                  },
                ]}>
                <Text style={styles.status}>{item.status}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        {/* <View style={{height:50}}/> */}
        {/* </View> */}
      </View>
      <Modal isVisible={isVisible}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{alignSelf: 'flex-end', margin: 5}}>
            <CircleCross />
          </TouchableOpacity>
          {item ? (
            <View style={{padding: 15}}>
              <Text style={styles.cheat}>{item?.subject}</Text>
              {renderDate1(item?.createdAt)}
              {/* <Text style={styles.date1}>16 Oct, 2023</Text> */}
              <View style={styles.row}>
                <Text style={styles.same}>{'Opposite Party Name : '}</Text>
                <Text style={styles.name1}>{item?.accused?.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.same}>{'Opposite Party Firm Name : '}</Text>
                <Text style={styles.name1}>{item?.accused?.firmName}</Text>
              </View>
              <View style={{marginTop: 6}}>
                <Text style={styles.same}>{'Details : '}</Text>
                <Text style={styles.name1}>{item?.detail}</Text>
              </View>
              {item?.complaintPhoto.length > 0 ? (
                <Text style={styles.same}>{`Image :`}</Text>
              ) : null}
              {item?.complaintPhoto ? (
                <FlatList
                  data={item?.complaintPhoto}
                  horizontal
                  renderItem={({item}) => (
                    <View style={{alignItems: 'center', marginTop: 20}}>
                      <TouchableOpacity
                        onPress={() => {
                          setVisible(false);
                          setImage(item);
                          setTimeout(() => {
                            setModal(true);
                          }, 500);
                        }}>
                        <ImageBackground
                          resizeMode="contain"
                          style={{
                            height: 200,
                            width: 160,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          source={{uri: item}}>
                          <View>
                            <Eye width={30} height={30} />
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null}
              {/* {item?.complaintPhoto ?
                             item?.complaintPhoto.map(item=>(
                            <View style={{ alignItems: 'center',marginTop:20 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisible(false)
                                        // setImage(item.complaintPhoto)
                                        setTimeout(() => {
                                            setModal(true)
                                        }, 500);
                                       
                                    }}
                                >
                                    <ImageBackground
                                        resizeMode="contain"
                                        style={{
                                            height: 200,
                                            width: 160,
                                            alignItems:'center',
                                            justifyContent:'center'
                                        }} source={{ uri: item }} >
                                            <View>
                                                <Eye width={30} height={30}/>
                                            </View>
                                        </ImageBackground>
                                </TouchableOpacity>
                            </View>
                             )): null} */}
            </View>
          ) : null}
        </View>
      </Modal>
      <Modal
        visible={modal}
        onRequestClose={() => setModal(false)}
        animationType="slide"
        style={{margin: 0, backgroundColor: '#000'}}>
        <View
          style={{
            flex: 1,
            marginTop: Platform.OS == 'ios' ? 35 : 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <FastImage
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              source={{
                uri: image,

                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setModal(false);
            }}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              borderColor: 'black',
              right: 10,
              top: 10,
            }}>
            <CircleCross2 />
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddComplaints')}
          style={styles.plus}>
          <Plus />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Complaints;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    paddingHorizontal: 25,
    paddingTop: 14,
  },
  add: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#000000',
  },
  elevation: {
    width: '100%',
    borderWidth: 1,
    borderTopColor: '#FCDA64',
    borderRightColor: '#FCDA64',
    borderBottomColor: '#FCDA64',
    marginBottom: 20,
    borderRadius: 10,
    borderLeftWidth: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 7,
    // margin:1
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  date: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  complainNumber: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#000000',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#000000',
  },
  name: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: '#000000',
    marginTop: 6,
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 4,
  },
  status: {
    color: '#FFFFFF',
    fontSize: 8,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 2,
  },
  modal: {
    backgroundColor: '#FDEDB1',
    borderRadius: 16,
    paddingBottom: 20,
  },
  cheat: {
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  date1: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    marginTop: 6,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  same: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  name1: {
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  bottom: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  plus: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#FCDA64',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// const data = [
//     { title: 'Cheating', complainNumber: '75', name: 'Ashish Haval', status: 'Accepted', date: '16 Oct, 2023' },
//     { title: 'Theft', complainNumber: '77', name: 'Ashish Haval', status: 'In Progress (please visit office)', date: '16 Oct, 2023' },

// ]
