// Core
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {THEME} from '../../theme';

// Components
import Feather from 'react-native-vector-icons/Feather';
import {ButtonGroup} from 'react-native-elements';
import {ProfileImage} from '../../components/ProfileImage';
import {StoriesLine} from '../../components/Home/StoriesLine';
import {StorySlider} from '../../components/Home/StorySlider';
import {StoryContent} from '../../components/Home/StoryContent';

// Hooks
import {useProfile} from './hooks/useProfile';

// Tab list
const BUTTON_LIST = [
  'apps',
  'format-list-bulleted',
  'clipboard-account-outline',
  'bookmark-outline',
];

/**
 * Show profile screen
 */
export const ProfileScreen = ({navigation}) => {
  const {
    selectedIndex,
    setSelectedIndex,
    allPosts,
    windowWidth,
    buttonsJSX,
    showPost,
  } = useProfile(navigation, BUTTON_LIST);

  /**
   * Show another user's posts as images
   */
  const imageContentJSX = () => {
    if (allPosts && allPosts.length) {
      return allPosts[0].stories.map(({id, images}, key) => (
        <TouchableHighlight
          key={id}
          style={[
            styles.photo,
            {
              width: windowWidth / 3 - 1,
              height: windowWidth / 3 - 1,
            },
            (key + 1) % 3 !== 0 && styles.photo_margin,
          ]}
          onPress={() => showPost(allPosts[0].id, id)}>
          <ImageBackground
            source={{
              uri: images[0].url,
            }}
            style={styles.photo__image}>
            <Text style={styles.photo__text}>{images.length}</Text>
          </ImageBackground>
        </TouchableHighlight>
      ));
    }

    return null;
  };

  /**
   * Show another user's post list
   */
  const listContentJSX = () => {
    if (allPosts && allPosts.length) {
      const {id: userId, name, stories, favourites} = allPosts[0];

      return stories.map(
        ({id: storyId, images, likedBy, hashtags, comments}, key) => (
          <View key={`${userId}-${storyId}`}>
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
          </View>
        ),
      );
    }

    return null;
  };

  /**
   * Show another user's posts where he is marked
   */
  const markedByJSX = () => {
    if (allPosts && allPosts.length) {
      return allPosts[0].markedBy.map(
        ({id: userId, stories: [{id: storyId, images}]}, key) => (
          <TouchableHighlight
            key={userId}
            style={[
              styles.photo,
              {
                width: windowWidth / 3 - 1,
                height: windowWidth / 3 - 1,
              },
              (key + 1) % 3 !== 0 && styles.photo_margin,
            ]}
            onPress={() => showPost(userId, storyId, 'markedBy')}>
            <ImageBackground
              source={{
                uri: images[0].url,
              }}
              style={styles.photo__image}>
              <Text style={styles.photo__text}>{images.length}</Text>
            </ImageBackground>
          </TouchableHighlight>
        ),
      );
    }

    return null;
  };

  /**
   * Show user content
   */
  const renderUserContent = () => {
    switch (BUTTON_LIST[selectedIndex]) {
      case 'apps':
        return imageContentJSX();
      case 'format-list-bulleted':
        return listContentJSX();
      case 'clipboard-account-outline':
        return markedByJSX();

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
        <View style={styles.profileCard}>
          <ProfileImage
            gradientSize={88}
            imageSize={83}
            start="transparent"
            end="transparent"
            own={true}
            ownPos={(73 * 88) / 100}
            imageBorder={true}
          />
          <View style={styles.totalWrapper}>
            <View style={styles.total}>
              <View style={styles.total__item}>
                <Text style={styles.total__qty}>1,790</Text>
                <Text style={styles.total__text}>posts</Text>
              </View>

              <View style={styles.total__item}>
                <Text style={styles.total__qty}>3M</Text>
                <Text style={styles.total__text}>followers</Text>
              </View>

              <View style={styles.total__item}>
                <Text style={styles.total__qty}>680</Text>
                <Text style={styles.total__text}>following</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <View style={[styles.action, styles.action_btn]}>
                <Text style={styles.action__text}>Edit Profile</Text>
              </View>

              <TouchableHighlight
                style={[styles.action, styles.action_icon]}
                underlayColor={THEME.INACTIVE_COLOR}
                onPress={() => navigation.navigate('OptionsScreen')}>
                <Feather
                  name="settings"
                  color={THEME.ICON_COLOR}
                  style={styles.action__icon}
                  size={18}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <View style={styles.shortInfo}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>Mandy Moore</Text>
          </View>

          <View>
            <Text style={styles.site}>www.roseandivyjournal.com/</Text>
          </View>
        </View>

        <View style={styles.stories}>
          <StoriesLine />
        </View>

        <ButtonGroup
          onPress={setSelectedIndex}
          selectedIndex={selectedIndex}
          buttons={buttonsJSX}
          innerBorderStyle={styles.buttonGroup__innerBorderStyle}
          containerStyle={styles.buttonGroup__containerStyle}
          selectedButtonStyle={styles.buttonGroup__selectedButtonStyle}
          buttonStyle={styles.buttonGroup__buttonStyle}
        />

        {<View style={styles.photos}>{renderUserContent()}</View>}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    paddingTop: 7,
  },
  profileCard: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  totalWrapper: {
    flex: 1,
    paddingLeft: 20,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
  },
  total__item: {
    alignItems: 'center',
  },
  total__qty: {
    fontSize: 18,
    fontWeight: '700',
  },
  total__text: {
    color: THEME.USER_INFO_COLOR,
    marginTop: -5,
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  action: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderColor: THEME.INACTIVE_COLOR,
    borderWidth: 1,
  },
  action_btn: {
    flex: 1,
    marginRight: 5,
  },
  action_icon: {
    paddingHorizontal: 3,
  },
  action__text: {
    fontWeight: '700',
    fontSize: 16,
  },
  action__icon: {
    paddingHorizontal: 10,
  },

  shortInfo: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  nameWrapper: {
    paddingTop: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  site: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.HASHTAG_COLOR,
  },
  followedBy: {
    color: THEME.INACTIVE_TAB_COLOR,
    paddingTop: 4,
  },

  stories: {
    paddingTop: 10,
    borderTopColor: THEME.SEPARATOR_COLOR,
    borderTopWidth: 1,
  },

  buttonGroup__innerBorderStyle: {
    width: 0,
  },
  buttonGroup__containerStyle: {
    borderWidth: 0,
    marginHorizontal: 0,
    marginTop: 0,
  },
  buttonGroup__selectedButtonStyle: {
    backgroundColor: 'transparent',
  },
  buttonGroup__buttonStyle: {
    paddingTop: 7,
  },

  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    marginTop: 1,
  },
  photo_margin: {
    marginRight: 1,
  },
  photo__image: {
    flex: 1,
    resizeMode: 'cover',
  },
  photo__text: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: THEME.ICON_COLOR,
    color: THEME.MAIN_CONTENT_COLOR,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
