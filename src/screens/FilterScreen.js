import React, {useState, useMemo} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Text,
} from 'react-native';
import {THEME} from '../theme';
import {useSelector, useDispatch} from 'react-redux';
import {setPhotoToSave} from '../store/actions/library';
import {v4 as uuidv4} from 'uuid';

import {
  Normal,
  Grayscale,
  Sepia,
  Invert,
  Lsd,
} from 'react-native-image-filter-kit';

// Filter types
const FILTER_TYPES = [
  {
    name: 'Original',
    Type: Normal,
  },
  {
    name: 'Grayscale',
    Type: Grayscale,
  },
  {
    name: 'Sepia',
    Type: Sepia,
  },
  {
    name: 'Invert',
    Type: Invert,
  },
  {
    name: 'Lsd',
    Type: Lsd,
  },
];

/**
 * Show screen with filters for photos
 */
export const FilterScreen = () => {
  // Photo list
  const selectedPhotos = useSelector(state => state.library.selectedPhotos);

  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState(() => FILTER_TYPES[0].Type);
  const windowHeight = useWindowDimensions().height;

  /**
   * Build the main image
   */
  const buildMainImage = ({Type, source, style}) => (
    <Type
      image={<Image source={source} style={style} />}
      extractImageEnabled={true}
      onExtractImage={({nativeEvent}) =>
        dispatch(setPhotoToSave([nativeEvent.uri]))
      }
    />
  );

  /**
   * Show filter list
   */
  const filterList = useMemo(
    () =>
      FILTER_TYPES.map(({name, Type}) => (
        <TouchableOpacity
          key={uuidv4()}
          style={styles.filter}
          onPress={() => setFilterType(() => Type)}
          activeOpacity={0.6}>
          <Text>{name}</Text>

          <Type
            image={
              <Image
                source={{
                  uri: selectedPhotos[0],
                }}
                style={styles.filter__image}
              />
            }
          />
        </TouchableOpacity>
      )),
    [selectedPhotos],
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
          Type: filterType,
          source: {
            uri: selectedPhotos[0],
          },
          style: styles.mainImage,
        })}
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.filters}>{filterList}</View>
      </ScrollView>
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
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  filter: {
    alignItems: 'center',
  },
  filter__image: {
    width: 110,
    height: 110,
    marginTop: 7,
    marginHorizontal: 2,
  },
});
