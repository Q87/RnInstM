// Hooks
import {useState, useCallback} from 'react';

/**
 * Switched options
 */
const SWITCHED_OPTIONS = [
  ['Save Original Photos', false],
  ['Vibrate for Notifications', false],
  ['Show Activity Status', false],
];

export const useOptions = () => {
  const [switchedOptions, setSwitchedOptions] = useState(
    new Map(SWITCHED_OPTIONS),
  );

  /**
   * Toggle switch
   */
  const toggleSwitch = useCallback(
    (type, value) => {
      setSwitchedOptions(new Map(switchedOptions.set(type, !value)));
    },
    [switchedOptions],
  );

  return {switchedOptions, toggleSwitch};
};
