import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {StackActions} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {addPost} from '../store/actions/post';

import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

import {ShareScreen} from '../screens/ShareScreen';

/**
 * Share post
 */
const sharePost = (navigation, dispatch) => {
  dispatch(addPost());

  navigation.dispatch(StackActions.popToTop());
  navigation.navigate('HomeNavigator');
};

// Screen options
const screenOptions = (navigation, dispatch) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Back to photo selection"
        iconName="chevron-left"
        onPress={() => navigation.navigate('AddStoryEditStepNavigator')}
        iconSize={35}
      />
    </HeaderButtons>
  ),

  headerTitle: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="New Post"
        buttonStyle={[styles.header__text, styles.header__text_title]}
      />
    </HeaderButtons>
  ),
  headerTitleAlign: 'center',

  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title="Share"
        onPress={() => sharePost(navigation, dispatch)}
        buttonStyle={[styles.header__text, styles.header__text_next]}
      />
    </HeaderButtons>
  ),
  headerRightContainerStyle: {
    paddingRight: 20,
  },
});

const AddStoryShareStepNavigatorStack = createStackNavigator();

/**
 * Show step of adding a new post
 */
export const AddStoryShareStepNavigator = () => {
  const dispatch = useDispatch();

  return (
    <AddStoryShareStepNavigatorStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.NAVIGATION_BACKGROUND,
        },
        headerTintColor: THEME.ICON_COLOR,
      }}>
      <AddStoryShareStepNavigatorStack.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={({navigation}) => ({
          ...screenOptions(navigation, dispatch),
        })}
      />
    </AddStoryShareStepNavigatorStack.Navigator>
  );
};

const styles = StyleSheet.create({
  header__text: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  header__text_title: {
    fontWeight: '600',
  },
  header__text_next: {
    color: THEME.ACTIVE_BACKGROUND,
  },
});
