export const getTypeCountByStartDate = (data) => {
  const filteredData = data
    .map(dat => ({tipus: dat.tipus, data_inici: new Date(dat.data_inici).getFullYear()}))
    .filter(el => el.data_inici);

  return Object.values(filteredData.reduce((r, e) => {
    let k = `${e.tipus}|${e.data_inici}`;
    if (e.data_inici) {
      if (!r[k]) r[k] = {type: e.tipus, date: e.data_inici, value: 1};
      else r[k].value += 1;
    }
    return r;
  }, {}));
};