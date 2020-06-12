import {
  Brightness,
  Contrast,
  Grayscale,
  Predator,
} from 'react-native-image-filter-kit';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Filter types
const FILTER_TYPES = {
  Brightness: {
    name: 'Brightness',
    type: Brightness,
    props: {
      amount: 5,
    },
    minimumValue: 0,
    maximumValue: 10,
    icon: {
      type: Feather,
      name: 'sun',
    },
  },
  Contrast: {
    name: 'Contrast',
    type: Contrast,
    props: {
      amount: 0,
    },
    minimumValue: -10,
    maximumValue: 10,
    icon: {
      type: MaterialCommunityIcons,
      name: 'circle-slice-4',
    },
  },
  Grayscale: {
    name: 'Grayscale',
    type: Grayscale,
    props: {
      amount: 0.5,
    },
    minimumValue: 0,
    maximumValue: 1,
    icon: {
      type: Feather,
      name: 'triangle',
    },
  },
  Predator: {
    name: 'Predator',
    type: Predator,
    props: {
      amount: 0.5,
    },
    minimumValue: 0,
    maximumValue: 1,
    icon: {
      type: Feather,
      name: 'target',
    },
  },
};

// Initial state
export const initialState = {
  filterTypes: FILTER_TYPES,
  editableValue: 0.5,
  editableMinimumValue: 0,
  editableMaximumValue: 1,
  currentFilter: null,
  appliedFilters: [],
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_EDIT_TYPE':
      const {editType} = action;
      const {
        props: {amount},
        minimumValue,
        maximumValue,
      } = state.filterTypes[editType];

      return {
        ...state,
        currentFilter: editType,
        appliedFilters: [...new Set([...state.appliedFilters, editType])],
        editableValue: amount,
        editableMinimumValue: minimumValue,
        editableMaximumValue: maximumValue,
      };

    case 'UPDATE_FILTER_DATA':
      const updated = state.filterTypes[state.currentFilter];
      updated.props.amount = action.value;

      return {
        ...state,
        filterTypes: {
          ...state.filterTypes,
          [state.currentFilter]: updated,
        },
      };

    case 'REMOVE_FILTER':
      return {
        ...state,
        appliedFilters: state.appliedFilters.filter(
          filter => state.currentFilter !== filter,
        ),
        currentFilter: null,
      };

    case 'HIDE_FILTER_SETTING':
      return {
        ...state,
        currentFilter: null,
      };

    default:
      return state;
  }
};
