import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {THEME} from '../theme';

/**
 * Show photo editing screen
 */
export const EditScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Edit</Text>
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
