import React from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text, Dimensions
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';

function InChatViewFile({ props, visible, onClose }) {
    const { currentMessage } = props;
    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
      console.log('this is props',props)
    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            animationType="slide"
            style={{ height: 600 }}
        >
            <View style={{ padding: 0 }}>
            {/* <VideoPlayer
                tapAnywhereToPause
                pause={true}
                controls={true}
                source={{uri: 'https://firebasestorage.googleapis.com/v0/b/zbwa-816d7.appspot.com/o/VID-20231226-WA0005.mp4?alt=media&token=dcfab351-60d5-478b-837c-ed280bd81f3f'}}
                /> 
                 */}
                <TouchableOpacity onPress={onClose} style={styles.buttonCancel}>
                    <Text style={styles.textBtn}>X</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
export default InChatViewFile;
const styles = StyleSheet.create({
    buttonCancel: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        left: 13,
        top: 20,
    },
    textBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

