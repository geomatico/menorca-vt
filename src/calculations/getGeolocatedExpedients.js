export const getGeolocatedExpedients = (data) => {

  if (!data) return;

  return Object.values(data.reduce((r, e) => {
    const tipus = e.tipus;
    if (tipus) {
      if (!r[tipus]) {
        r[tipus] = {
          type: tipus,
          geolocalizados: e.nombre_expedients_ubicats,
          noGeolocalizados: parseInt(e.nombre_expedients) - e.nombre_expedients_ubicats,
          total: parseInt(e.nombre_expedients)
        };
      } else {
        r[tipus].geolocalizados += e.nombre_expedients_ubicats;
        r[tipus].noGeolocalizados += parseInt(e.nombre_expedients) - e.nombre_expedients_ubicats;
        r[tipus].total += parseInt(e.nombre_expedients);
      }
    }
    return r;
  }, {})).flatMap(el => {
    return [
      {
        type: el.type,
        label: 'Sí',
        value: el.geolocalizados
      },
      {
        type: el.type,
        label: 'No',
        value: el.noGeolocalizados
      },
    ];
  });
};