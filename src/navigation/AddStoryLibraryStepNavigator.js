import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {getLibraryPhotos} from '../store/actions/library';

import {Picker} from '@react-native-community/picker';

import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

import {LibraryScreen} from '../screens/LibraryScreen';
import {PhotoScreen} from '../screens/PhotoScreen';
import {VideoScreen} from '../screens/VideoScreen';

// All photos
const ALL_PHOTOS = 'All Photos';

// Screen options
const screenOptions = navigation => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Cancel"
        onPress={() => navigation.navigate('HomeNavigator')}
        buttonStyle={styles.header__text}
      />
    </HeaderButtons>
  ),
  headerLeftContainerStyle: {
    paddingLeft: 15,
  },

  headerTitleAlign: 'center',

  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Next"
        onPress={() => navigation.navigate('AddStoryEditStepNavigator')}
        buttonStyle={[styles.header__text, styles.header__text_next]}
      />
    </HeaderButtons>
  ),
  headerRightContainerStyle: {
    paddingRight: 15,
  },
});

const LibraryNavigatorStack = createStackNavigator();

/**
 * Show library navigator
 */
const LibraryNavigator = () => {
  // Album list
  const albums = useSelector(state => [
    {
      title: ALL_PHOTOS,
    },
    ...state.library.albums,
  ]);

  // Selected album
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0].title);

  const dispatch = useDispatch();
  const windowWidth = useWindowDimensions().width;

  /**
   * Choose another album
   */
  const onValueChangeHandler = album => {
    setSelectedAlbum(album);
    dispatch(getLibraryPhotos(album !== ALL_PHOTOS ? album : null));
  };

  return (
    <LibraryNavigatorStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.NAVIGATION_BACKGROUND,
        },
        headerTintColor: THEME.ICON_COLOR,
      }}>
      <LibraryNavigatorStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={({navigation}) => ({
          ...screenOptions(navigation),
          headerTitle: () => (
            <Picker
              selectedValue={selectedAlbum}
              style={[
                {
                  width: windowWidth / 3,
                },
              ]}
              onValueChange={onValueChangeHandler}>
              {albums.map(({title}, key) => (
                <Picker.Item label={title} value={title} key={key} />
              ))}
            </Picker>
          ),
        })}
      />
    </LibraryNavigatorStack.Navigator>
  );
};

const PhotoNavigatorStack = createStackNavigator();

/**
 * Show photo navigator
 */
const PhotoNavigator = () => (
  <PhotoNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <PhotoNavigatorStack.Screen
      name="PhotoScreen"
      component={PhotoScreen}
      options={({navigation}) => ({
        ...screenOptions(navigation),
      })}
    />
  </PhotoNavigatorStack.Navigator>
);

const VideoNavigatorStack = createStackNavigator();

/**
 * Show video navigator
 */
const VideoNavigator = () => (
  <VideoNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <VideoNavigatorStack.Screen
      name="VideoScreen"
      component={VideoScreen}
      options={({navigation}) => ({
        ...screenOptions(navigation),
      })}
    />
  </VideoNavigatorStack.Navigator>
);

const AddStoryLibraryStepNavigatorStack = createBottomTabNavigator();

const bottomTabsConfig = {
  tabBarOptions: {
    activeTintColor: THEME.ICON_COLOR,
    showIcon: false,
    labelStyle: {
      position: 'absolute',
      top: 10,
      fontSize: 18,
    },
  },
};

/**
 * Show media selection step
 */
export const AddStoryLibraryStepNavigator = () => (
  <AddStoryLibraryStepNavigatorStack.Navigator {...bottomTabsConfig}>
    <AddStoryLibraryStepNavigatorStack.Screen
      name="LibraryNavigator"
      component={LibraryNavigator}
      options={{
        tabBarLabel: 'Library',
      }}
    />

    <AddStoryLibraryStepNavigatorStack.Screen
      name="PhotoNavigator"
      component={PhotoNavigator}
      options={{
        tabBarLabel: 'Photo',
      }}
    />

    <AddStoryLibraryStepNavigatorStack.Screen
      name="VideoNavigator"
      component={VideoNavigator}
      options={{
        tabBarLabel: 'Video',
      }}
    />
  </AddStoryLibraryStepNavigatorStack.Navigator>
);

const styles = StyleSheet.create({
  header__text: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '100',
  },
  header__text_next: {
    color: THEME.ACTIVE_BACKGROUND,
  },
});
