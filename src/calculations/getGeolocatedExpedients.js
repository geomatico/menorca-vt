export const getGeolocatedExpedients = (data) => {
  return Object.values(data.reduce((r, e) => {
    const tipus = e.tipus;
    if (tipus) {
      if (!r[tipus]) {
        r[tipus] = {type: tipus, label: 'Geolocalizados', value: 1};
      } else {
        r[tipus].value += 1;
      }
    }
    return r;
  }, {}));
};