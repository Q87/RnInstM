import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Show a discussion of a story
 */
export const StoryTalk = ({name, content}) => {
  return content.map(({id, data, reviews}) => (
    <View key={id}>
      <View>
        <View style={styles.content}>
          <Text>
            <Text style={styles.user}>{name}</Text> {data}
          </Text>
        </View>

        <MaterialCommunityIcons
          name="heart-outline"
          size={15}
          color={THEME.INACTIVE_COLOR}
          style={styles.like}
        />
      </View>

      {reviews.length > 0 && (
        <View>
          {reviews.map(({id: key, data: review}) => (
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
  ));
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    width: '86%',
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
