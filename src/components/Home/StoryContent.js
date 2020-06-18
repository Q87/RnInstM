import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';
import {LikedBy} from './LikedBy';
import {StoryTalk} from './StoryTalk';
import {AddComment} from './AddComment';

/**
 * Show story content
 */
export const StoryContent = ({name, likedBy, hashtags, content}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.story}>
        <LikedBy likedBy={likedBy} />

        {hashtags.length > 0 && (
          <View style={styles.header}>
            <Text style={styles.user}>{name}</Text>

            {hashtags.map(({id, name: hashtag}) => (
              <Text style={styles.hashtag} key={id}>
                {hashtag}
              </Text>
            ))}
          </View>
        )}

        <StoryTalk name={name} content={content} />
      </View>

      <AddComment />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    paddingBottom: 10,
  },
  story: {
    paddingHorizontal: 12,
    borderColor: THEME.SEPARATOR_COLOR,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '86%',
  },
  user: {
    fontWeight: '700',
    marginRight: 4,
  },
  hashtag: {
    color: THEME.HASHTAG_COLOR,
    fontWeight: '700',
    marginRight: 4,
  },
});
