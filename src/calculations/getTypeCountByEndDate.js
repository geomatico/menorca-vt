export const getTypeCountByEndDate = (data, filterBy) => {
  if (!data) return;

  const filteredData = data
    .map(dat => {
      if (dat.data_fi) {
        return {
          tipus: dat.tipus,
          data_fi: filterBy === 'year'
            ? new Date(dat.data_fi).getFullYear()
            : new Date(dat.data_fi).getMonth() + 1 // porque el test cuenta los meses del 1 al 12
        };
      }
    })
    .filter(el => el?.data_fi);

  const results = Object.values(filteredData.reduce((r, e) => {
    let k = `${e.tipus}|${e.data_fi}`;
    if (e.tipus && e.data_fi) {
      if (!r[k]) r[k] = {type: e.tipus, date: e.data_fi, value: 1};
      else r[k].value += 1;
    }
    return r;
  }, {})).sort((a,b) => a.date - b.date);

  return results;
};