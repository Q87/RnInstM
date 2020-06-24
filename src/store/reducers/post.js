import {
  LOAD_POSTS,
  ADD_IMAGE,
  ADD_POST,
  ADD_TO_FAVOURITES,
  ADD_COMMENT,
  TOGGLE_LIKE,
} from '../types';

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

    case ADD_COMMENT:
      return {
        ...state,
        allPosts: action.payload,
      };

    case TOGGLE_LIKE:
      return {
        ...state,
        allPosts: action.payload,
      };

    default:
      return state;
  }
};
