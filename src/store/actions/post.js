import {batch} from 'react-redux';
import {
  LOAD_POSTS,
  ADD_IMAGE,
  ADD_POST,
  RESET_DATA_FOR_SHARING,
} from '../types';
import {user} from '../../mocks/user';

/**
 * Load posts
 */
export const loadPosts = () => dispatch => {
  const posts = user;

  dispatch({
    type: LOAD_POSTS,
    payload: posts,
  });
};

/**
 * Add new image
 */
export const addImage = image => dispatch => {
  dispatch({
    type: ADD_IMAGE,
    payload: image,
  });
};

/**
 * Add post
 */
export const addPost = post => (dispatch, getState) => {
  const {
    post: {allPosts},
    library: {photoToShare, textToShare},
  } = getState();
  const copied = {
    ...allPosts,
  };

  // New post
  const newPost = {
    id: copied.stories.length + 1,
    images: photoToShare.map((photo, key) => ({
      id: key,
      url: photo,
    })),
    likedBy: {},
    hashtags: [],
    content: [
      {
        id: 1,
        data: textToShare,
        reviews: [],
      },
    ],
  };

  copied.stories.push(newPost);

  batch(() => {
    dispatch({
      type: ADD_POST,
      payload: copied,
    });
    dispatch({
      type: RESET_DATA_FOR_SHARING,
    });
  });
};
