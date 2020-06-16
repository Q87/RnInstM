import React, {useState, useMemo, useCallback} from 'react';
import {View, StyleSheet, Text, Switch, Keyboard} from 'react-native';
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
      Object.entries(social).map(([type, {name, value}]) => (
        <View style={styles.social__item} key={type}>
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
    paddingBottom: 20,
    borderTopWidth: 2,
    borderTopColor: THEME.SEPARATOR_COLOR,
  },
  social__item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  social__text: {
    fontSize: 17,
  },
  social__switch: {
    transform: [{scaleX: 1.8}, {scaleY: 1.8}],
  },
});
