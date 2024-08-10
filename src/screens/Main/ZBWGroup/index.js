import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  StyleSheet,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';
import HeaderArrow from '../../../assets/Icon/HeaderArrow.svg';
import ChatLogo from '../../../assets/Icon/ChatLogo.svg';
import {useNavigation} from '@react-navigation/native';
import Attach from '../../../assets/Icon/Attach.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GiftedChat, Actions, Send, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../../../components/LocalStorage';
import DocumentPicker from 'react-native-document-picker';
import InChatFileTransfer from '../../../components/InChatFileTransfer.js';
import storage from '@react-native-firebase/storage';
import Loading from '../../../components/Loader';
import VideoPlayer from 'react-native-video-controls';
import CircleCross1 from '../../../assets/Icon/CircleCross1.svg';
import RNFetchBlob from 'react-native-blob-util';
import Toast from 'react-native-simple-toast';
import Compress from 'react-native-compressor';
import axios from 'axios';
import Constants from '../../../Redux/Constants';

const ZBWGroup = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [messageId, setMessageId] = useState();
  const [isTyping, setTyping] = useState(false);
  const [userId, setUserId] = useState();
  const [image, setImage] = useState();
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileVisible, setFileVisible] = useState(false);
  const [videoPath, setVideoPath] = useState('');
  const [isAttachVideo, setIsAttachVideo] = useState(false);
  const [videoVisile, setVideoVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const getCurrentMessages = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    setUserId(user_id);
    await firestore()
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(res => {
          const {_id, user, text, createdAt, image, file, video, fileName} =
            res.data();
          messages.push({
            key: res._id,
            _id,
            user,
            text,
            createdAt,
            image,
            file,
            video,
            fileName,
          });
        });
        setMessages(messages);
      });
  };
  useEffect(() => {
    getCurrentMessages();
  }, []);

  const onSend = async message => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    const username = await AsyncStorage.getItem(Storage.username);
    if (isAttachImage) {
      setLoading(true);
      const result = await Compress.Image.compress(imagePath, {
        progressDivider: 10,
        downloadProgress: progress => {
          console.log('downloadProgress: ', progress);
        },
      });
      const reference = storage().ref(
        result.substring(result.lastIndexOf('/') + 1),
      );

      const pathToFile =
        Platform.OS === 'ios' ? result.replace('file:///', '') : result;
      await reference.putFile(pathToFile);

      const url = await storage()
        .ref(result.substring(result.lastIndexOf('/') + 1))
        .getDownloadURL();

      setImagePath('');
      setIsAttachImage(false);
      setLoading(false);
      await firestore()
        .collection('chat')
        .doc()
        .set(
          {
            _id: message[0]._id,
            text: message[0].text,
            createdAt: Date.parse(message[0].createdAt),
            fileName: '',
            image: url,
            video: '',
            file: {
              url: '',
            },
            user: {
              _id: user_id,
              name: username,
            },
          },
          {merge: true},
        );

      let data = JSON.stringify({
        userId: user_id,
        description: 'Someone has added a video/picture.',
        title: 'New Message on ZBWA Group',
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}pushnotification/chat`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          console.log('hi', JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } else if (isAttachFile) {
      setLoading(true);
      const reference = storage().ref(
        filePath.substring(filePath.lastIndexOf('/') + 1),
      );
      const fileName = filePath.split('/').pop();
      const pathToFile =
        Platform.OS === 'ios' ? filePath.replace('file:///', '') : filePath;
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(filePath.substring(filePath.lastIndexOf('/') + 1))
        .getDownloadURL();
      await firestore()
        .collection('chat')
        .doc()
        .set(
          {
            _id: message[0]._id,
            text: message[0].text,
            createdAt: Date.parse(message[0].createdAt),
            image: '',
            fileName: fileName,
            video: '',
            file: {
              url: url,
            },
            user: {
              _id: user_id,
              name: username,
            },
          },
          {merge: true},
        );
      let data = JSON.stringify({
        userId: user_id,
        description: 'Someone has added a video/picture.',
        title: 'New Message on ZBWA Group',
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}pushnotification/chat`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          console.log('hi', JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
      setFilePath('');
      setIsAttachFile(false);
    } else if (isAttachVideo) {
      setLoading(true);
      const reference = storage().ref(
        videoPath.substring(videoPath.lastIndexOf('/') + 1),
      );
      const pathToFile =
        Platform.OS === 'ios' ? videoPath.replace('file:///', '') : videoPath;
      await reference.putFile(pathToFile);
      const url = await storage()
        .ref(videoPath.substring(videoPath.lastIndexOf('/') + 1))
        .getDownloadURL();
      await firestore()
        .collection('chat')
        .doc()
        .set(
          {
            _id: message[0]._id,
            text: message[0].text,
            createdAt: Date.parse(message[0].createdAt),
            image: '',
            fileName: '',
            video: url,
            file: {
              url: '',
            },
            user: {
              _id: user_id,
              name: username,
            },
          },
          {merge: true},
        );
      let data = JSON.stringify({
        userId: user_id,
        description: 'Someone has added a video/picture.',
        title: 'New Message on ZBWA Group',
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}pushnotification/chat`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          console.log('hi', JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
      setLoading(false);
      setVideoPath('');
      setIsAttachVideo(false);
    } else {
      await firestore()
        .collection('chat')
        .doc()
        .set(
          {
            _id: message[0]._id,
            text: message[0].text,
            createdAt: Date.parse(message[0].createdAt),
            image: '',
            file: '',
            fileName: '',
            video: '',
            user: {
              _id: user_id,
              name: username,
            },
          },
          {merge: true},
        );
      let data = JSON.stringify({
        userId: user_id,
        description: message[0].text,
        title: 'New Message on ZBWA Group',
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Constants.MainUrl}pushnotification/chat`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios
        .request(config)
        .then(response => {
          console.log('hi', JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const checklistImage = {
    title: 'Select Image',
    quality: 0.7,
    maxWidth: 500,
    maxHeight: 500,
    saveToPhotos: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const _pickGallery = async () => {
    launchImageLibrary(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setImagePath(res.uri);
        setIsAttachImage(true);
      }
    });
  };

  const _pickCamera = async () => {
    launchCamera(checklistImage, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const res = response.assets[0];
        setImagePath(res.uri);
        setIsAttachImage(true);
      }
    });
  };

  const _pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });
      const fileUri = result[0].fileCopyUri;
      var extension = fileUri.split('.').pop();
      console.log('this is exten', extension);
      console.log('this is file', extension);
      console.log('this is file uri', fileUri);
      if (!fileUri) {
        return;
      } else if (extension == 'pdf' || extension == 'PDF') {
        setFilePath(fileUri);
        setIsAttachFile(true);
      } else if (
        extension == 'PNG' ||
        extension == 'JPG' ||
        extension == 'jpg' ||
        extension == 'png' ||
        extension == 'jpeg' ||
        extension == 'JPEG'
      ) {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else if (extension == 'jpeg' || extension == 'JPEG') {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else if (extension == 'mp4' || extension == 'MOV') {
        const MAX_SIZE_VIDEO = 8388608; //8*1024*1024
        RNFetchBlob.fs
          .stat(
            fileUri
              .replace('file:///', '')
              .replace('file://', '')
              .replace('file:/', ''),
          )
          .then(stats => {
            console.log('file size', stats.size / (1024 * 1024));
            if (stats.size > MAX_SIZE_VIDEO) {
              Alert.alert(
                '',
                'This video is too large to be uploaded.you can upload only 8 MB video',
              );
              return;
            } else {
              setVideoPath(fileUri);
              setIsAttachVideo(true);
            }
          })
          .catch(err => {
            console.log('getSize', err);
            // error(err)
          });
      } else {
        Toast.show('Not Supported');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  const renderBubble = props => {
    const {currentMessage} = props;
    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
          // onPress={() => setFileVisible(true)}
          onPress={() => navigation.navigate('ViewPdf', {currentMessage})}
          style={{
            alignItems: 'center',
            backgroundColor:
              props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
            marginTop: 10,
            // marginHorizontal:-10
          }}>
          <InChatFileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
            onClose={() => setFileVisible(false)}
            fileName={currentMessage.fileName}
          />
          {/* <InChatViewFile
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
            // fileName:
          /> */}
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: 15,
                color: currentMessage.user._id === 2 ? 'white' : 'black',
              }}>
              {currentMessage.text}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#efefef',
          },
        }}
      />
    );
  };

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
          <TouchableOpacity
            onPress={() => {
              setImagePath('');

              setText('');
            }}
            style={{
              backgroundColor: 'blue',
              alignSelf: 'flex-start',
              height: 23,
              width: 23,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 11.5,
              marginTop: -10,
              marginLeft: -10,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={{flexDirection: 'row'}}>
          <InChatFileTransfer filePath={filePath} />
          <TouchableOpacity
            onPress={() => setFilePath('')}
            style={{
              backgroundColor: 'blue',
              alignSelf: 'flex-start',
              height: 23,
              width: 23,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 11.5,
              marginTop: -10,
              marginLeft: -20,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (videoPath) {
      return (
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
            }}>
            <Text style={{fontSize: 12}}>Uploading Video</Text>
          </View>
          <TouchableOpacity
            onPress={() => setVideoPath('')}
            style={{
              backgroundColor: 'blue',
              alignSelf: 'flex-start',
              height: 23,
              width: 23,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 11.5,
              marginTop: -10,
              marginLeft: -20,
            }}>
            <Text style={{fontSize: 14, color: '#fff'}}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath, videoPath]);

  function renderLoading() {
    return (
      <View style={{flex: 1}}>
        <Loading />
      </View>
    );
  }

  const renderMessageVideo = props => {
    const {currentMessage} = props;
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoVisible(true);
          setVideoUrl(currentMessage.video);
        }}
        style={{
          height: 350,
          width: 250,
          backgroundColor: '#000',
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../../../assets/Icon/play.png')}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require('../../../assets/Logo/background.png')}
      style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {loading ? <Loading /> : null}

      <View
        style={{
          height: 45,
          backgroundColor: '#000000',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HeaderArrow />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ChatLogo />
          <Text
            style={{
              fontSize: 16,
              color: '#FCDA64',
              fontFamily: 'Montserrat-Bold',
              marginLeft: 15,
            }}>
            {'ZBW GROUP'}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 60,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}></TouchableOpacity>
      </View>
      <GiftedChat
        showUserAvatar={true}
        renderUsernameOnMessage={true}
        messages={messages}
        onSend={message => onSend(message, filePath)}
        text={text}
        onInputTextChanged={text => setText(text)}
        renderLoading={renderLoading}
        renderMessageVideo={renderMessageVideo}
        alwaysShowSend={
          text
            ? true
            : false || isAttachFile
            ? true && setText(' ')
            : false || isAttachImage
            ? true && setText(' ')
            : false || isAttachVideo
            ? true && setText(' ')
            : false
        }
        renderActions={props => (
          <Actions
            {...props}
            options={{
              ['Document']: props => {
                _pickDocument();
              },
              ['Camera']: props => {
                _pickCamera();
              },
              ['Gallery']: props => {
                _pickGallery();
              },
              Cancel: props => {
                console.log('Cancel');
              },
            }}
            icon={() => <Attach />}
            onSend={args => console.log(args)}
          />
        )}
        user={{
          _id: userId,
        }}
        dateFormat="ll"
        timeFormat="LT"
        renderBubble={renderBubble}
        renderChatFooter={renderChatFooter}
        renderCustomView={props => {
          if (props.currentMessage.document) {
            // Your custom pdf message
          }
        }}
      />

      <Modal
        visible={videoVisile}
        onRequestClose={() => setVideoVisible(false)}
        animationType="slide"
        style={{height: 600}}>
        <View style={{flex: 1}}>
          <VideoPlayer
            tapAnywhereToPause
            pause={true}
            controls={true}
            source={{uri: videoUrl}}
            disableBack
            // onError={err => console.log(err)}
          />

          <TouchableOpacity
            onPress={() => {
              setVideoVisible(false);
              setVideoUrl('');
            }}
            style={styles.buttonCancel}>
            <CircleCross1 />
            {/* <Text style={styles.textBtn}>X</Text> */}
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};
export default ZBWGroup;
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
    top: Platform.OS == 'android' ? 15 : 50,
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
