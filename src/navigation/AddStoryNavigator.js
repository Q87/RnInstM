import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {AddStoryLibraryStepNavigator} from './AddStoryLibraryStepNavigator';
import {AddStoryEditStepNavigator} from './AddStoryEditStepNavigator';
import {AddStoryShareStepNavigator} from './AddStoryShareStepNavigator';

const AddStoryNavigatorStack = createStackNavigator();

/**
 * Show navigator for adding story actions
 */
export const AddStoryNavigator = () => (
  <AddStoryNavigatorStack.Navigator headerMode="none">
    <AddStoryNavigatorStack.Screen
      name="AddStoryLibraryStepNavigator"
      component={AddStoryLibraryStepNavigator}
    />

    <AddStoryNavigatorStack.Screen
      name="AddStoryEditStepNavigator"
      component={AddStoryEditStepNavigator}
    />

    <AddStoryNavigatorStack.Screen
      name="AddStoryShareStepNavigator"
      component={AddStoryShareStepNavigator}
    />
  </AddStoryNavigatorStack.Navigator>
);
