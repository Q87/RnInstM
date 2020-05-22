import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {THEME} from '../theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

// Icon size
const ICON_SIZE = 30;

/**
 * Show camera screen
 */
export const CameraScreen = ({navigation}) => {
  return (
    <RNCamera style={styles.camera}>
      <View style={[styles.captureActions, styles.captureActions_top]}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialCommunityIcons
            name="octagram-outline"
            size={ICON_SIZE}
            color={THEME.MAIN_CONTENT_COLOR}
            style={[styles.icon, styles.icon_sun]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditPhotoScreen')}>
          <Feather
            name="chevron-right"
            size={ICON_SIZE}
            color={THEME.MAIN_CONTENT_COLOR}
            style={[styles.icon, styles.icon_next]}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.captureActions, styles.captureActions_bottom]}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => navigation.navigate('SimpleLibraryScreen')}>
          <View style={styles.library} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action}>
          <MaterialCommunityIcons
            name="flash"
            size={ICON_SIZE}
            color={THEME.MAIN_CONTENT_COLOR}
            style={[styles.icon, styles.icon_lightning]}
          />
        </TouchableOpacity>

        <View style={styles.snapContainer}>
          <TouchableOpacity
            style={styles.snap}
            onPress={() => console.log('Take photo')}
          />
        </View>

        <TouchableOpacity style={styles.action}>
          <Entypo
            name="cycle"
            size={ICON_SIZE}
            color={THEME.MAIN_CONTENT_COLOR}
            style={[styles.icon, styles.icon_cycle]}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.action}>
          <MaterialCommunityIcons
            name="emoticon-happy-outline"
            size={ICON_SIZE}
            color={THEME.MAIN_CONTENT_COLOR}
            style={[styles.icon, styles.icon_happy]}
          />
        </TouchableOpacity>
      </View>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  captureActions: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  icon: {
    backgroundColor: THEME.DIMMING_ICON_BACKGROUND,
    borderRadius: ICON_SIZE / 2,
  },
  icon_sun: {
    transform: [{rotate: '25deg'}],
  },
  icon_lightning: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderWidth: 1,
    borderColor: THEME.MAIN_CONTENT_COLOR,
  },
  icon_cycle: {
    transform: [{rotate: '50deg'}],
  },
  action: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  library: {
    width: ICON_SIZE - 2,
    height: ICON_SIZE - 2,
    borderWidth: 2,
    borderColor: THEME.MAIN_CONTENT_COLOR,
    borderRadius: 8,
  },
  snapContainer: {
    width: 90,
    height: 90,
    backgroundColor: THEME.SNAP_BACKGROUND,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snap: {
    width: 60,
    height: 60,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    borderRadius: 30,
  },
});
