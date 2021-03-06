import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {THEME} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from 'react-redux';
import {addToFavourites} from '../../store/actions/post';

/**
 * Show the action bar for a story
 */
export const StoryActionsBar = ({userId, storyId, qty, pos, isFavourite}) => {
  const dispatch = useDispatch();

  /**
   * Add to favourites
   */
  const addToFavouritesHandler = () => {
    dispatch(addToFavourites(userId, storyId, isFavourite ? 'remove' : 'add'));
  };

  return (
    <View style={styles.wrapper}>
      {qty > 1 && (
        <View style={styles.dots}>
          {[...Array(qty)].map((_, key) => (
            <View
              style={[styles.dot, pos === key && styles.dot_selected]}
              key={`dot-${key}`}
            />
          ))}
        </View>
      )}

      <View style={[styles.icons, qty > 1 && styles.icons_swiper]}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => addToFavouritesHandler()}>
          <MaterialCommunityIcons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={25}
            color={THEME.ICON_COLOR}
          />
        </TouchableOpacity>

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
    height: 44,
    width: '100%',
    alignItems: 'center',
  },
  icons_swiper: {
    marginTop: -44,
  },
  icon: {
    marginRight: 18,
  },
  icon_last: {
    marginLeft: 'auto',
    marginRight: 0,
  },
});
