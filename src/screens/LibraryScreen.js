import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {THEME} from '../theme';

/**
 * Show media library screen
 */
export const LibraryScreen = () => {
  /**
   * Get albums from a local photo library
   */
  const getAlbums = () => {
    CameraRoll.getAlbums({
      assetType: 'Photos',
    })
      .then(albums => {
        console.log(albums);
      })
      .catch(err => {
        console.error(err);
      });
  };

  /**
   * Get photos from a local photo library
   */
  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
    })
      .then(photos => {
        console.log(photos.edges);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.wrapper}>
      <Text onPress={() => getAlbums()}>Get albums</Text>
      <Text onPress={() => getPhotos()}>Get photos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
