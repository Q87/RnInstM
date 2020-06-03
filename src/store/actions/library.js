import CameraRoll from '@react-native-community/cameraroll';
import {PermissionsAndroid, Platform} from 'react-native';

import {
  GET_LIBRARY_DATA,
  GET_LIBRARY_ALBUMS,
  GET_LIBRARY_PHOTOS,
} from '../types';

/**
 * Get permission to access the local media library
 */
const askForPermissions = async () => {
  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    // If access was denied
    if (status !== 'granted') {
      console.log('Access to the media library was denied');
      return false;
    }
  }

  return true;
};

/**
 * Get albums from a local photo library
 */
const getAlbums = () => {
  return new Promise(async (resolve, reject) => {
    const hasPermissions = await askForPermissions();

    // If the camera wasn't accessed
    if (!hasPermissions) {
      reject('Access to the media library was denied');
    }

    CameraRoll.getAlbums({
      assetType: 'Photos',
    })
      .then(albums => {
        resolve(albums);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Get photos from a local photo library
 */
const getPhotos = async album => {
  const params = {
    first: 10,
    assetType: 'Photos',
  };

  // If a folder is specified for selecting photos
  if (album) {
    params.groupName = album;
  }

  return new Promise(async (resolve, reject) => {
    const hasPermissions = await askForPermissions();

    // If the camera wasn't accessed
    if (!hasPermissions) {
      reject('Access to the media library was denied');
    }

    CameraRoll.getPhotos(params)
      .then(photos => {
        resolve(photos.edges);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Get library data
 */
export const getLibraryData = () => async (dispatch, getState) => {
  let {
    library: {isFirstLoad, albums, photos},
  } = getState();

  // On the first load
  if (isFirstLoad) {
    [albums, photos] = await Promise.all([getAlbums(), getPhotos()]);
    isFirstLoad = false;
  }

  dispatch({
    type: GET_LIBRARY_DATA,
    isFirstLoad,
    albums,
    photos,
  });
};

/**
 * Get library albums
 */
export const getLibraryAlbums = () => async dispatch => {
  const albums = await getAlbums();

  dispatch({
    type: GET_LIBRARY_ALBUMS,
    albums,
  });
};

/**
 * Get library photos
 */
export const getLibraryPhotos = album => async dispatch => {
  const photos = await getPhotos(album);

  dispatch({
    type: GET_LIBRARY_PHOTOS,
    photos,
  });
};
