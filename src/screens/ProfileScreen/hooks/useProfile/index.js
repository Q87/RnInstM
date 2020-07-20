// Core
import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {THEME} from '../../../../theme';

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// State
import {useSelector, useDispatch} from 'react-redux';
import {getUserPost, getMarkedUserPost} from '../../../../store/actions/user';

export const useProfile = (navigation, buttonList) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const allPosts = useSelector((state) => state.post.allPosts);
  const windowWidth = useWindowDimensions().width;
  const dispatch = useDispatch();

  /**
   * List of buttons
   */
  const buttonsJSX = buttonList.map((tabName, key) => ({
    element: () => (
      <MaterialCommunityIcons
        name={tabName}
        size={30}
        color={
          key === selectedIndex
            ? THEME.ACTIVE_BACKGROUND
            : THEME.INACTIVE_TAB_COLOR
        }
      />
    ),
  }));

  /**
   * Show screen of the selected post
   */
  const showPost = (userId, storyId, postType = 'own') => {
    // If own user post is selected
    if (postType === 'own') {
      dispatch(getUserPost(userId, storyId));
    } else if (postType === 'markedBy') {
      // If a post with the current user is selected
      dispatch(getMarkedUserPost(userId, storyId));
    }

    // Go to the screen of the selected post
    navigation.navigate('PostScreen', {
      userId,
      storyId,
      username: allPosts[0].name,
    });
  };

  return {
    selectedIndex,
    setSelectedIndex,
    allPosts,
    windowWidth,
    buttonsJSX,
    showPost,
  };
};
