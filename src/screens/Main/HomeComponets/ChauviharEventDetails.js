import React from 'react';
import {useSelector} from 'react-redux';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/CustomHeader';

const ChauviharEventDetails = ({navigation}) => {
  const {chauvhir} = useSelector(state => state);
  const event = Array.isArray(chauvhir) ? chauvhir[0] : null;

  const formatDate = data => {
    const formatdate = new Date(data);
    let day = formatdate.getDay();
    let month = formatdate.getMonth();
    let year = formatdate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>No event details available</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={{flex: 1}}>
      <Header
        title={'Chauvihar House'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.eventName}>{event.name}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>{formatDate(event.start_date)}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>{formatDate(event.end_date)}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Registration Last Date:</Text>
            <Text style={styles.value}>
              {formatDate(event.registration_last_date)}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{event.address || 'TBD'}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>
              {event.description.replace(/<[^>]*>/g, '')}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChouviharEvent');
            }}
            style={styles.touch1}>
            <Text style={styles.text2}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChauviharEventDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    // backgroundColor: '#FFFFFF',
    marginTop: '-15%',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 20,
    color: '#333',
    marginLeft: '-5%',
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
    marginTop: 5,
  },
  descriptionContainer: {
    marginTop: 0,
    width: '100%',
  },
  touch1: {
    height: 43,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    marginTop: 30,
  },
  text2: {
    // marginLeft: 20,
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
});
