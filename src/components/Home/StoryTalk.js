import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {THEME} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from 'react-redux';
import {toggleLike} from '../../store/actions/post';

import {own} from '../../mocks/own';

/**
 * Show a discussion of a story
 */
export const StoryTalk = ({userId, storyId, name, comments}) => {
  const dispatch = useDispatch();

  /**
   * Toggle like
   */
  const onPressHandler = (commentId, isLiked) => {
    dispatch(toggleLike(userId, storyId, commentId, isLiked, own.ownId));
  };

  return comments.map(
    ({id: commentId, user, text: comment, likedBy, reviews}) => {
      const isLiked = likedBy.includes(own.ownId);

      return (
        <View key={commentId}>
          {comment.trim().length > 0 && (
            <View>
              <View style={styles.comments}>
                <Text>
                  <Text style={styles.comment__user}>{user}</Text>
                  <Text>{'  '}</Text>
                  <Text>{comment}</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.like}
                onPress={() => onPressHandler(commentId, !isLiked)}>
                <MaterialCommunityIcons
                  name={isLiked ? 'heart' : 'heart-outline'}
                  size={15}
                  color={THEME.INACTIVE_COLOR}
                />
              </TouchableOpacity>
            </View>
          )}

          {reviews.length > 0 && (
            <View>
              {reviews.map(({id: key, text: review}) => (
                <View style={styles.reviewWrapper} key={key}>
                  <View style={styles.review}>
                    <Text style={styles.review__text}>{review}</Text>
                  </View>

                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={15}
                    color={THEME.INACTIVE_COLOR}
                    style={styles.like}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      );
    },
  );
};

const styles = StyleSheet.create({
  comments: {
    marginTop: 10,
    width: '86%',
  },
  comment__user: {
    fontWeight: '700',
  },
  like: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
  review: {
    width: '86%',
    borderColor: THEME.SEPARATOR_COLOR,
    borderLeftWidth: 1,
    paddingLeft: 11,
    marginLeft: 22,
    marginTop: 10,
  },
  review__text: {
    lineHeight: 17,
  },
});
