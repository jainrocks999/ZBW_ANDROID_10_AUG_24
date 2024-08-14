import React from 'react';
import {StyleSheet, FlatList, View, Image, Text, Dimensions} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
const List = ({data}) => {
  console.log('data', data);
  return (
    <FlatList
      data={data}
      nestedScrollEnabled={true}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => (
        <View style={{marginTop: 25}}>
          <Text style={styles.text}>{item?.text}</Text>
          <View style={styles.itemContainer}>
          <AutoHeightImage
          width={ Dimensions.get('window').width - 40}
          source={{ uri: item.image }}
        /> 
            {/* <Image
              resizeMode="stretch"
              source={{uri: item.image}}
              style={styles.image}
            /> */}
          </View>
        </View>
      )}
    />
  );
};

const data = [
  {image: require('../../../assets/Food/Jain-foods-list.png')},
  {image: require('../../../assets/Food/Jain-foods-list.png')},
  {image: require('../../../assets/Food/Jain-foods-list.png')},
  {image: require('../../../assets/Food/Jain-foods-list.png')},
  {image: require('../../../assets/Food/Jain-foods-list.png')},
  {image: require('../../../assets/Food/Jain-foods-list.png')},
];

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 25,
  },
  itemContainer: {
    // width: '90%',
    borderWidth: 1,
    borderColor: '#FCDA64',
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    // height: 250,

    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 5,
  },
});

export default List;
