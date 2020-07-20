// Core
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';

// Components
import {ProfileImage} from '../ProfileImage';

const PROFILE_IMAGE_SIZE = 13;

/**
 * Show information about the likes of a story
 */
export const LikedBy = ({likedBy}) => {
  return likedBy.qty ? (
    <View style={styles.likes}>
      <View style={styles.likes__users}>
        {likedBy.last.map(({id, avatar}, key) => (
          <View
            style={[styles.likes__user, key === 0 && styles.likes__user_first]}
            key={id}>
            <ProfileImage
              gradientSize={PROFILE_IMAGE_SIZE}
              imageSize={PROFILE_IMAGE_SIZE}
              url={avatar}
            />
          </View>
        ))}
      </View>

      <Text style={styles.likes__text}>
        Liked by{' '}
        <Text style={styles.user}>
          {likedBy.last[likedBy.last.length - 1].name}
        </Text>{' '}
        and {likedBy.qty} others
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes__users: {
    flexDirection: 'row',
  },
  likes__user: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: THEME.ICON_COLOR,
    borderColor: THEME.MAIN_CONTENT_COLOR,
    borderWidth: 1,
    marginLeft: -5,
  },
  likes__user_first: {
    marginLeft: 0,
  },
  likes__text: {
    marginLeft: 7,
  },
});
