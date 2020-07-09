import {batch} from 'react-redux';
import {
  LOAD_POSTS,
  ADD_IMAGE,
  ADD_POST,
  RESET_DATA_FOR_SHARING,
  ADD_TO_FAVOURITES,
  ADD_COMMENT,
  TOGGLE_LIKE,
  START_SEARCHING,
} from '../types';
import {user} from '../../mocks/user';
import {search} from '../../mocks/search';
import {SEARCH_RESULTS_QTY} from '../../constants';

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
        likedBy: [],
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
    likedBy: [],
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

/**
 * Toggle post comment like
 */
export const toggleLike = (userId, storyId, commentId, isLiked, ownId) => (
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
  // Find a comment
  const commentIdx = allPostsCopied[currentUserIdx].stories[
    currentUserStoryIdx
  ].comments.findIndex((comment) => commentId === comment.id);
  // Likes list
  let {likedBy} = allPostsCopied[currentUserIdx].stories[
    currentUserStoryIdx
  ].comments[commentIdx];

  // If the comment to the post is liked
  if (isLiked) {
    likedBy.push(ownId);
  } else {
    // If the post comment like has been removed
    likedBy = likedBy.filter((id) => ownId !== id);
  }

  allPostsCopied[currentUserIdx].stories[currentUserStoryIdx].comments[
    commentIdx
  ].likedBy = likedBy;

  dispatch({
    type: TOGGLE_LIKE,
    payload: allPostsCopied,
  });
};

/**
 * Get search results
 */
const getSearchResults = (type, searchParameter, result) => {
  let testParameter = null;

  switch (type) {
    case 'Top':
      const keys = Object.keys(result);

      if (keys.includes('username')) {
        // People
        testParameter = result.username;
      } else if (keys.includes('hashtag')) {
        // Tags
        testParameter = result.hashtag;
      } else if (keys.includes('place')) {
        // Places
        testParameter = result.place;
      }
      break;

    case 'People':
      testParameter = result.username;
      break;

    case 'Tags':
      testParameter = result.hashtag;
      break;

    case 'Places':
      testParameter = result.place;
      break;
  }

  return new RegExp(searchParameter.replace(' ', '\\s*'), 'i').test(
    testParameter,
  );
};

/**
 * Start searching
 */
export const startSearching = (type, searchParameter, from = 0) => (
  dispatch,
  getState,
) => {
  let {
    post: {searchResults: prevSearchResults},
  } = getState();

  return new Promise((resolve, reject) => {
    try {
      // TODO: Add search results cache
      const searchResults = search[type].filter((result) =>
        getSearchResults(type, searchParameter, result),
      );

      const curPos = from * SEARCH_RESULTS_QTY + SEARCH_RESULTS_QTY;

      dispatch({
        type: START_SEARCHING,
        payload: from
          ? [
              ...prevSearchResults,
              ...searchResults.slice(from * SEARCH_RESULTS_QTY, curPos),
            ]
          : searchResults.slice(0, SEARCH_RESULTS_QTY),
      });

      resolve(curPos >= searchResults.length ? true : false);
    } catch (err) {
      reject(err);
    }
  });
};
