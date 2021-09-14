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
  isExpedientsConsellVisible: true,
  isExpedientsCiutadellaVisible: true,
  selectedConsellCategories: config.consellCategories.map(({id}) => id),
  selectedCiutadellaCategories: config.ciutadellaCategories.map(({id}) => id),
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
  },
  isLoggedIn: false
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

const updateSelectedConsellCategories = (state, action) => ({
  ...state,
  selectedConsellCategories: action.payload
});

const updateSelectedCiutadellaCategories = (state, action) => ({
  ...state,
  selectedCiutadellaCategories: action.payload
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

const setExpedientsConsellVisible = (state, action) => ({
  ...state,
  isExpedientsConsellVisible: action.payload
});

const setExpedientsCiutadellaVisible = (state, action) => ({
  ...state,
  isExpedientsCiutadellaVisible: action.payload
});

const updateLoggedIn = (state, action) => ({
  ...state,
  isLoggedIn: action.payload
});

const reducer = handleActions({
  [ActionTypes.SET_VIEWPORT]: updateViewport,
  [ActionTypes.SET_BASEMAP_STYLE_URL]: updateBaseMapStyleUrl,
  [ActionTypes.SET_SELECTED_CONSELL_CATEGORIES]: updateSelectedConsellCategories,
  [ActionTypes.SET_SELECTED_CIUTADELLA_CATEGORIES]: updateSelectedCiutadellaCategories,
  [ActionTypes.SET_DATE_RANGE_FILTER]: updateDateRange,
  [ActionTypes.SET_DATA_CONTEXT]: updateDataContext,
  [ActionTypes.SET_DATA_TOTAL]: updateDataTotal,
  [ActionTypes.SET_EXPEDIENTS_CONSELL_VISIBLE]: setExpedientsConsellVisible,
  [ActionTypes.SET_EXPEDIENTS_CIUTADELLA_VISIBLE]: setExpedientsCiutadellaVisible,
  [ActionTypes.SET_LOGGED_IN]: updateLoggedIn,
}, initialState);

export default reducer;
