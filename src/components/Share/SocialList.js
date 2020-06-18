import React, {useState, useMemo, useCallback} from 'react';
import {View, StyleSheet, Text, Switch, Keyboard, Platform} from 'react-native';
import {THEME} from '../../theme';

/**
 * Show a list of social networks
 */
export const SocialList = () => {
  const [social, setSocial] = useState({
    facebook: {
      name: 'Facebook',
      value: false,
    },
    twitter: {
      name: 'Twitter',
      value: false,
    },
    tumblr: {
      name: 'Tumblr',
      value: false,
    },
  });

  /**
   * Toggle switch
   */
  const toggleSwitch = useCallback(
    (type, value) => {
      Keyboard.dismiss();

      const copied = {
        ...social,
      };
      copied[type].value = !value;

      setSocial(copied);
    },
    [social],
  );

  /**
   * List of social networks
   */
  const socialList = useMemo(
    () =>
      Object.entries(social).map(([type, {name, value}], key) => (
        <View
          style={[styles.social__item, key > 0 && styles.social__item_padding]}
          key={type}>
          <Text style={styles.social__text}>{name}</Text>

          <Switch
            trackColor={{
              false: THEME.INACTIVE_COLOR,
              true: THEME.ACTIVE_BACKGROUND,
            }}
            style={styles.social__switch}
            thumbColor={THEME.NAVIGATION_BACKGROUND}
            value={value}
            onValueChange={() => toggleSwitch(type, value)}
          />
        </View>
      )),
    [social, toggleSwitch],
  );

  return <View style={styles.social}>{socialList}</View>;
};

const styles = StyleSheet.create({
  social: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 20,
    borderTopWidth: 2,
    borderTopColor: THEME.SEPARATOR_COLOR,
    ...Platform.select({
      android: {
        paddingVertical: 20,
      },
      ios: {
        paddingVertical: 15,
      },
    }),
  },
  social__item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  social__item_padding: {
    ...Platform.select({
      android: {
        paddingTop: 20,
      },
      ios: {
        paddingTop: 30,
      },
    }),
  },
  social__text: {
    fontSize: 17,
  },
  social__switch: {
    ...Platform.select({
      android: {
        transform: [{scaleX: 1.8}, {scaleY: 1.8}],
      },
      ios: {
        transform: [{scaleX: 1.3}, {scaleY: 1.3}],
      },
    }),
  },
});
