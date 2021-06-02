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
  dateRange: [config.minDate, new Date().getFullYear()],
  data: {
    context: {
      expedients: 0,
      typeCountByYear: [],
      resolutionStateCount: []
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
    context: action.payload
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

const reducer = handleActions({
  [ActionTypes.SET_VIEWPORT]: updateViewport,
  [ActionTypes.SET_BASEMAP_STYLE_URL]: updateBaseMapStyleUrl,
  [ActionTypes.SET_SELECTED_CATEGORIES]: updateSelectedCategories,
  [ActionTypes.SET_DATE_RANGE_FILTER]: updateDateRange,
  [ActionTypes.SET_DATA_CONTEXT]: updateDataContext,
  [ActionTypes.SET_DATA_TOTAL]: updateDataTotal,
}, initialState);

export default reducer;
