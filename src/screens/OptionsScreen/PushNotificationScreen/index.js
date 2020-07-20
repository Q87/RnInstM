// Core
import React, {useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import {THEME} from '../../../theme';

// Components
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Hooks
import {useNotifications} from './hooks/useNotifications';

// Settings list
const SETTINGS_LIST = new Map([
  [
    'Likes',
    {
      options: ['Off', 'From People I Follow', 'From Everyone'],
      description: 'johnappleseed liked your photo.',
    },
  ],
  [
    'Comments',
    {
      options: ['Off', 'From People I Follow', 'From Everyone'],
      description: 'johnappleseed commented: "Nice shot!"',
    },
  ],
  [
    'Comment Likes',
    {
      options: ['Off', 'From People I Follow'],
      description: 'johnappleseed liked your comment: "Nice shot!"',
    },
  ],
]);

/**
 * Show push notification settings screen
 */
export const PushNotificationScreen = () => {
  const {settings, changeSelection} = useNotifications();

  /**
   * Show options
   */
  const optionsJSX = useCallback(
    (options, type) =>
      options.map((option) => (
        <TouchableHighlight
          onPress={() => {
            changeSelection(type, option);
          }}
          underlayColor={THEME.DIMMING_ICON_BACKGROUND}
          key={option}>
          <View style={styles.option}>
            <Text style={styles.option__text}>{option}</Text>

            <MaterialCommunityIcons
              name="check-bold"
              size={25}
              color={
                option === settings.get(type)
                  ? THEME.ACTIVE_BACKGROUND
                  : 'transparent'
              }
            />
          </View>
        </TouchableHighlight>
      )),
    [changeSelection, settings],
  );

  /**
   * Show a list of settings
   */
  const settingsListJSX = useMemo(
    () =>
      Array.from(SETTINGS_LIST).map(([type, {options, description}]) => (
        <View style={styles.settings} key={type}>
          <View style={styles.header}>
            <Text style={styles.header__text}>{type}</Text>
          </View>

          <View>
            {optionsJSX(options, type)}

            <View style={styles.description}>
              <Text style={styles.description__text}>{description}</Text>
            </View>
          </View>
        </View>
      )),
    [optionsJSX],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {settingsListJSX}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    paddingBottom: 10,
  },
  settings: {
    borderBottomWidth: 2,
    borderBottomColor: THEME.SEPARATOR_COLOR,
    paddingTop: 5,
    paddingBottom: 10,
  },

  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header__text: {
    fontSize: 18,
    fontWeight: '700',
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  option__text: {
    fontSize: 17,
  },

  description: {
    paddingLeft: 35,
    paddingRight: 15,
  },
  description__text: {
    color: THEME.USER_INFO_COLOR,
  },
});
