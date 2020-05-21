import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

import {LibraryScreen} from '../screens/LibraryScreen';
import {PhotoScreen} from '../screens/PhotoScreen';
import {VideoScreen} from '../screens/VideoScreen';

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

  headerTitle: () => (
    <View style={[styles.header, styles.header_title]}>
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="All Photos"
          buttonStyle={[styles.header__text, styles.header__text_title]}
        />

        <Item
          title="All Photos - icon"
          iconName="chevron-down"
          iconType="MaterialCommunityIcons"
          buttonStyle={styles.header__item_title}
        />
      </HeaderButtons>
    </View>
  ),
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
const LibraryNavigator = () => (
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
      })}
    />
  </LibraryNavigatorStack.Navigator>
);

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_title: {
    marginRight: -20,
  },
  header__text: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: '100',
  },
  header__text_title: {
    fontWeight: '600',
  },
  header__text_next: {
    color: THEME.ACTIVE_BACKGROUND,
  },
  header__item_title: {
    marginLeft: -10,
    marginRight: 0,
  },
});
