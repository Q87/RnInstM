import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';
import {ProfileImage} from '../ProfileImage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Show information about a user who created a story
 */
export const ProfileTopBar = ({name, location}) => {
  return (
    <View style={styles.wrapper}>
      <ProfileImage gradientSize={34} imageSize={30} imageBorder={false} />

      <View style={styles.userInfo}>
        <Text style={styles.userInfo__name}>{name}</Text>
        <Text style={styles.userInfo__pos}>{location}</Text>
      </View>

      <View style={styles.options}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color={THEME.ICON_COLOR}
          style={[styles.add]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    height: 59,
    paddingHorizontal: 12,
  },
  userInfo: {
    marginLeft: 9,
  },
  userInfo__name: {
    fontWeight: '700',
    fontSize: 12,
  },
  userInfo__pos: {
    fontSize: 12,
  },
  options: {
    marginLeft: 'auto',
  },
});
