// Core
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {THEME} from '../../../theme';

/**
 * Show cellular data usage screen
 */
export const CellularDataScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Cellular Data Use</Text>
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
