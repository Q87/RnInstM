import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../theme';

/**
 * Show camera screen
 */
export const CameraScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Camera</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
