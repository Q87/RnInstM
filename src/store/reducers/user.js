import {GET_USER_POST} from '../types';

const initialState = {
  userPost: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_POST:
      return {
        ...state,
        userPost: action.payload,
      };

    default:
      return state;
  }
};
