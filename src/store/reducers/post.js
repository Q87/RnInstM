import {LOAD_POSTS, ADD_IMAGE, ADD_POST} from '../types';

const initialState = {
  allPosts: [],
  loading: true,
  newImage: '',
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

    default:
      return state;
  }
};
