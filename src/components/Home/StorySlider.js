import React, {useState, useCallback, Fragment} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {THEME} from '../../theme';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StoryActionsBar} from './StoryActionsBar';
import {Model} from 'react-model';

// Loading indicator
const loading = require('../../../assets/loading.gif');

/**
 * Slide schema
 */
const SlideSchema = images => ({
  state: {
    imgList: [...images],
    loadQueue: [...Array(images.length)].fill(0),
  },
  actions: {
    loaded: idx => state => {
      state.loadQueue[idx] = 1;
    },
  },
});

/**
 * Show slide
 */
const Slide = ({idx, uri, loadHandle, loaded}) => {
  return (
    <View style={styles.slide}>
      <Image
        style={styles.image}
        source={{uri}}
        onLoad={() => {
          !loaded && loadHandle(idx);
        }}
      />

      <View style={styles.account}>
        <MaterialCommunityIcons
          name="account"
          size={15}
          color={THEME.MAIN_CONTENT_COLOR}
        />
      </View>

      {!loaded && (
        <View style={styles.loadingView}>
          <Image style={styles.loadingImage} source={loading} />
        </View>
      )}
    </View>
  );
};

/**
 * Show story slider
 */
export const StorySlider = ({images}) => {
  // Current slide
  const [pos, setPos] = useState(0);
  // Number of slides
  const qty = images.length;

  /* Slide loading status */
  const [{useStore}] = useState(() => Model(SlideSchema(images)));
  const [state, actions] = useStore();
  const loadHandle = useCallback(
    idx => {
      actions.loaded(idx);
    },
    [actions],
  );

  return (
    <View>
      <View>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={index => {
            setPos(index);
          }}
          loadMinimal={true}
          loop={false}>
          {state?.imgList?.map(({id, url}, idx) => (
            <Slide
              key={id}
              idx={idx}
              uri={url}
              loadHandle={loadHandle}
              loaded={state.loadQueue[idx]}
            />
          )) || <Fragment />}
        </Swiper>

        <View style={styles.counter}>
          <Text style={styles.counter__text}>
            {pos + 1} / {qty}
          </Text>
        </View>
      </View>

      <StoryActionsBar qty={qty} pos={pos} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 278,
  },
  slide: {
    height: 278,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
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
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: THEME.DIMMING_BACKGROUND,
  },

  loadingImage: {
    width: 60,
    height: 60,
  },
});
