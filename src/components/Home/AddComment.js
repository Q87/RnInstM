import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {THEME} from '../../theme';

import {useDispatch} from 'react-redux';
import {addComment} from '../../store/actions/post';

import {own} from '../../mocks/own';

/**
 * Add a comment
 */
export const AddComment = ({userId, storyId}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  /**
   * Save comment
   */
  const onSubmitEditingHandler = ({nativeEvent: {text: comment}}) => {
    dispatch(addComment(userId, storyId, comment, own.ownName));
    setText('');
  };

  return (
    <View style={styles.add}>
      <View style={styles.add__user} />
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.add__input}
        placeholder="Add a comment..."
        onSubmitEditing={onSubmitEditingHandler}
      />
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
