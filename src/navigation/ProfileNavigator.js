import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';
import {THEME} from '../theme';
import {ProfileScreen} from '../screens/ProfileScreen';

const ProfileNavigatorStack = createStackNavigator();

/**
 * Show profile navigator
 */
export const ProfileNavigator = () => (
  <ProfileNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <ProfileNavigatorStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({navigation}) => ({
        headerTitle: '',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Take photo"
              iconName="camera"
              onPress={() => console.log('Take photo')}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="IGTV actions"
              iconName="tv"
              onPress={() => console.log('IGTV actions')}
            />

            <Item
              title="Send a message"
              iconName="send"
              onPress={() => console.log('Send a message')}
            />
          </HeaderButtons>
        ),
      })}
    />
  </ProfileNavigatorStack.Navigator>
);
