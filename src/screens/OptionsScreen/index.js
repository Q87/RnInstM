// Core
import React, {useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
  Switch,
  Platform,
} from 'react-native';
import {THEME} from '../../theme';

// Components
import Feather from 'react-native-vector-icons/Feather';

// Hooks
import {useOptions} from './hooks/useOptions';

// Setting options
const OPTIONS = new Map([
  ['Linked Accounts', 'LinkedAccountsScreen'],
  ['Contacts', 'ContactsScreen'],
  ['Language', 'LanguageScreen'],
  ['Push Notification Settings', 'PushNotificationScreen'],
  ['Email and SMS Notification Settings', 'EmailSMSScreen'],
  ['Cellular Data Use', 'CellularDataScreen'],
  ['Comments', 'CommentScreen'],
]);

/**
 * Show settings screen
 */
export const OptionsScreen = ({navigation}) => {
  const {switchedOptions, toggleSwitch} = useOptions();

  /**
   * Show list of switchable options
   */
  const switchedOptionsListJSX = useMemo(
    () =>
      Array.from(switchedOptions).map(([type, value]) => (
        <View style={[styles.option, styles.option_switched]} key={type}>
          <Text style={styles.option__text}>{type}</Text>

          <Switch
            trackColor={{
              false: THEME.INACTIVE_COLOR,
              true: THEME.ACTIVE_BACKGROUND,
            }}
            style={styles.option__switch}
            thumbColor={THEME.NAVIGATION_BACKGROUND}
            value={value}
            onValueChange={() => toggleSwitch(type, value)}
          />
        </View>
      )),
    [switchedOptions, toggleSwitch],
  );

  /**
   * Show option list
   */
  const optionListJSX = useMemo(
    () =>
      Array.from(OPTIONS).map(([type, value]) => (
        <TouchableHighlight
          key={type}
          onPress={() => {
            navigation.navigate(value);
          }}
          underlayColor={THEME.DIMMING_ICON_BACKGROUND}>
          <View style={styles.option}>
            <Text style={styles.option__text}>{type}</Text>

            <Feather
              name="chevron-right"
              size={20}
              color={THEME.INACTIVE_COLOR}
            />
          </View>
        </TouchableHighlight>
      )),
    [navigation],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.header__text}>Settings</Text>
        </View>

        <View>
          {optionListJSX}

          {switchedOptionsListJSX}

          <View style={styles.description}>
            <Text style={styles.description__text}>
              Allow accounts you follow and anyone you message to see
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    paddingTop: 8,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header__text: {
    fontSize: 17,
    fontWeight: '700',
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  option_switched: {
    paddingRight: 30,
  },
  option__text: {
    fontSize: 17,
  },
  option__switch: {
    ...Platform.select({
      android: {
        transform: [{scaleX: 1.8}, {scaleY: 1.8}],
      },
      ios: {
        transform: [{scaleX: 1.3}, {scaleY: 1.3}],
      },
    }),
  },

  description: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  description__text: {
    color: THEME.USER_INFO_COLOR,
  },
});
