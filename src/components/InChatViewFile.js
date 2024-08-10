import React from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text, Dimensions
} from 'react-native';
import Pdf from 'react-native-pdf';

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
                <Pdf
                    trustAllCerts={false}
                    source={{ uri: currentMessage.file.url, cache: true }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log("error    ",error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }} />
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

