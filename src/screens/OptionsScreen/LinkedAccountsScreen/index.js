// Core
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {THEME} from '../../../theme';

// Components
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// List of accounts
const accountList = new Map([
  [
    'Facebook',
    {
      IconType: Entypo,
      iconName: 'facebook',
      isActivated: true,
      username: 'Caroline Forsey',
    },
  ],
  [
    'Twitter',
    {
      IconType: Entypo,
      iconName: 'twitter',
      isActivated: false,
      username: '',
    },
  ],
  [
    'Tumblr',
    {
      IconType: Entypo,
      iconName: 'tumblr',
      isActivated: false,
      username: '',
    },
  ],
  [
    'VKontakte',
    {
      IconType: Entypo,
      iconName: 'vk',
      isActivated: false,
      username: '',
    },
  ],
  [
    'OK.ru',
    {
      IconType: MaterialCommunityIcons,
      iconName: 'odnoklassniki',
      isActivated: false,
      username: '',
    },
  ],
]);

/**
 * Show linked accounts screen
 */
export const LinkedAccountsScreen = () => {
  /**
   * Show list of accounts
   */
  const accountListJSX = () =>
    Array.from(accountList).map(
      ([type, {IconType, iconName, isActivated, username}]) => (
        <TouchableHighlight
          onPress={() => {
            console.log(type);
          }}
          underlayColor={THEME.DIMMING_ICON_BACKGROUND}
          key={type}>
          <View style={styles.option}>
            <IconType
              name={iconName}
              size={23}
              color={
                isActivated ? THEME.ACTIVE_BACKGROUND : THEME.INACTIVE_COLOR
              }
            />

            <Text style={styles.option__text}>{type}</Text>
            {isActivated && (
              <Text style={styles.option__userName}>{username}</Text>
            )}

            <Feather
              name="chevron-right"
              size={25}
              color={THEME.INACTIVE_COLOR}
            />
          </View>
        </TouchableHighlight>
      ),
    );

  return <SafeAreaView style={styles.wrapper}>{accountListJSX()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  option__text: {
    fontSize: 17,
    paddingLeft: 15,
    marginRight: 'auto',
  },
  option__userName: {
    fontSize: 16,
    paddingRight: 7,
    color: THEME.USER_INFO_COLOR,
  },
});
