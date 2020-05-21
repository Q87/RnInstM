import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {CameraScreen} from '../screens/CameraScreen';
import {SimpleLibraryScreen} from '../screens/SimpleLibraryScreen';
import {EditPhotoScreen} from '../screens/EditPhotoScreen';
import {ShareScreen} from '../screens/ShareScreen';

const HomeAddStoryNavigatorStack = createStackNavigator();

/**
 * Show navigator for adding story actions
 */
export const HomeAddStoryNavigator = () => (
  <HomeAddStoryNavigatorStack.Navigator headerMode="none">
    <HomeAddStoryNavigatorStack.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />

    <HomeAddStoryNavigatorStack.Screen
      name="SimpleLibraryScreen"
      component={SimpleLibraryScreen}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />

    <HomeAddStoryNavigatorStack.Screen
      name="EditPhotoScreen"
      component={EditPhotoScreen}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />

    <HomeAddStoryNavigatorStack.Screen
      name="ShareScreen"
      component={ShareScreen}
      options={({navigation}) => ({
        headerTitle: '',
      })}
    />
  </HomeAddStoryNavigatorStack.Navigator>
);
