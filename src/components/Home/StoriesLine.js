import React from 'react';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';
import {ProfileImage} from '../ProfileImage';
import {mocks} from '../../mocks/storiesLine';

/**
 * Show stories line
 */
export const StoriesLine = () => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <View style={styles.profile}>
          <ProfileImage start="transparent" end="transparent" own={true} />
          <Text style={styles.profile__text}>Your Story</Text>
        </View>

        {mocks.map(({id, url, name}) => (
          <View style={styles.profile} key={id}>
            <ProfileImage url={url} />
            <Text style={styles.profile__text}>{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 12,
    borderColor: THEME.SEPARATOR_COLOR,
    borderBottomWidth: 1,
  },
  profile: {
    alignItems: 'center',
    marginLeft: 16,
  },
  profile__text: {
    fontSize: 12,
  },
});
