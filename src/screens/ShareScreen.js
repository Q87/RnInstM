import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import {THEME} from '../theme';

import {useSelector} from 'react-redux';

/**
 * Show screen with the ability to share a new post
 */
export const ShareScreen = () => {
  const photoToShare = useSelector(state => state.library.photoToShare);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.post}>
        <Image source={{uri: photoToShare[0]}} style={styles.post_image} />

        <Text style={styles.post_text}>Boston is beautiful today!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    alignItems: 'center',
  },
  post: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: THEME.SEPARATOR_COLOR,
    padding: 18,
  },
  post_image: {
    width: 70,
    height: 70,
    borderWidth: 1,
    marginRight: 15,
  },
  post_text: {
    marginTop: 8,
    fontSize: 17,
  },
});
