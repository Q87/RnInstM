import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {THEME} from '../../theme';

import Accordion from 'react-native-collapsible/Accordion';
import Feather from 'react-native-vector-icons/Feather';

// Accordion sections
const SECTIONS = [
  {
    title: 'Tag People',
    content: '...',
  },
  {
    title: 'Add Location',
    content: '...',
  },
];

/**
 * Show tag list
 */
export const TagList = () => {
  const [activeSections, setActiveSections] = useState([]);

  /**
   * Show accordion header
   */
  const renderHeader = ({title}, _, isActive) => (
    <View style={styles.header}>
      <Text style={styles.header__text}>{title}</Text>

      <Feather
        name={isActive ? 'chevron-down' : 'chevron-right'}
        size={20}
        color={THEME.INACTIVE_COLOR}
      />
    </View>
  );

  /**
   * Show accordion content
   */
  const renderContent = ({content}) => (
    <View style={styles.content}>
      <Text>{content}</Text>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={setActiveSections}
        underlayColor={THEME.DIMMING_ICON_BACKGROUND}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: THEME.SEPARATOR_COLOR,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 15,
  },
  header__text: {
    fontSize: 17,
  },
  content: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
