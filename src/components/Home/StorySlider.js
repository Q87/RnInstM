import React, {useState, useRef, useCallback} from 'react';
import {View, StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import {THEME} from '../../theme';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoryActionsBar} from './StoryActionsBar';

/**
 * Show story slider
 */
export const StorySlider = ({userId, storyId, images, isFavourite}) => {
  // Current slide
  const [pos, setPos] = useState(0);
  // Number of slides
  const qty = images.length;

  const refCarousel = useRef(null);
  const windowWidth = useWindowDimensions().width;

  /**
   * Show carousel items
   */
  const renderItem = useCallback(
    ({item: {id, url}}) => (
      <View style={styles.slide} key={id}>
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
        />

        <View style={styles.account}>
          <MaterialCommunityIcons
            name="account"
            size={15}
            color={THEME.MAIN_CONTENT_COLOR}
          />
        </View>
      </View>
    ),
    [],
  );

  return (
    <View>
      {qty > 1 ? (
        <View>
          <Carousel
            ref={refCarousel}
            data={images}
            renderItem={renderItem}
            style={styles.wrapper}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            onBeforeSnapToItem={setPos}
            loop={true}
          />

          <View style={styles.counter}>
            <Text style={styles.counter__text}>
              {pos + 1} / {qty}
            </Text>
          </View>
        </View>
      ) : (
        <Image
          style={[styles.image, styles.image_single]}
          source={{
            uri: images[0].url,
          }}
        />
      )}

      <StoryActionsBar
        userId={userId}
        storyId={storyId}
        qty={qty}
        pos={pos}
        isFavourite={isFavourite}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 345,
  },
  slide: {
    height: 345,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  image_single: {
    height: 345,
  },
  account: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: THEME.ICON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    position: 'absolute',
    top: 12,
    right: 12,
    height: 24,
    backgroundColor: THEME.ICON_COLOR,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter__text: {
    color: THEME.MAIN_CONTENT_COLOR,
    letterSpacing: -1,
  },
});
