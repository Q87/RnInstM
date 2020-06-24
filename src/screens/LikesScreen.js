import React from 'react';
import {SafeAreaView, StyleSheet, FlatList, View} from 'react-native';
import {THEME} from '../theme';
import {useSelector} from 'react-redux';

import {ProfileTopBar} from '../components/Home/ProfileTopBar';
import {StorySlider} from '../components/Home/StorySlider';
import {StoryContent} from '../components/Home/StoryContent';

/**
 * Show screen with favourite data
 */
export const LikesScreen = () => {
  const favouritePosts = useSelector((state) => state.post.favouritePosts);

  // Show stories
  const renderStories = ({
    data: {id: userId, name, location, stories, favourites},
  }) =>
    stories.map(({id: storyId, images, likedBy, hashtags, comments}) => (
      <View key={storyId}>
        <ProfileTopBar name={name} location={location} />

        <StorySlider
          userId={userId}
          storyId={storyId}
          images={images}
          isFavourite={true}
        />

        <StoryContent
          name={name}
          likedBy={likedBy}
          hashtags={hashtags}
          comments={comments}
        />
      </View>
    ));

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={favouritePosts}
        renderItem={({item}) => renderStories(item)}
        keyExtractor={({userId, storyId}) => `${userId}-${storyId}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
  },
});
