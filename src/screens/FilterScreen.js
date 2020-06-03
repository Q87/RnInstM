import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import {THEME} from '../theme';

/**
 * Show screen with filters for photos
 */
export const FilterScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.filters}>
        <View style={styles.filter}>
          <Text>Filter</Text>
        </View>
      </View>
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
  filters: {
    flexDirection: 'row',
  },
  filter: {
    alignItems: 'center',
  },
});
