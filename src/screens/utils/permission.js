import {Platform} from 'react-native';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

export default async () => {
  const checkPermission = await checkMultiple(
    Platform.OS === 'android'
      ? [
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]
      : [PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
  );
  if (
    checkPermission['ios.permission.PHOTO_LIBRARY'] === 'denied' ||
    checkPermission['ios.permission.PHOTO_LIBRARY_ADD_ONLY'] === 'denied' ||
    checkPermission['android.permission.WRITE_EXTERNAL_STORAGE'] == 'denied' ||
    checkPermission['android.permission.READ_EXTERNAL_STORAGE'] == 'denied'
  ) {
    const requestPermission = await requestMultiple(
      Platform.OS === 'android'
        ? [
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          ]
        : [
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ],
    );
  }
};
