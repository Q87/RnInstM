import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {THEME} from '../theme';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {HomeNavigator} from './HomeNavigator';
import {SearchNavigator} from './SearchNavigator';
import {AddStoryNavigator} from './AddStoryNavigator';
import {LikesNavigator} from './LikesNavigator';
import {ProfileNavigator} from './ProfileNavigator';
import {HomeAddStoryNavigator} from './HomeAddStoryNavigator';

const BottomNavigatorStack = createBottomTabNavigator();

const bottomTabsConfig = {
  tabBarOptions: {
    activeTintColor: THEME.ICON_COLOR,
    showLabel: false,
  },
};

/**
 * Show navigator for bottom tabs
 */
const BottomNavigator = () => (
  <BottomNavigatorStack.Navigator {...bottomTabsConfig}>
    <BottomNavigatorStack.Screen
      name="HomeNavigator"
      component={HomeNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: (info) => (
          <Feather name="home" size={25} color={info.color} />
        ),
      }}
    />

    <BottomNavigatorStack.Screen
      name="SearchNavigator"
      component={SearchNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: (info) => (
          <Feather name="search" size={25} color={info.color} />
        ),
      }}
    />

    <BottomNavigatorStack.Screen
      name="AddStoryNavigator"
      component={AddStoryNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: (info) => (
          <Feather name="plus-square" size={25} color={info.color} />
        ),
        tabBarVisible: false,
      }}
    />

    <BottomNavigatorStack.Screen
      name="LikesNavigator"
      component={LikesNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: (info) => (
          <MaterialCommunityIcons name="heart" size={25} color={info.color} />
        ),
      }}
    />

    <BottomNavigatorStack.Screen
      name="ProfileNavigator"
      component={ProfileNavigator}
      options={{
        tabBarLabel: '',
        tabBarIcon: (info) => (
          <MaterialCommunityIcons name="account" size={25} color={info.color} />
        ),
      }}
    />
  </BottomNavigatorStack.Navigator>
);

const MainNavigatorStack = createStackNavigator();

/**
 * Show the main navigator
 */
const MainNavigator = () => (
  <MainNavigatorStack.Navigator headerMode="none">
    <MainNavigatorStack.Screen
      name="BottomNavigator"
      component={BottomNavigator}
    />

    <MainNavigatorStack.Screen
      name="HomeAddStoryNavigator"
      component={HomeAddStoryNavigator}
    />
  </MainNavigatorStack.Navigator>
);

/**
 * Show app navigation
 */
export const AppNavigation = () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);
