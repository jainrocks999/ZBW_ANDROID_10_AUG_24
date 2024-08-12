import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../../../components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';

const ChauviharEventSelect = ({navigation}) => {
  const formatDate = data => {
    const formatdate = new Date(data);
    let day = formatdate.getUTCDate().toString().padStart(2, '0');
    let month = (formatdate.getUTCMonth() + 1).toString().padStart(2, '0');
    let year = formatdate.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  const dispatch = useDispatch();
  const {chauvhirls} = useSelector(state => state);
  console.log(JSON.stringify(chauvhirls));
  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      <CustomHeader
        title={'Chauvihar Event'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <FlatList
        data={chauvhirls}
        contentContainerStyle={{padding: 10}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: 'set_Chauvihar_event',
                  payload: [item],
                });
                navigation.navigate('ChauviharEventDetails');
              }}
              style={styles.view}>
              <Text style={styles.label}>{item?.name}</Text>
              <Text style={styles.value}>{formatDate(item?.start_date)}</Text>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: 'black',
                  position: 'absolute',
                  right: '5%',
                }}
                source={require('../../../assets/Icon/right.png')}
              />
            </TouchableOpacity>
          );
        }}
      />
    </ImageBackground>
  );
};

export default ChauviharEventSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    width: '100%',
    backgroundColor: '#FCDA6480',
    borderRadius: 20,
    paddingHorizontal: 14,
    // alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 15,
    shadowColor: '#FCDA6480',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    paddingLeft: 30,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: '#000',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    marginTop: 5,
  },
});
