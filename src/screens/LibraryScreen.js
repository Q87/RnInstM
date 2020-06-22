import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import {THEME} from '../theme';

import {useSelector, useDispatch} from 'react-redux';
import {getLibraryData, setPhotosForEditing} from '../store/actions/library';

// Separator width between photos
const ITEM_SEPARATOR = 1;

/**
 * Show media library screen
 */
export const LibraryScreen = () => {
  // Photo list
  const photos = useSelector((state) => state.library.photos);
  // Selected photos
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  /**
   * Get library data
   */
  useEffect(() => {
    dispatch(getLibraryData());
  }, [dispatch]);

  /**
   * Select a photo on initial load
   */
  useEffect(() => {
    if (photos.length && !selectedPhotos.length) {
      const uri = photos[0]?.node?.image?.uri;

      setSelectedPhotos([...selectedPhotos, uri]);
      dispatch(setPhotosForEditing([uri]));
    }
  }, [dispatch, photos, selectedPhotos]);

  /**
   * Show the main photos
   */
  const renderMainPhotos = () =>
    selectedPhotos?.map((uri) => (
      <ImageBackground
        style={styles.photo}
        source={{
          uri,
        }}
        key={uri}
      />
    ));

  /**
   * Select a photo
   */
  const selectPhoto = (uri) => {
    setSelectedPhotos([uri]);
    dispatch(setPhotosForEditing([uri]));
  };

  /**
   * Show a list of photos
   */
  const renderPhotos = (uri) => (
    <TouchableHighlight
      style={styles.imageContainer}
      onPress={() => selectPhoto(uri)}>
      <ImageBackground
        style={[
          {
            width: windowWidth / 4 - ITEM_SEPARATOR * 2,
            height: windowWidth / 4 - ITEM_SEPARATOR * 2,
          },
          selectedPhotos.includes(uri) && styles.image_selected,
        ]}
        source={{
          uri,
        }}
      />
    </TouchableHighlight>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View
        style={[
          styles.photoContainer,
          {
            height: (windowHeight * 55) / 100 - ITEM_SEPARATOR,
          },
        ]}>
        {renderMainPhotos()}
      </View>

      {photos.length > 0 && (
        <FlatList
          data={photos}
          renderItem={({
            item: {
              node: {
                image: {uri},
              },
            },
          }) => renderPhotos(uri)}
          keyExtractor={({
            node: {
              image: {uri},
            },
          }) => uri}
          numColumns={4}
          columnWrapperStyle={styles.images}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    justifyContent: 'space-around',
  },
  photoContainer: {
    width: '100%',
    borderBottomWidth: ITEM_SEPARATOR,
    borderBottomColor: THEME.MAIN_CONTENT_COLOR,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    padding: ITEM_SEPARATOR,
  },
  image_selected: {
    opacity: 0.5,
  },
});
