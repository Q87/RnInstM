import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {THEME} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
import {useSearchResults} from './hooks/useSearchResults';
import {SEARCH_RESULTS_QTY} from '../../constants';

import {SearchBar, ButtonGroup} from 'react-native-elements';
import {ProfileImage} from '../../components/ProfileImage';

// Tab list
const BUTTONS = ['Top', 'People', 'Tags', 'Places'];

/**
 * Show search screen
 */
export const SearchScreen = ({navigation}) => {
  const {
    search,
    selectedIndex,
    loading,
    loadingMore,
    error,
    searchResults,
    onChangeTextHandler,
    onPressHandler,
    loadMore,
    isEnd,
  } = useSearchResults(BUTTONS);

  /**
   * Show the following information
   */
  const followingInfoJSX = ({following, followed}) => {
    // Following status
    let status = '';

    if (following) {
      status = 'Following';
    } else if (followed.length) {
      status = `Followed by ${followed[0]}...`;
    }

    // If the following status exists
    if (status) {
      return (
        <>
          <Text style={styles.user__separator}> &#10625; </Text>
          <Text style={styles.user__status}>{status}</Text>
        </>
      );
    }

    return null;
  };

  /**
   * Go to the user profile screen
   */
  const showProfile = (username) => {
    navigation.navigate('ProfileToFollowScreen', {
      username,
    });
  };

  /**
   * Show results for the 'People' filter
   */
  const peopleJSX = ({url, username, name, followed, following}) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => showProfile(username)}>
      <View style={styles.result}>
        <View>
          <ProfileImage
            url={url}
            start="transparent"
            end="transparent"
            iconSize={32}
            iconColor={THEME.ICON_COLOR}
            backgroundColor={THEME.MAIN_CONTENT_COLOR}
            imageBorderColor={THEME.DIMMING_ICON_BACKGROUND}
            imageSize={50}
          />
        </View>

        <View style={styles.user}>
          <Text style={styles.user__login}>{username}</Text>
          <Text>
            <Text style={styles.user__name}>{name}</Text>
            {followingInfoJSX({
              following,
              followed,
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Show results for the 'Tags' filter
   */
  const tagsJSX = ({hashtag, qty}) => (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={styles.result}>
        <View>
          <ProfileImage
            start="transparent"
            end="transparent"
            Icon={Feather}
            iconName="hash"
            iconSize={32}
            iconColor={THEME.ICON_COLOR}
            backgroundColor={THEME.MAIN_CONTENT_COLOR}
            imageBorderColor={THEME.DIMMING_ICON_BACKGROUND}
            imageSize={50}
          />
        </View>

        <View style={styles.user}>
          <Text style={styles.user__login}>{hashtag}</Text>
          <Text>
            <Text style={styles.user__name}>{qty.toLocaleString()} posts</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Show results for the 'Places' filter
   */
  const placesJSX = ({place, qty}) => (
    <TouchableOpacity activeOpacity={0.6}>
      <View style={styles.result}>
        <View>
          <ProfileImage
            start="transparent"
            end="transparent"
            Icon={Feather}
            iconName="map-pin"
            iconSize={32}
            iconColor={THEME.ICON_COLOR}
            backgroundColor={THEME.MAIN_CONTENT_COLOR}
            imageBorderColor={THEME.DIMMING_ICON_BACKGROUND}
            imageSize={50}
          />
        </View>

        <View style={styles.user}>
          <Text style={styles.user__login}>{place}</Text>
          <Text>
            <Text style={styles.user__name}>{qty.toLocaleString()} posts</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  /**
   * Show search results
   */
  const renderSearchResults = (searchResult) => {
    const keys = Object.keys(searchResult);

    if (keys.includes('username')) {
      return peopleJSX(searchResult);
    } else if (keys.includes('hashtag')) {
      return tagsJSX(searchResult);
    } else if (keys.includes('place')) {
      return placesJSX(searchResult);
    }
  };

  /**
   * Show footer
   */
  const renderFooter = () => {
    // If the next batch of search results isn't loaded
    if (!loadingMore) {
      return null;
    }

    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator color={THEME.ICON_COLOR} size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <SearchBar
        placeholder="Search"
        value={search}
        onChangeText={onChangeTextHandler}
        showCancel={true}
        platform={Platform.OS}
        containerStyle={styles.searchBar__containerStyle}
        inputContainerStyle={styles.searchBar__inputContainerStyle}
        inputStyle={styles.searchBar__inputStyle}
        leftIconContainerStyle={styles.searchBar__leftIconContainerStyle}
        rightIconContainerStyle={styles.searchBar__rightIconContainerStyle}
      />

      <ButtonGroup
        onPress={onPressHandler}
        selectedIndex={selectedIndex}
        buttons={BUTTONS}
        innerBorderStyle={styles.buttonGroup__innerBorderStyle}
        containerStyle={styles.buttonGroup__containerStyle}
        selectedButtonStyle={styles.buttonGroup__selectedButtonStyle}
        selectedTextStyle={styles.buttonGroup__selectedTextStyle}
        textStyle={styles.buttonGroup__textStyle}
      />

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator color={THEME.ICON_COLOR} />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text>something went wrong</Text>
        </View>
      )}

      {!loading && !error && search.trim().length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={({item}) => renderSearchResults(item)}
          keyExtractor={({username, hashtag, place}) =>
            username || hashtag || place
          }
          onEndReached={isEnd ? null : loadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={SEARCH_RESULTS_QTY}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: THEME.MAIN_CONTENT_COLOR,
    flex: 1,
  },
  searchBar__containerStyle: {
    backgroundColor: THEME.SEPARATOR_COLOR,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  searchBar__inputContainerStyle: {
    height: 28,
  },
  searchBar__inputStyle: {
    paddingVertical: 0,
    fontSize: 16,
  },
  searchBar__leftIconContainerStyle: {
    transform: [{scale: 0.8}],
  },
  searchBar__rightIconContainerStyle: {
    transform: [{scale: 0.8}],
  },

  buttonGroup__innerBorderStyle: {
    width: 0,
  },
  buttonGroup__containerStyle: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginHorizontal: 0,
    overflow: 'visible',
    marginTop: 10,
    height: 46,
  },
  buttonGroup__selectedButtonStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    marginBottom: -1,
  },
  buttonGroup__selectedTextStyle: {
    color: THEME.ICON_COLOR,
  },
  buttonGroup__textStyle: {
    fontWeight: '700',
    color: THEME.USER_INFO_COLOR,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMore: {
    width: '100%',
    height: 50,
  },

  result: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  result_next: {
    marginTop: 8,
  },

  user: {
    paddingLeft: 10,
  },
  user__login: {
    fontSize: 16,
    fontWeight: '600',
  },
  user__name: {
    fontSize: 15,
    color: THEME.USER_INFO_COLOR,
  },
  user__separator: {
    color: THEME.USER_INFO_COLOR,
  },
  user__status: {
    fontSize: 15,
    color: THEME.USER_INFO_COLOR,
  },
});
