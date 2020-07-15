import {GET_USER_POST} from '../types';

/**
 * Get user post
 */
export const getUserPost = (userId, storyId) => (dispatch, getState) => {
  const {
    post: {allPosts},
  } = getState();

  // Find user
  const currentUserIdx = allPosts.findIndex(
    (currentUser) => userId === currentUser.id,
  );
  // Find user story
  const currentUserStory = allPosts[currentUserIdx].stories.find(
    (story) => storyId === story.id,
  );

  const {name, favourites} = allPosts[currentUserIdx];
  const userPost = {
    name,
    favourites,
    story: currentUserStory,
  };

  dispatch({
    type: GET_USER_POST,
    payload: userPost,
  });
};

/**
 * Get marked user post
 */
export const getMarkedUserPost = (userId, storyId) => (dispatch, getState) => {
  const {
    post: {
      allPosts: [{markedBy}],
    },
  } = getState();

  // Find user
  const currentUserIdx = markedBy.findIndex(
    (currentUser) => userId === currentUser.id,
  );
  // Find user story
  const currentUserStory = markedBy[currentUserIdx].stories.find(
    (story) => storyId === story.id,
  );

  const {name, favourites} = markedBy[currentUserIdx];
  const userPost = {
    name,
    favourites,
    story: currentUserStory,
  };

  dispatch({
    type: GET_USER_POST,
    payload: userPost,
  });
};
