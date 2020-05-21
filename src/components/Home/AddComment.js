import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {THEME} from '../../theme';

/**
 * Add a comment
 */
export const AddComment = () => {
  return (
    <View style={styles.add}>
      <View style={styles.add__user} />
      <TextInput style={styles.add__input} placeholder="Add a comment..." />
    </View>
  );
};

const styles = StyleSheet.create({
  add: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginTop: 5,
    alignItems: 'center',
  },
  add__user: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: THEME.ICON_COLOR,
    borderWidth: 1,
  },
  add__input: {
    marginLeft: 8,
  },
});
