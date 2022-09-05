import keyMirror from 'keymirror';
import {createAction} from 'redux-actions';

const ActionTypes = keyMirror({
  SET_VIEWPORT: null,
  SET_BASEMAP_STYLE_ID: null,
  SET_SELECTED_CONSELL_CATEGORIES: null,
  SET_SELECTED_CIUTADELLA_CATEGORIES: null,
  SET_DATE_RANGE_FILTER: null,
  SET_DATA_CONTEXT: null,
  SET_DATA_TOTAL: null,
  SET_EXPEDIENTS_CONSELL_VISIBLE: null,
  SET_EXPEDIENTS_CIUTADELLA_VISIBLE: null,
  SET_LOGGED_IN: null,
});

export default ActionTypes;

export const setViewport = createAction(ActionTypes.SET_VIEWPORT);
export const setBaseMapStyleId = createAction(ActionTypes.SET_BASEMAP_STYLE_ID);
export const setSelectedConsellCategories = createAction(ActionTypes.SET_SELECTED_CONSELL_CATEGORIES);
export const setSelectedCiutadellaCategories = createAction(ActionTypes.SET_SELECTED_CIUTADELLA_CATEGORIES);
export const setDateRangeFilter = createAction(ActionTypes.SET_DATE_RANGE_FILTER);
export const setDataContext = createAction(ActionTypes.SET_DATA_CONTEXT);
export const setDataTotal = createAction(ActionTypes.SET_DATA_TOTAL);
export const setExpedientsConsellVisible = createAction(ActionTypes.SET_EXPEDIENTS_CONSELL_VISIBLE);
export const setExpedientsCiutadellaVisible = createAction(ActionTypes.SET_EXPEDIENTS_CIUTADELLA_VISIBLE);
export const setLoggedIn = createAction(ActionTypes.SET_LOGGED_IN);
