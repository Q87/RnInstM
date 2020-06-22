import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useSelector, useDispatch} from 'react-redux';
import {addImage} from '../store/actions/post';
import {THEME} from '../theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

// Icon size
const ICON_SIZE = 30;

/**
 * Show camera screen
 */
export const CameraScreen = ({navigation}) => {
  const [image, setImage] = useState(
    useSelector((state) => state.post.newImage),
  );
  const dispatch = useDispatch();

  /**
   * Take a picture with a camera
   */
  const takePicture = async (camera) => {
    const options = {
      quality: 0.7,
    };
    const data = await camera.takePictureAsync(options);

    /* If the photo was taken */
    setImage(data);
    dispatch(addImage(data));
  };

  /**
   * Go to the photo editing screen
   */
  const editPhoto = () => {
    image && navigation.navigate('EditPhotoScreen');
  };

  /**
   * Show top actions
   */
  const renderTopActions = () => (
    <View style={[styles.captureActions, styles.captureActions_top]}>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <MaterialCommunityIcons
          name="octagram-outline"
          size={ICON_SIZE}
          color={THEME.MAIN_CONTENT_COLOR}
          style={[styles.icon, styles.icon_sun]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => editPhoto()}>
        <Feather
          name="chevron-right"
          size={ICON_SIZE}
          color={THEME.MAIN_CONTENT_COLOR}
          style={[styles.icon, styles.icon_next]}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {image ? (
        <ImageBackground source={image} style={styles.image}>
          {renderTopActions()}
        </ImageBackground>
      ) : (
        <RNCamera style={styles.camera}>
          {({camera}) => {
            return (
              <>
                {renderTopActions()}

                <View
                  style={[styles.captureActions, styles.captureActions_bottom]}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => navigation.navigate('SimpleLibraryScreen')}>
                    <View style={styles.library} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action}>
                    <MaterialCommunityIcons
                      name="flash"
                      size={ICON_SIZE}
                      color={THEME.MAIN_CONTENT_COLOR}
                      style={[styles.icon, styles.icon_lightning]}
                    />
                  </TouchableOpacity>

                  <View style={styles.snapContainer}>
                    <TouchableOpacity
                      style={styles.snap}
                      onPress={() => takePicture(camera)}
                    />
                  </View>

                  <TouchableOpacity style={styles.action}>
                    <Entypo
                      name="cycle"
                      size={ICON_SIZE}
                      color={THEME.MAIN_CONTENT_COLOR}
                      style={[styles.icon, styles.icon_cycle]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action}>
                    <MaterialCommunityIcons
                      name="emoticon-happy-outline"
                      size={ICON_SIZE}
                      color={THEME.MAIN_CONTENT_COLOR}
                      style={[styles.icon, styles.icon_happy]}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </RNCamera>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  captureActions: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureActions_top: {
    top: 15,
    paddingHorizontal: 20,
  },
  captureActions_bottom: {
    bottom: 40,
    paddingHorizontal: 40,
  },
  icon: {
    shadowOpacity: 4,
    textShadowRadius: 6,
    textShadowOffset: {width: 0, height: 0},
    borderRadius: ICON_SIZE / 2,
  },
  icon_sun: {
    transform: [{rotate: '25deg'}],
  },
  icon_lightning: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderWidth: 1,
    borderColor: THEME.MAIN_CONTENT_COLOR,
  },
  icon_cycle: {
    transform: [{rotate: '50deg'}],
  },
  action: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  library: {
    width: ICON_SIZE - 2,
    height: ICON_SIZE - 2,
    borderWidth: 2,
    borderColor: THEME.MAIN_CONTENT_COLOR,
    borderRadius: 8,
  },
  snapContainer: {
    width: 90,
    height: 90,
    backgroundColor: THEME.SNAP_BACKGROUND,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  snap: {
    width: 60,
    height: 60,
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    borderRadius: 30,
  },
});
