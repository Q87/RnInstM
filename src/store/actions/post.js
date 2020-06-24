import {batch} from 'react-redux';
import {
  LOAD_POSTS,
  ADD_IMAGE,
  ADD_POST,
  RESET_DATA_FOR_SHARING,
  ADD_TO_FAVOURITES,
  ADD_COMMENT,
} from '../types';
import {user} from '../../mocks/user';

/**
 * Load posts
 */
export const loadPosts = () => (dispatch) => {
  const posts = user;

  dispatch({
    type: LOAD_POSTS,
    payload: posts,
  });
};

/**
 * Add new image
 */
export const addImage = (image) => (dispatch) => {
  dispatch({
    type: ADD_IMAGE,
    payload: image,
  });
};

/**
 * Add post
 */
export const addPost = (post) => (dispatch, getState) => {
  const {
    post: {allPosts},
    library: {photoToShare, textToShare},
  } = getState();

  // New post
  const newPost = {
    id: allPosts[0].stories.length + 1,
    images: photoToShare.map((photo, key) => ({
      id: key,
      url: photo,
    })),
    likedBy: {},
    hashtags: [],
    comments: [
      {
        id: 1,
        user: allPosts[0].name,
        text: textToShare,
        reviews: [],
      },
    ],
  };

  allPosts[0].stories.push(newPost);

  batch(() => {
    dispatch({
      type: ADD_POST,
      payload: allPosts,
    });
    dispatch({
      type: RESET_DATA_FOR_SHARING,
    });
  });
};

/**
 * Add to favourites
 */
export const addToFavourites = (userId, storyId, actionType) => (
  dispatch,
  getState,
) => {
  let {
    post: {allPosts, favourites, favouritePosts},
  } = getState();
  let favouritesCopied = [...favourites];
  let favouritePostsCopied = [...favouritePosts];

  // If added to favourites
  if (actionType === 'add') {
    favouritesCopied.push({userId, storyId});

    // Find a favourite user
    const favouriteUser = {
      ...allPosts.find((currentUser) => userId === currentUser.id),
    };
    // Find a favourite user story
    const favouriteUserStory = favouriteUser.stories.find(
      (story) => storyId === story.id,
    );

    favouriteUser.stories = [favouriteUserStory];
    favouritePostsCopied.push({
      userId,
      storyId,
      data: favouriteUser,
    });
  } else if (actionType === 'remove') {
    // If removed from favourites
    favouritesCopied = favouritesCopied.filter((favourite) => {
      return userId !== favourite.userId || storyId !== favourite.storyId;
    });
    favouritePostsCopied = favouritePostsCopied.filter(
      (favourite) =>
        userId !== favourite.userId || storyId !== favourite.storyId,
    );
  }

  dispatch({
    type: ADD_TO_FAVOURITES,
    favourites: favouritesCopied,
    favouritePosts: favouritePostsCopied,
  });
};

/**
 * Add a comment
 */
export const addComment = (userId, storyId, comment, ownName) => (
  dispatch,
  getState,
) => {
  let {
    post: {allPosts},
  } = getState();
  const allPostsCopied = [...allPosts];

  // Find user
  const currentUserIdx = allPostsCopied.findIndex(
    (currentUser) => userId === currentUser.id,
  );
  // Find user story
  const currentUserStoryIdx = allPostsCopied[currentUserIdx].stories.findIndex(
    (story) => storyId === story.id,
  );
  // Comments
  const {comments} = {
    ...allPostsCopied[currentUserIdx].stories[currentUserStoryIdx],
  };

  comments.push({
    id: comments.length + 1,
    user: ownName,
    text: comment,
    reviews: [],
  });

  allPostsCopied[currentUserIdx].stories[
    currentUserStoryIdx
  ].comments = comments;

  dispatch({
    type: ADD_COMMENT,
    payload: allPostsCopied,
  });
};
