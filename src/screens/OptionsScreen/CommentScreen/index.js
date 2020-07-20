// Core
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {THEME} from '../../../theme';

/**
 * Show comment screen
 */
export const CommentScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Comments</Text>
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
