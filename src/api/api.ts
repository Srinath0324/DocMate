import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { AsyncKeyLiterals } from '../utils/Constants';
import { saveDataToCachedWithKey } from '../utils/cacheData';
import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, requestMultiple, checkMultiple } from 'react-native-permissions';

const API_BASE_URL = 'https://localhost:8080/api/';
let token: any;
let userId: any;
let tokenExpiration: number = 0;

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export const API_FORMDATA = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

let navigationRef: any = null;

export const setNavigationReference = (ref: any) => {
  navigationRef = ref;
};

API.interceptors.request.use(
  function (_config: any) {
    _config.headers['Content-Type'] = 'application/json';

    if (token !== null && token !== '') {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    return _config;
  },
  function (error) {
    console.log('API ERROR :: ' + JSON.stringify(error));
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

const handleTokenExpiration = () => {
  logOut();

  if (navigationRef && navigationRef.current) {
    navigationRef.current.reset({
      index: 0,
      routes: [{ name: 'Login', params: { expired: true } }],
    });
  }
};

API_FORMDATA.interceptors.request.use(
  function (_config: any) {
    _config.headers['Content-Type'] = 'multipart/form-data';

    if (token !== null && token !== '') {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    return _config;
  },
  function (error) {
    console.log('API ERROR :: ' + JSON.stringify(error));
  },
);

API_FORMDATA.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('API_FORMDATA ERROR :: ' + JSON.stringify(error));
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

export const apiError = (error: any) => {
  console.log('api', error.response);
  if (error.response) {
    if (error?.response.status == 401) {
      handleTokenExpiration();
      return 'Unauthorized User! Please Login again.';
    } else if (error.response.status == 403) {
      return 'You are not authorized to access the requested resource.';
    } else if (error.response.status == 404) {
      return 'Requested URL not found.';
    } else if (error.response.status == 500) {
      return 'Internal Server Error';
    } else {
      return error.response.data.message;
    }
  } else if (error.message) {
    return error.message;
  }
};

export const saveToken = (data?: any, expiresIn?: number | string) => {
  token = data;

  if (expiresIn) {
    if (typeof expiresIn === 'string' && expiresIn.includes('T')) {
      tokenExpiration = new Date(expiresIn).getTime();
    } else {
      const expiresInMs = typeof expiresIn === 'number' ? expiresIn : parseInt(expiresIn) * 1000;
      tokenExpiration = Date.now() + expiresInMs;
    }
  } else {
    tokenExpiration = Date.now() + (2 * 60 * 60 * 1000);
  }

  saveDataToCachedWithKey(AsyncKeyLiterals.tokenExpiration, tokenExpiration.toString());
};

export const saveUserId = (data?: any,) => {
  userId = data;
}

export const getToken = () => {
  return token;
};

export const isTokenValid = () => {
  if (!token) return false;
  return Date.now() < tokenExpiration;
};

export const getUserId = () => {
  return userId
}

export const logOut = () => {
  token = null;
  tokenExpiration = 0;
  const asyncItem = AsyncKeyLiterals;
  saveDataToCachedWithKey(asyncItem.loginToken, null);
  saveDataToCachedWithKey(asyncItem.userID, null);
  saveDataToCachedWithKey(asyncItem.userRole, null);
  saveDataToCachedWithKey(asyncItem.tokenExpiration, null);
};

export const isNetworkAvailable = async () => {
  let response = false;
  await NetInfo.fetch().then((networkState: any) => {
    response = networkState.isConnected;
  });
  return response;
};

export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};

export const checkPermissionCamera = async () => {
  if (Platform.OS === 'android') {
    const multipleResults = await checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED]);
    if (
      multipleResults[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
      multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED &&
      multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED] === RESULTS.GRANTED &&
      multipleResults[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
      multipleResults[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED
    ) {
      return { result: true, permission: 'GRANTED', data: [multipleResults[PERMISSIONS.ANDROID.CAMERA], multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES], multipleResults[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE], multipleResults[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE], multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED]] };
    } else {
      return requestPermissionCamera();
    }
  } else if (Platform.OS === 'ios') {
    const multipleResults = await checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]);
    if (multipleResults[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED && multipleResults[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED) {
      return { result: true, permission: 'GRANTED' };
    } else {
      return requestPermissionCamera();
    }
  }
}

export const requestPermissionCamera = async () => {
  let finalResult = null;
  if (Platform.OS === 'android') {
    const multipleResults = await requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED]);
    if (
      multipleResults[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED &&
      multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === RESULTS.GRANTED ||
      multipleResults[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED ||
      multipleResults[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED ||
      multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED] === RESULTS.GRANTED
    ) {
      finalResult = { result: true, permission: 'GRANTED' };
    } else {
      finalResult = { result: false, permission: 'DENIED', data: [multipleResults[PERMISSIONS.ANDROID.CAMERA], multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES], multipleResults[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE], multipleResults[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE], multipleResults[PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED]] }
    }
  } else if (Platform.OS === 'ios') {
    const multipleResults = await requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY]);
    if (multipleResults[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED && multipleResults[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED) {
      finalResult = { result: true, permission: 'GRANTED' };
    } else {
      finalResult = { result: false, permission: 'DENIED' };
    }
  }
  return finalResult;
}

export const requestStoragePermission = async () => {
  try {
    if (Platform.OS !== 'android') {
      return true;
    }

    const apiLevel = Platform.Version;

    if (apiLevel >= 33) {
      const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      console.log('Requesting READ_MEDIA_IMAGES permission for Android 13+');

      const granted = await PermissionsAndroid.request(permission, {
        title: "Gallery Permission",
        message: "App needs access to your gallery to select images",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });

      console.log('Permission result:', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    else {
      const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      console.log('Requesting READ_EXTERNAL_STORAGE permission for older Android');

      const granted = await PermissionsAndroid.request(permission, {
        title: "Gallery Permission",
        message: "App needs access to your gallery to select images",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });

      console.log('Permission result:', granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error("Permission request error:", err);
    return false;
  }
};


export const requestGalleryPermission = async () => {
  try {
    if (Platform.OS !== 'android') {
      return true;
    }

    const apiLevel = Platform.Version;

    if (apiLevel >= 33) {
      const permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      const granted = await PermissionsAndroid.request(permission, {
        title: "Gallery Permission",
        message: "App needs access to your gallery to select images",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    else {
      const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.request(permission, {
        title: "Gallery Permission",
        message: "App needs access to your gallery to select images",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.error("Permission request error:", err);
    return false;
  }
};