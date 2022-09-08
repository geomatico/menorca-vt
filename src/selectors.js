import { createSelector } from 'reselect';

import config from './config.json';

export const getViewport = (state) => state.app.viewport;
export const getSelectedBaseMapStyleId = (state) => state.app.baseMapStyleId;
export const getExpedientsConsellVisible = (state) => state.app.isExpedientsConsellVisible;
export const getExpedientsCiutadellaVisible = (state) => state.app.isExpedientsCiutadellaVisible;
export const getSelectedConsellCategories = (state) => state.app.selectedConsellCategories;
export const getSelectedCiutadellaCategories = (state) => state.app.selectedCiutadellaCategories;
export const getDateRangeFilter = (state) => state.app.dateRange;
export const getData = (state) => state.app.data;
export const getExpedientsConsellByType = (state) => getData(state).total.expedientsByType;
export const getTotalExpedients = createSelector(
  [getExpedientsConsellByType, getSelectedConsellCategories],
  (numExpedientsConsellByType, selectedConsellCategories) =>
    numExpedientsConsellByType
      .filter(({tipus}) => config.consellCategories.find(category => selectedConsellCategories.includes(category.id) && category.values.includes(tipus)))
      .reduce((data, {totals}) => {
        return data + parseInt(totals);
      }, 0)
);
export const getLoggedIn = (state) => state.app.isLoggedIn;
