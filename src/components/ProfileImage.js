// Core
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {THEME} from '../theme';

// Components
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

/**
 * Show profile image
 */
export const ProfileImage = ({
  start = THEME.PROFILE_IMAGE_GRADIENT_START,
  end = THEME.PROFILE_IMAGE_GRADIENT_END,
  imageBorderWidth = 1,
  url,
  own,
  ownPos,
  gradientSize,
  imageSize,
  imageBorder,
  Icon,
  iconName,
  iconSize,
  iconColor,
  backgroundColor,
  imageBorderColor,
}) => {
  return (
    <View>
      <View style={[styles.gradientWrapper, {borderRadius: gradientSize / 2}]}>
        <LinearGradient
          colors={[start, end]}
          style={[
            styles.gradient,
            {width: gradientSize, height: gradientSize},
          ]}>
          <View
            style={[
              styles.imageWrapper,
              {
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize / 2,
                borderWidth: imageBorderWidth,
              },
              imageBorder && styles.imageWrapper_border,
              backgroundColor && {backgroundColor},
              imageBorderColor && {borderColor: imageBorderColor},
            ]}>
            {url && <Image style={styles.image} source={{uri: url}} />}

            {Icon && <Icon name={iconName} size={iconSize} color={iconColor} />}
          </View>
        </LinearGradient>
      </View>

      {own && (
        <View
          style={[
            styles.addWrapper,
            {
              top: ownPos,
              left: ownPos,
            },
          ]}>
          <Feather
            name="plus"
            size={17}
            color={THEME.MAIN_CONTENT_COLOR}
            style={styles.add}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    overflow: 'hidden',
  },
  gradient: {
    transform: [{rotate: '225deg'}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: THEME.ICON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '-225deg'}],
  },
  imageWrapper_border: {
    borderColor: THEME.MAIN_CONTENT_COLOR,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  addWrapper: {
    width: 20,
    height: 20,
    borderRadius: 100,
    position: 'absolute',
    borderWidth: 1,
    borderColor: THEME.MAIN_CONTENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  add: {
    backgroundColor: THEME.ACTIVE_BACKGROUND,
    borderRadius: 100,
  },
});
