import React, {useState} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {THEME} from '../../theme';

import Accordion from 'react-native-collapsible/Accordion';
import Feather from 'react-native-vector-icons/Feather';

// Accordion sections
const SECTIONS = [
  {
    title: 'Advanced Settings',
    content: '...',
  },
];

/**
 * Show advanced settings
 */
export const AdvancedSettings = () => {
  const [activeSections, setActiveSections] = useState([]);

  /**
   * Show accordion header
   */
  const renderHeader = ({title}, _, isActive) => (
    <View style={styles.header}>
      <Text style={styles.header__text}>{title}</Text>

      <Feather
        name={isActive ? 'chevron-down' : 'chevron-right'}
        size={18}
        color={THEME.INACTIVE_COLOR}
        style={styles.header__icon}
      />
    </View>
  );

  /**
   * Show accordion content
   */
  const renderContent = ({content}) => (
    <View>
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
    borderTopWidth: 2,
    borderTopColor: THEME.SEPARATOR_COLOR,
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
  },
  header__text: {
    color: THEME.INACTIVE_COLOR,
    marginRight: 5,
  },
  header__icon: {
    ...Platform.select({
      android: {
        marginTop: 2,
      },
    }),
  },
});
