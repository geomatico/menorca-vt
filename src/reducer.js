import {handleActions} from 'redux-actions';

import config from './config.json';
import ActionTypes from './actions';

export const initialState = {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    ...config.initialViewport
  },
  baseMapStyleUrl: config.mapStyles[5].url,
  selectedCategories: config.categories.map(({id}) => id),
  previousSelectedCategories: [],
  dateRange: [config.minDate, new Date().getFullYear()],
  data: {
    context: {
      expedients: 0,
      typeCountByYear: [],
      resolutionStateCount: [],
      numberofdwellings: 0,
      numberofbuildingunits: 0
    },
    total: {
      expedientsByType: []
    }
  }
};

const updateViewport = (state, action) => ({
  ...state,
  viewport: {
    ...state.viewport,
    ...action.payload
  }
});

const updateBaseMapStyleUrl = (state, action) => ({
  ...state,
  baseMapStyleUrl: action.payload
});

const updateSelectedCategories = (state, action) => ({
  ...state,
  selectedCategories: action.payload
});

const updateDateRange = (state, action) => ({
  ...state,
  dateRange: action.payload
});

const updateDataContext = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    context: {
      ...state.data.context,
      ...action.payload
    }
  }
});

const updateDataTotal = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    total: {
      ...state.data.total,
      ...action.payload
    }
  }
});

const updateControlCategories = (state, action) => ({
  ...state,
  selectedCategories: action.payload ? state.previousSelectedCategories : [],
  previousSelectedCategories: !action.payload && state.selectedCategories
});

const reducer = handleActions({
  [ActionTypes.SET_VIEWPORT]: updateViewport,
  [ActionTypes.SET_BASEMAP_STYLE_URL]: updateBaseMapStyleUrl,
  [ActionTypes.SET_SELECTED_CATEGORIES]: updateSelectedCategories,
  [ActionTypes.SET_DATE_RANGE_FILTER]: updateDateRange,
  [ActionTypes.SET_DATA_CONTEXT]: updateDataContext,
  [ActionTypes.SET_DATA_TOTAL]: updateDataTotal,
  [ActionTypes.SET_CONTROL_CATEGORIES]: updateControlCategories,
}, initialState);

export default reducer;
