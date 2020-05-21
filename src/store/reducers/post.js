import {ADD_IMAGE} from '../types';

const initialState = {
  newImage: '',
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        newImage: action.payload,
      };

    default:
      return state;
  }
};
