import {
  GET_LIBRARY_DATA,
  GET_LIBRARY_ALBUMS,
  GET_LIBRARY_PHOTOS,
} from '../types';

const initialState = {
  isFirstLoad: true,
  albums: [],
  photos: [],
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

    default:
      return state;
  }
};
