// Core
import React from 'react';
import {THEME} from '../theme';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

// Components
import {ProfileScreen} from '../screens/ProfileScreen';
import {PostScreen} from '../screens/PostScreen';
import {OptionsScreen} from '../screens/OptionsScreen';
import {LinkedAccountsScreen} from '../screens/OptionsScreen/LinkedAccountsScreen';
import {ContactsScreen} from '../screens/OptionsScreen/ContactsScreen';
import {LanguageScreen} from '../screens/OptionsScreen/LanguageScreen';
import {PushNotificationScreen} from '../screens/OptionsScreen/PushNotificationScreen';
import {EmailSMSScreen} from '../screens/OptionsScreen/EmailSMSScreen';
import {CellularDataScreen} from '../screens/OptionsScreen/CellularDataScreen';
import {CommentScreen} from '../screens/OptionsScreen/CommentScreen';

const ProfileNavigatorStack = createStackNavigator();

// Screen options
const screenOptions = (headerTitle, navigation) => ({
  headerTitle,
  headerTitleAlign: 'center',

  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Back to the settings screen"
        iconName="chevron-left"
        onPress={() => navigation.navigate('OptionsScreen')}
      />
    </HeaderButtons>
  ),
});

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
      name="ProfileScreen"
      component={ProfileScreen}
      options={({navigation}) => ({
        headerTitle: 'User name',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Add account"
              iconType={'MaterialCommunityIcons'}
              iconName="account-plus"
              onPress={() => console.log('Add account')}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Clock"
              iconType={'Feather'}
              iconName="clock"
              onPress={() => console.log('Clock')}
            />
          </HeaderButtons>
        ),
      })}
    />

    <ProfileNavigatorStack.Screen
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
              onPress={() => navigation.navigate('ProfileScreen')}
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

    <ProfileNavigatorStack.Screen
      name="OptionsScreen"
      component={OptionsScreen}
      options={({navigation}) => ({
        headerTitle: 'Options',
        headerTitleAlign: 'center',

        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
              title="Back to the profile screen"
              iconName="chevron-left"
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </HeaderButtons>
        ),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="LinkedAccountsScreen"
      component={LinkedAccountsScreen}
      options={({navigation}) => ({
        ...screenOptions('Share Settings', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="ContactsScreen"
      component={ContactsScreen}
      options={({navigation}) => ({
        ...screenOptions('Contacts', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="LanguageScreen"
      component={LanguageScreen}
      options={({navigation}) => ({
        ...screenOptions('Language', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="PushNotificationScreen"
      component={PushNotificationScreen}
      options={({navigation}) => ({
        ...screenOptions('Notifications', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="EmailSMSScreen"
      component={EmailSMSScreen}
      options={({navigation}) => ({
        ...screenOptions('Email and SMS', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="CellularDataScreen"
      component={CellularDataScreen}
      options={({navigation}) => ({
        ...screenOptions('Cellular Data Use', navigation),
      })}
    />

    <ProfileNavigatorStack.Screen
      name="CommentScreen"
      component={CommentScreen}
      options={({navigation}) => ({
        ...screenOptions('Comments', navigation),
      })}
    />
  </ProfileNavigatorStack.Navigator>
);
