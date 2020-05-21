import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';
import {THEME} from '../theme';
import {HomeScreen} from '../screens/HomeScreen';

const HomeNavigatorStack = createStackNavigator();

/**
 * Show home navigator
 */
export const HomeNavigator = () => (
  <HomeNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <HomeNavigatorStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={({navigation}) => ({
        headerTitle: '',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Take photo"
              iconName="camera"
              onPress={() => navigation.navigate('HomeAddStoryNavigator')}
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
  </HomeNavigatorStack.Navigator>
);
