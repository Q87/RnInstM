import {useState} from 'react';
import useTimeout from '@rooks/use-timeout';

import {useSelector, useDispatch} from 'react-redux';
import {startSearching} from '../../../../store/actions/post';

export const useSearchResults = (buttons) => {
  const [search, setSearch] = useState('');
  const [prevSearch, setPrevSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const searchResults = useSelector((state) => state.post.searchResults);
  const dispatch = useDispatch();

  /**
   * Initialize timer
   */
  const {start, clear, isActive} = useTimeout(async () => {
    try {
      setPrevSearch(search);
      setFrom(1);
      setIsEnd(await dispatch(startSearching(buttons[selectedIndex], search)));
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, 900);

  /**
   * Start a timer
   */
  const startTimer = (text, didTabSwitch = false) => {
    // If the search bar isn't empty and it has changed or a tab has toggled
    if (text.trim() && (prevSearch !== text || didTabSwitch)) {
      setLoading(true);
      setError(null);

      // If the previous timer is running
      if (isActive) {
        clear();
      }

      start();
    }
  };

  /**
   * Start a text search
   */
  const onChangeTextHandler = (text) => {
    setSearch(text);
    startTimer(text);
  };

  /**
   * Toggle a tab
   */
  const onPressHandler = (index) => {
    setSelectedIndex(index);
    startTimer(search, true);
  };

  /**
   * Load the next batch of results
   */
  const loadMore = async () => {
    setLoadingMore(true);
    setIsEnd(
      await dispatch(startSearching(buttons[selectedIndex], search, from)),
    );
    setFrom(from + 1);
    setLoadingMore(false);
  };

  return {
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
  };
};
