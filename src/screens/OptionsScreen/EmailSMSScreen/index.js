// Core
import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {THEME} from '../../../theme';

/**
 * Show email and SMS notification settings screen
 */
export const EmailSMSScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text>Email and SMS Notification Settings</Text>
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
