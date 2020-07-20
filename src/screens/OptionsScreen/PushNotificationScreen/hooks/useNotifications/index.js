// Hooks
import {useState, useCallback} from 'react';

// Selected options
const SELECTED_OPTIONS = [
  ['Likes', 'From Everyone'],
  ['Comments', 'From Everyone'],
  ['Comment Likes', 'From People I Follow'],
];

export const useNotifications = () => {
  const [settings, setSettings] = useState(new Map(SELECTED_OPTIONS));

  /**
   * Change selection
   */
  const changeSelection = useCallback(
    (type, value) => {
      setSettings(new Map(settings.set(type, value)));
    },
    [settings],
  );

  return {settings, changeSelection};
};
