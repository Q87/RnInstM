import React, {useCallback, useMemo, useReducer} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  useWindowDimensions,
} from 'react-native';
import {THEME} from '../theme';
import {v4 as uuidv4} from 'uuid';

import {filterReducer, initialState} from './EditScreenReducer';
import {useSelector, useDispatch} from 'react-redux';
import {setPhotoToSave} from '../store/actions/library';

import Slider from '@react-native-community/slider';
import {Normal} from 'react-native-image-filter-kit';
import Feather from 'react-native-vector-icons/Feather';

/**
 * Show photo editing screen
 */
export const EditScreen = () => {
  // List of selected photos
  const selectedPhotos = useSelector(state => state.library.selectedPhotos);

  const dispatch = useDispatch();
  const windowHeight = useWindowDimensions().height;
  const [state, innerDispatch] = useReducer(filterReducer, initialState);

  /**
   * Set photo for next step
   */
  const setPhotoForNextStep = useCallback(
    nativeEvent => {
      const uri =
        state.appliedFilters.length > 0 ? nativeEvent.uri : selectedPhotos[0];

      dispatch(setPhotoToSave([uri]));
    },
    [dispatch, selectedPhotos, state.appliedFilters.length],
  );

  /**
   * Build the main image
   */
  const buildMainImage = useCallback(
    ({filters, source, style, types, isWrapper}) => {
      const params = isWrapper
        ? {
            extractImageEnabled: true,
            onExtractImage: ({nativeEvent}) => setPhotoForNextStep(nativeEvent),
          }
        : {};

      // If no filter is applied
      if (!filters.length) {
        return (
          <Normal image={<Image source={source} style={style} />} {...params} />
        );
      }

      const ImageContainer = types[filters[0]].type;

      // If one filter is applied
      if (filters.length === 1) {
        return (
          <ImageContainer
            image={<Image source={source} style={style} />}
            {...types[filters[0]].props}
            {...params}
          />
        );
      }

      return (
        <ImageContainer
          image={buildMainImage({
            filters: filters.slice(1),
            source,
            style,
            types,
            isWrapper: false,
          })}
          {...types[filters[0]].props}
          {...params}
        />
      );
    },
    [setPhotoForNextStep],
  );

  /**
   * Select a filter
   */
  const changeEditType = editType => {
    innerDispatch({
      type: 'CHANGE_EDIT_TYPE',
      editType,
    });
  };

  /**
   * Update filter data
   */
  const onSlidingCompleteHandler = value => {
    innerDispatch({
      type: 'UPDATE_FILTER_DATA',
      value,
    });
  };

  /**
   * Remove filter
   */
  const removeFilter = () => {
    innerDispatch({
      type: 'REMOVE_FILTER',
    });
  };

  /**
   * Hide filter setting
   */
  const hideFilterSetting = () => {
    innerDispatch({
      type: 'HIDE_FILTER_SETTING',
    });
  };

  /**
   * Show filter list
   */
  const filterList = useMemo(
    () =>
      Object.values(state.filterTypes).map(({name, icon}) => {
        const Icon = icon.type;

        // Is a filter applied?
        const isApplied = state.appliedFilters.includes(name);

        return (
          <TouchableOpacity
            key={uuidv4()}
            style={styles.filter}
            onPress={() => changeEditType(name)}
            activeOpacity={0.6}>
            <Text style={styles.filter__text}>{name}</Text>

            <View
              style={[
                styles.iconWrapper,
                isApplied && styles.iconWrapper_selected,
              ]}>
              <Icon
                name={icon.name}
                size={50}
                color={THEME.ICON_COLOR}
                style={styles.icon}
              />
            </View>

            <View
              style={[
                styles.filter__dot,
                isApplied && styles.filter__dot_visible,
              ]}
            />
          </TouchableOpacity>
        );
      }),
    [state.appliedFilters, state.filterTypes],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View
        style={[
          styles.mainImageContainer,
          {
            height: (windowHeight * 55) / 100,
          },
        ]}>
        {buildMainImage({
          filters: state.appliedFilters,
          source: {
            uri: selectedPhotos[0],
          },
          style: styles.mainImage,
          types: state.filterTypes,
          isWrapper: true,
        })}
      </View>

      {state.currentFilter && (
        <View style={styles.slider}>
          <Text style={styles.slider__text}>{state.currentFilter}</Text>

          <Slider
            style={styles.slider__component}
            minimumValue={state.editableMinimumValue}
            maximumValue={state.editableMaximumValue}
            value={state.editableValue}
            minimumTrackTintColor={THEME.CHECK_COLOR}
            maximumTrackTintColor={THEME.DIMMING_BACKGROUND}
            onSlidingComplete={onSlidingCompleteHandler}
          />

          <View style={styles.slider__actions}>
            <TouchableOpacity
              onPress={() => removeFilter()}
              activeOpacity={0.6}>
              <Feather name="x" size={30} color={THEME.CANCEL_COLOR} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => hideFilterSetting()}
              activeOpacity={0.6}>
              <Feather name="check" size={30} color={THEME.CHECK_COLOR} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!state.currentFilter && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.edits}>{filterList}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImageContainer: {
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider__component: {
    width: 300,
    height: 30,
    marginTop: 20,
  },
  slider__text: {
    fontSize: 30,
    fontWeight: '700',
  },
  slider__actions: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  edits: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  filter: {
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter__text: {
    fontSize: 13,
    fontWeight: '700',
  },
  iconWrapper: {
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 1,
    borderColor: THEME.INACTIVE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  iconWrapper_selected: {
    borderColor: THEME.ICON_COLOR,
    borderWidth: 2,
  },
  filter__dot: {
    width: 6,
    height: 6,
    backgroundColor: THEME.DIMMING_BACKGROUND,
    borderRadius: 3,
    marginTop: 8,
    opacity: 0,
  },
  filter__dot_visible: {
    opacity: 1,
  },
});
