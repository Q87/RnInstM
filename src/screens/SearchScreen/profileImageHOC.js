// Core
import React from 'react';
import {THEME} from '../../theme';

// Components
import {ProfileImage} from '../../components/ProfileImage';

/* ProfileImage settings */
const IMAGE_SIZE = 50;
const ICON_SIZE = 32;
const GRADIENT_SIZE = 62;
const GRADIENT_COLOR = 'transparent';

/**
 * ProfileImage HOC
 */
export const ProfileImageHOC = (props) => (
  <ProfileImage
    start={GRADIENT_COLOR}
    end={GRADIENT_COLOR}
    iconSize={ICON_SIZE}
    iconColor={THEME.ICON_COLOR}
    backgroundColor={THEME.MAIN_CONTENT_COLOR}
    imageBorderColor={THEME.DIMMING_ICON_BACKGROUND}
    imageSize={IMAGE_SIZE}
    gradientSize={GRADIENT_SIZE}
    imageBorder={true}
    {...props}
  />
);
