import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {THEME} from '../theme';

// Types of icons
const ICON_TYPES = {
  Feather,
  MaterialCommunityIcons,
  Entypo,
  default: Feather,
};

/**
 * Show header icon
 */
export const AppHeaderIcon = (props) => {
  const {iconSize, iconType} = props;

  return (
    <HeaderButton
      {...props}
      iconSize={iconSize ?? 24}
      IconComponent={ICON_TYPES[iconType ?? 'default']}
      color={THEME.ICON_COLOR}
    />
  );
};
