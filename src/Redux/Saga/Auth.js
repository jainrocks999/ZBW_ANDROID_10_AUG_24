import { ToastAndroid, YellowBox } from 'react-native';
import { takeEvery, put, call } from 'redux-saga/effects';
import Api from '../Api';
// import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'react-native-svg';

//Login
function* doLogin(action) {
  try {
    const data = {
      email: action.email,
      password: action.password,
    };
    const response = yield call(Api.fetchDataByGET, action.url, data);
    if (!response) {
      // Toast.show('Please enter  Valid user id & password   ');
    } else if (response.status == true) {
      yield put({
        type: 'User_Login_Success',
        payload: response,
      });
      AsyncStorage.setItem('Partnersrno', response.id);
      AsyncStorage.setItem('loginToken', response.token);
      action.navigation.replace('Home');
      // Toast.show(response.message);
    } else {
      yield put({
        type: 'User_Login_Error',
      });
      // Toast.show(response.message);
    }
  } catch (error) {
    console.log('error223', error);
    yield put({
      type: 'User_Login_Error',
    });
  }
}


export default function* authSaga() {
  yield takeEvery('User_Login_Request', doLogin);
}
