export const getTypeCountByStartDate = (data, filterBy) => {
  if(!data) return;

  const filteredData = data
    .map(dat => (
      {tipus: dat.tipus,
        data_inici: filterBy === 'year'
          ? new Date(dat.data_inici).getFullYear()
          : new Date(dat.data_inici).getMonth()
      }))
    .filter(el => el.data_inici);

  return Object.values(filteredData.reduce((r, e) => {
    let k = `${e.tipus}|${e.data_inici}`;
    if (e.data_inici) {
      if (!r[k]) r[k] = {type: e.tipus, date: e.data_inici, value: 1};
      else r[k].value += 1;
    }
    return r;
  }, {})).sort((a,b) => a.date - b.date);
};