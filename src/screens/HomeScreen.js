import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {THEME} from '../theme';
import {StoriesLine} from '../components/Home/StoriesLine';
import {ProfileTopBar} from '../components/Home/ProfileTopBar';
import {StorySlider} from '../components/Home/StorySlider';
import {StoryContent} from '../components/Home/StoryContent';

import {useDispatch, useSelector} from 'react-redux';
import {loadPosts} from '../store/actions/post';

/**
 * Show home screen
 */
export const HomeScreen = () => {
  const dispatch = useDispatch();

  /**
   * Load posts
   */
  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const allPosts = useSelector((state) => state.post.allPosts);
  const loading = useSelector((state) => state.post.loading);
  const favourites = useSelector((state) => state.post.favourites);

  // If posts are loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.ICON_COLOR} />
      </View>
    );
  }

  const {id: userId, name, location, stories} = allPosts[0];

  // Show stories
  const renderStories = ({id: storyId, images, likedBy, hashtags, content}) => (
    <View>
      <ProfileTopBar name={name} location={location} />

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
        name={name}
        likedBy={likedBy}
        hashtags={hashtags}
        content={content}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={stories}
        renderItem={({item}) => renderStories(item)}
        keyExtractor={({id}) => id.toString()}
        ListHeaderComponent={<StoriesLine />}
      />
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
