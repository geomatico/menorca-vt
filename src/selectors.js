import { createSelector } from 'reselect';

import config from './config.json';

const mainExpedientsTipus = config
  .categories
  .filter(({id}) => id !== 'altres')
  .map(({id}) => id);
const altresExpedientsTipus = config
  .categories
  .find(({id}) => id === 'altres').values;

export const getViewport = (state) => state.app.viewport;
export const getSelectedBaseMapStyleUrl = (state) => state.app.baseMapStyleUrl;
export const getSelectedCategories = (state) => state.app.selectedCategories;
export const getDateRangeFilter = (state) => state.app.dateRange;
export const getData = (state) => state.app.data;
export const getExpedientsByType = (state) => getData(state).total.expedientsByType;
export const getTotalExpedients = createSelector(
  [getExpedientsByType, getSelectedCategories],
  (expedientsByType, selectedCategories) => expedientsByType
    .filter(({tipus}) => mainExpedientsTipus.includes(tipus) ? selectedCategories.includes(tipus) :
      altresExpedientsTipus.includes(tipus) ? selectedCategories.includes('altres') : false)
    .reduce((data, {totals}) => {
      return data + parseInt(totals);
    }, 0)
);
