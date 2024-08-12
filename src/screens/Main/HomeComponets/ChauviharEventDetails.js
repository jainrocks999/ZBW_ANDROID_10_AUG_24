import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import {FlatList} from 'react-native';
import Toast from 'react-native-simple-toast';
const ChauviharEventDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const {chauvhirls} = useSelector(state => state);
  const event = Array.isArray(chauvhirls) ? chauvhirls[0] : null;
  const formatDateToIndianFormat = isoDateString => {
    const date = new Date(isoDateString);

    // Format day, month, and year
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    // Format time (12-hour format with AM/PM)
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedHours = hours.toString().padStart(2, '0');

    // Combine into final format
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return `${formattedDate} `;
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>No event details available</Text>
      </View>
    );
  }
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.eventName}>{item.name}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Start Date:</Text>
        <Text style={styles.value}>
          {formatDateToIndianFormat(item.start_date)}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>End Date:</Text>
        <Text style={styles.value}>
          {formatDateToIndianFormat(item.end_date)}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Registration Last Date:</Text>
        <Text style={styles.value}>
          {formatDateToIndianFormat(item.registration_last_date)}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{item.address || 'TBD'}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>
          {item.description.replace(/<[^>]*>/g, '')}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          let date = new Date(item.end_date);
          let now = new Date();
          if (now > date) {
            Toast.show('registration is closed');
            return;
          }
          dispatch({
            type: 'set_Chauvihar_event',
            payload: [item],
          });
          navigation.navigate('ChouviharEvent');
        }}
        style={styles.touch1}>
        <Text style={styles.text2}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={{flex: 1}}>
      <Header
        title={'Chauvihar House'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <FlatList data={chauvhirls} renderItem={renderItem} />
    </ImageBackground>
  );
};

export default ChauviharEventDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  card: {
    marginVertical: 10,
    borderRadius: 8,
    padding: 20,
    // backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  eventName: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'black',
    marginTop: 2,
  },
  descriptionContainer: {
    marginTop: 10,
    width: '100%',
  },
  touch1: {
    height: 43,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  text2: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
});
