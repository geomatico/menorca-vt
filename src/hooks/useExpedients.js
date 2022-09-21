import useFetch from '@geomatico/geocomponents/hooks/useFetch';

import config from '../config.json';

const useExpedients = (datasetId) => {
  const username = localStorage.getItem('menorca.expedients.user');
  const password = localStorage.getItem('menorca.expedients.password');
  const options = {
    method:'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`)
    }
  };
  const {sourceLayers} = config.datasets[datasetId];
  const url = config.services.wfs
    .replace('{typeName}', sourceLayers)
    .concat('&propertyName=')
    .concat('(tipus,resolucio,any,the_geom)'.repeat(sourceLayers.length));
  const {data: expedients} = useFetch(url, options);
  return expedients;
};

export default useExpedients;
