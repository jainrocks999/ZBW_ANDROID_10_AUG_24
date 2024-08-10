import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const InChatFileTransfer = ({filePath,fileName}) => {
  var fileType = '';
  var name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop();
    fileType= filePath.split('.').pop();
  }
 
  return (
    <View style={styles.container}>
      <View
        style={styles.frame}
      >
         <Image
            source={
              fileType === 'pdf'
                ? require('../assets/Icon/pdf.png')
                : require('../assets/Icon/pdf.png')
            }
            style={{width: 44,height:50}}
            resizeMode='contain'
            // resizeMode='cover'
          />
        <View>
          {/* <Text style={styles.text}>
            {name.replace('20%', '').replace(' ', '')}
          </Text> */}
          <Text  ellipsizeMode='head' style={styles.textType}>{fileName}</Text>
        </View>
      </View>
    </View>
  );
};
export default InChatFileTransfer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 5,
    borderRadius: 15,
    padding: 5,
    // width:'90%'
  },
  text: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  textType: {
    color: 'black',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    // width:'90%',
    // textAlign:'center'
  },
  frame: {
    width:'70%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    padding: 5,
    marginTop: -4,
  },
});