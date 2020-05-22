import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

import {FilterScreen} from '../screens/FilterScreen';
import {EditScreen} from '../screens/EditScreen';

// Screen options
const screenOptions = navigation => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Back to photo selection"
        iconName="chevron-left"
        onPress={() => navigation.navigate('AddStoryLibraryStepNavigator')}
        iconSize={35}
      />
    </HeaderButtons>
  ),

  headerTitle: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Brightness - Contrast"
        iconName="adjust"
        iconType={'Entypo'}
      />
    </HeaderButtons>
  ),
  headerTitleAlign: 'center',

  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Next"
        onPress={() => navigation.navigate('AddStoryShareStepNavigator')}
        buttonStyle={[styles.header__text, styles.header__text_next]}
      />
    </HeaderButtons>
  ),
  headerRightContainerStyle: {
    paddingRight: 20,
  },
});

const FilterNavigatorStack = createStackNavigator();

/**
 * Show photo filtering navigator
 */
const FilterNavigator = () => (
  <FilterNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <FilterNavigatorStack.Screen
      name="FilterScreen"
      component={FilterScreen}
      options={({navigation}) => ({
        ...screenOptions(navigation),
      })}
    />
  </FilterNavigatorStack.Navigator>
);

const EditNavigatorStack = createStackNavigator();

/**
 * Show photo editing navigator
 */
const EditNavigator = () => (
  <EditNavigatorStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: THEME.NAVIGATION_BACKGROUND,
      },
      headerTintColor: THEME.ICON_COLOR,
    }}>
    <EditNavigatorStack.Screen
      name="EditScreen"
      component={EditScreen}
      options={({navigation}) => ({
        ...screenOptions(navigation),
      })}
    />
  </EditNavigatorStack.Navigator>
);

const AddStoryEditStepNavigatorStack = createBottomTabNavigator();

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
 * Show photo editing step
 */
export const AddStoryEditStepNavigator = () => (
  <AddStoryEditStepNavigatorStack.Navigator {...bottomTabsConfig}>
    <AddStoryEditStepNavigatorStack.Screen
      name="FilterNavigator"
      component={FilterNavigator}
      options={{
        tabBarLabel: 'Filter',
      }}
    />

    <AddStoryEditStepNavigatorStack.Screen
      name="EditNavigator"
      component={EditNavigator}
      options={{
        tabBarLabel: 'Edit',
      }}
    />
  </AddStoryEditStepNavigatorStack.Navigator>
);

const styles = StyleSheet.create({
  header__text: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  header__text_next: {
    color: THEME.ACTIVE_BACKGROUND,
  },
});
