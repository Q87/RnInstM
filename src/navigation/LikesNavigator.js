import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';
import {THEME} from '../theme';
import {LikesScreen} from '../screens/LikesScreen';

const LikesNavigatorStack = createStackNavigator();

/**
 * Show navigator for favourite data
 */
export const LikesNavigator = () => (
  <LikesNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <LikesNavigatorStack.Screen
      name="Likes"
      component={LikesScreen}
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
  </LikesNavigatorStack.Navigator>
);
