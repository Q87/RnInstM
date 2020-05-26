import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {THEME} from '../theme';
import {useSelector, useDispatch} from 'react-redux';
import {addImage} from '../store/actions/post';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

// Icon size
const ICON_SIZE = 30;

/**
 * Show photo editing screen
 */
export const EditPhotoScreen = ({navigation}) => {
  const newImage = useSelector(state => state.post.newImage.uri);
  const dispatch = useDispatch();

  /**
   * Go to the home screen
   */
  const exit = () => {
    dispatch(addImage(''));
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: newImage,
        }}>
        <View style={[styles.captureActions, styles.captureActions_top]}>
          <TouchableOpacity
            onPress={() => exit()}
            style={[styles.action, styles.action_exit]}>
            <Entypo
              name="cross"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.action, styles.action_marginLeft]}>
            <MaterialCommunityIcons
              name="emoticon-tongue-outline"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.action, styles.action_marginLeft]}>
            <Feather
              name="edit-3"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.action, styles.action_marginLeft]}>
            <MaterialCommunityIcons
              name="format-font"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.captureActions, styles.captureActions_bottom]}>
          <TouchableOpacity style={[styles.action, styles.action_marginRight]}>
            <MaterialCommunityIcons
              name="arrow-collapse-down"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={styles.icon}
            />
            <Text style={styles.action__text}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.action,
              styles.action_marginRight,
              styles.action_story,
            ]}>
            <MaterialCommunityIcons
              name="plus"
              size={ICON_SIZE}
              color={THEME.MAIN_CONTENT_COLOR}
              style={[styles.icon, styles.icon_story]}
            />
            <Text style={styles.action__text}>Your Story</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.action, styles.action_send]}>
            <Text>Send To</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={ICON_SIZE}
              color={THEME.ICON_COLOR}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captureActions: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captureActions_top: {
    top: 15,
    paddingHorizontal: 20,
  },
  captureActions_bottom: {
    bottom: 40,
    paddingHorizontal: 40,
  },
  action: {
    alignItems: 'center',
  },
  action_exit: {
    marginRight: 'auto',
  },
  action_marginLeft: {
    marginLeft: 25,
  },
  action_marginRight: {
    marginRight: 25,
  },
  action_send: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: THEME.ICON_COLOR,
    borderWidth: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    borderRadius: 40,
  },
  action_story: {
    alignSelf: 'flex-end',
  },
  icon: {
    textShadowRadius: 6,
    textShadowOffset: {width: 0, height: 0},
    borderRadius: ICON_SIZE / 2,
  },
  icon_story: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    borderWidth: 2,
    borderColor: THEME.MAIN_CONTENT_COLOR,
    elevation: 1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowColor: THEME.ICON_COLOR,
  },
  action__text: {
    color: THEME.MAIN_CONTENT_COLOR,
    textShadowRadius: 6,
    textShadowOffset: {width: 0, height: 0},
  },
});
