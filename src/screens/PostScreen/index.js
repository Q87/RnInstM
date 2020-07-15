import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {THEME} from '../../theme';

import {StorySlider} from '../../components/Home/StorySlider';
import {StoryContent} from '../../components/Home/StoryContent';

import {usePost} from './hooks/usePost';

/**
 * Show screen of a selected post
 */
export const PostScreen = ({route, navigation}) => {
  const {userId, storyId} = route.params;
  const {name, favourites, images, likedBy, hashtags, comments} = usePost();

  // If data is loading
  if (!name) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.ICON_COLOR} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <StorySlider
          userId={userId}
          storyId={storyId}
          images={images}
          isFavourite={favourites.some(
            (favourite) =>
              favourite.userId === userId && favourite.storyId === storyId,
          )}
        />

        <StoryContent
          userId={userId}
          storyId={storyId}
          name={name}
          likedBy={likedBy}
          hashtags={hashtags}
          comments={comments}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
