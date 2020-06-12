import {
  GET_LIBRARY_DATA,
  GET_LIBRARY_ALBUMS,
  GET_LIBRARY_PHOTOS,
  SET_PHOTOS_FOR_EDITING,
  SET_PHOTO_TO_SAVE,
  SET_PHOTO_TO_SHARE,
} from '../types';

const initialState = {
  isFirstLoad: true,
  albums: [],
  photos: [],
  selectedPhotos: [],
  photoToSave: [],
  photoToShare: [],
};

export const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIBRARY_DATA:
      return {
        ...state,
        albums: action.albums,
        photos: action.photos,
      };

    case GET_LIBRARY_ALBUMS:
      return {
        ...state,
        albums: action.albums,
      };

    case GET_LIBRARY_PHOTOS:
      return {
        ...state,
        photos: action.photos,
      };

    case SET_PHOTOS_FOR_EDITING:
      return {
        ...state,
        selectedPhotos: action.payload,
      };

    case SET_PHOTO_TO_SAVE:
      return {
        ...state,
        photoToSave: action.payload,
      };

    case SET_PHOTO_TO_SHARE:
      return {
        ...state,
        photoToShare: action.payload,
      };

    default:
      return state;
  }
};
