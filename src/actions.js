import keyMirror from 'keymirror';
import {createAction} from 'redux-actions';

const ActionTypes = keyMirror({
  SET_VIEWPORT: null,
  SET_BASEMAP_STYLE_URL: null,
  SET_SELECTED_CATEGORIES: null,
  SET_DATE_RANGE_FILTER: null,
  SET_DATA_CONTEXT: null,
  SET_DATA_TOTAL: null,
  SET_EXPEDIENTS_VISIBLE: null,
});

export default ActionTypes;

export const setViewport = createAction(ActionTypes.SET_VIEWPORT);
export const setBaseMapStyleUrl = createAction(ActionTypes.SET_BASEMAP_STYLE_URL);
export const setSelectedCategories = createAction(ActionTypes.SET_SELECTED_CATEGORIES);
export const setDateRangeFilter = createAction(ActionTypes.SET_DATE_RANGE_FILTER);
export const setDataContext = createAction(ActionTypes.SET_DATA_CONTEXT);
export const setDataTotal = createAction(ActionTypes.SET_DATA_TOTAL);
export const setExpedientsVisible = createAction(ActionTypes.SET_EXPEDIENTS_VISIBLE);
