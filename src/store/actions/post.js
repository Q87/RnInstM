import {ADD_IMAGE} from '../types';

/**
 * Add new image
 */
export const addImage = image => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    payload: image,
  });
};
