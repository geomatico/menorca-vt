const days_between = (date1, date2) => {
  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;
  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(new Date(date1) - new Date(date2));
  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);
};

export const getAverageProcessingTimeByType = (data) => {
  // limpia las fixtures de datos corruptos

  const filteredData = Object.values(data)
    .filter(el => el.data_inici && el.data_fi)
    .map(fix => ({type: fix.tipus, daysDiff: days_between(fix.data_inici, fix.data_fi)}));

  return Object.values(filteredData
    .reduce((r, e) => {
      let k = `${e.type}`;
      if (e.type) {
        if (!r[k]) r[k] = {type: e.type, value: e.daysDiff, count: 1};
        else {
          r[k].value += e.daysDiff;
          r[k].count += 1;
        }
      }
      return r;
    }, {}))
    .map(el => ({
      type: el.type,
      value: Math.trunc(el.value / el.count)
    }));
};