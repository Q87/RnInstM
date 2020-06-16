import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {THEME} from '../theme';
import {useSelector} from 'react-redux';

import {SocialList} from '../components/Share/SocialList';
import {TagList} from '../components/Share/TagList';
import {AdvancedSettings} from '../components/Share/AdvancedSettings';

/**
 * Show screen with the ability to share a new post
 */
export const ShareScreen = () => {
  const [text, setText] = useState('');
  const photoToShare = useSelector(state => state.library.photoToShare);

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper__content}>
          <View style={styles.post}>
            <Image source={{uri: photoToShare[0]}} style={styles.post__image} />

            <TextInput
              style={styles.post__text}
              placeholder="Введите текст заметки"
              value={text}
              onChangeText={setText}
            />
          </View>

          <TagList />

          <SocialList />

          <AdvancedSettings />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
  },
  wrapper__content: {
    flex: 1,
  },
  post: {
    width: '100%',
    flexDirection: 'row',
    padding: 18,
    alignItems: 'flex-start',
  },
  post__image: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  post__text: {
    flexGrow: 1,
    fontSize: 17,
  },
});
