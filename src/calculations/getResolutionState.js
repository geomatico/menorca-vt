export const getResolutionState = (data) => {
  return Object.values(data.reduce((r, e) => {
    const resolucio = e.resolucio;
    if (resolucio) {
      if (!r[resolucio]) {
        r[resolucio] = {label: resolucio, value: 1};
      } else {
        r[resolucio].value += 1;
      }
    }
    return r;
  }, {}));
};