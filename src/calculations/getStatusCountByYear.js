// ordena por 2 propiedad, primera string, segunda number
const sortByTwoProperties = (results, sort1, sort2) => {
  return results?.sort((a, b) => a[sort1].localeCompare(b[sort1]) || a[sort2] - b[sort2]);
};

export const getStatusCountByYear = (data) => {
  const newData = data.map(dat => ({status: dat.resolucio, year: dat.any}));
  const res = Object.values(newData.reduce((r, e) => {
    let k = `${e.status}|${e.year}`;
    if (e.status && e.year) {
      if (!r[k]) r[k] = {status: e.status, year: e.year, value: 1};
      else r[k].value += 1;
    }
    return r;
  }, {}));
  return sortByTwoProperties(res, 'status', 'year');
};