import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  UIManager,
  Platform,
  Dimensions,
} from 'react-native';
import Header from '../../../components/CustomHeader';
import List from './ChauviharMenu'; // Assuming List is in this file
import {chauvhiarDates} from './ChauviharEventList'; // Assuming this is your data source
import {useNavigation} from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const {width} = Dimensions.get('window');
const ChauViharMenuDates = ({route}) => {
  const {data} = route.params;
  console.log('thistttttttt', data[0]?.event_foods);
  const getFomarmate = date => {
    var array = date?.split('/');
    let newdata = `${array[1]}/${array[0]}/${array[2]}`;
    return newdata;
  };
  const flatlistref = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const navigation = useNavigation();

  const toggleExpansion = index => {
    flatlistref.current.scrollToIndex({index: index - 1 != -1 ? index - 1 : 0});
    setExpandedItem(expandedItem === index ? null : index);
  };

  const renderItem = ({item, index}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.touch1}
        onPress={() => toggleExpansion(index)}>
        <Text style={styles.text}>{getFomarmate(item?.date)}</Text>
      </TouchableOpacity>
      <Collapsible
        style={styles.expandedContainer}
        collapsed={expandedItem == index ? false : true}>
        <View style={{width: width}}>
          <List data={item?.day_menus} />
        </View>
      </Collapsible>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={styles.container}>
      <Header
        title={'Menu List'}
        onPress={() => navigation.goBack()}
        onPress2={() => navigation.navigate('Notification')}
      />
      <FlatList
        ref={flatlistref}
        data={data[0]?.event_foods}
        contentContainerStyle={styles.flatListContainer}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingBottom: 15,
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  expandedContainer: {
    width: '100%',
    paddingVertical: 5,
  },
  collapsedContainer: {
    width: '100%',
    height: 0, // Ensures no extra space when collapsed
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 14,
  },
  touch1: {
    height: 43,
    width: width * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDA64',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default ChauViharMenuDates;
