import {LOAD_POSTS, ADD_IMAGE, ADD_POST, ADD_TO_FAVOURITES} from '../types';

const initialState = {
  allPosts: [],
  loading: true,
  newImage: '',
  favourites: [],
  favouritePosts: [],
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        loading: false,
      };

    case ADD_IMAGE:
      return {
        ...state,
        newImage: action.payload,
      };

    case ADD_POST:
      return {
        ...state,
        allPosts: action.payload,
      };

    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: action.favourites,
        favouritePosts: action.favouritePosts,
      };

    default:
      return state;
  }
};
