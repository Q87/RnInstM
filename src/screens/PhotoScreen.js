import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import {THEME} from '../theme';

/**
 * Show photo adding screen
 */
export const PhotoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Photo</Text>
    </SafeAreaView>
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
