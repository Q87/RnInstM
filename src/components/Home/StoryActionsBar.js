import React from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Show the action bar for a story
 */
export const StoryActionsBar = ({qty, pos}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.dots}>
        {[...Array(qty)].map((_, key) => (
          <View
            style={[styles.dot, pos === key && styles.dot_selected]}
            key={`dot-${key}`}
          />
        ))}
      </View>

      <View style={styles.icons}>
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={25}
            color={THEME.ICON_COLOR}
          />
        </View>

        <View style={styles.icon}>
          <Feather name="message-circle" size={25} color={THEME.ICON_COLOR} />
        </View>

        <View style={styles.icon}>
          <Feather name="send" size={25} color={THEME.ICON_COLOR} />
        </View>

        <View style={[styles.icon, styles.icon_last]}>
          <Feather name="bookmark" size={25} color={THEME.ICON_COLOR} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    height: 44,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    paddingVertical: 10,
    height: 44,
    alignItems: 'center',
  },
  dot: {
    borderRadius: 100,
    width: 8,
    height: 8,
    backgroundColor: THEME.DOT_BACKGROUND,
    marginHorizontal: 2,
  },
  dot_selected: {
    backgroundColor: THEME.ACTIVE_BACKGROUND,
  },
  icons: {
    flexDirection: 'row',
    marginTop: -44,
    height: 44,
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    marginRight: 18,
  },
  icon_last: {
    marginLeft: 'auto',
    marginRight: 0,
  },
});
