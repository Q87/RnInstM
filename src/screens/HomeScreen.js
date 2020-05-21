import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {StoriesLine} from '../components/Home/StoriesLine';
import {ProfileTopBar} from '../components/Home/ProfileTopBar';
import {StorySlider} from '../components/Home/StorySlider';
import {StoryContent} from '../components/Home/StoryContent';

import {user} from '../mocks/user';

/**
 * Show home screen
 */
export const HomeScreen = () => {
  const {name, location, stories} = user;

  return (
    <ScrollView style={styles.wrapper}>
      <StoriesLine />

      {stories.map(({id, images, likedBy, hashtags, content}) => (
        <View key={id}>
          <ProfileTopBar name={name} location={location} />

          <StorySlider images={images} />

          <StoryContent
            name={name}
            likedBy={likedBy}
            hashtags={hashtags}
            content={content}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
  },
});
