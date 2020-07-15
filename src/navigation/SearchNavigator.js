import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';
import {THEME} from '../theme';

import {SearchScreen} from '../screens/SearchScreen';
import {ProfileToFollowScreen} from '../screens/ProfileToFollowScreen';
import {PostScreen} from '../screens/PostScreen';

const SearchNavigatorStack = createStackNavigator();

/**
 * Show search navigator
 */
export const SearchNavigator = () => (
  <SearchNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <SearchNavigatorStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={() => ({
        headerShown: false,
      })}
    />

    <SearchNavigatorStack.Screen
      name="ProfileToFollowScreen"
      component={ProfileToFollowScreen}
      options={({navigation, route}) => ({
        headerTitle: route?.params?.username,
        headerTitleAlign: 'center',

        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Back to the search screen"
              iconName="chevron-left"
              onPress={() => navigation.navigate('SearchScreen')}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Settings"
              iconType={'MaterialCommunityIcons'}
              iconName="dots-horizontal"
              onPress={() => console.log('Settings')}
            />
          </HeaderButtons>
        ),
      })}
    />

    <SearchNavigatorStack.Screen
      name="PostScreen"
      component={PostScreen}
      options={({navigation, route}) => ({
        headerTitle: route?.params?.username,
        headerTitleAlign: 'center',

        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Back to the profile screen"
              iconName="chevron-left"
              onPress={() => navigation.navigate('ProfileToFollowScreen')}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Settings"
              iconType={'MaterialCommunityIcons'}
              iconName="dots-horizontal"
              onPress={() => console.log('Settings')}
            />
          </HeaderButtons>
        ),
      })}
    />
  </SearchNavigatorStack.Navigator>
);
