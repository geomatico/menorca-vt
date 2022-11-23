export const getTypeCountByEndDate = (data) => {
  const newData = data.map(dat => ({tipus: dat.tipus, data_fi: new Date(dat.data_fi).getFullYear()}));

  return Object.values(newData.reduce((r, e) => {
    let k = `${e.tipus}|${e.data_fi}`;
    if (e.tipus && e.data_fi) {
      if (!r[k]) r[k] = {type: e.tipus, date: e.data_fi, value: 1};
      else r[k].value += 1;
    }
    return r;
  }, {}));
};