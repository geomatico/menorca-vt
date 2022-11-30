import {useEffect, useState} from 'react';
import {singletonHook} from 'react-singleton-hook';
import config from '../config.json';

const username = localStorage.getItem('menorca.expedients.user');
const password = localStorage.getItem('menorca.expedients.password');
const options = {
  method:'GET',
  headers: {
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
  }
};

const INITIAL_STATE = undefined;

const datasetIds = Object.keys(config.datasets);

const useExpedients = () => {
  const [datasets, setDatasets] = useState(INITIAL_STATE);

  useEffect(() => {
    const promises = datasetIds.map(datasetId => {
      const {sourceLayers} = config.datasets[datasetId];
      const url = config.services.wfs
        .replace('{typeName}', sourceLayers)
        .concat('&propertyName=')
        .concat('(tipus,resolucio,any,the_geom,data_inici,data_fi)'.repeat(sourceLayers.length));
      return fetch(url, options).then(response => response.json());
    });
    Promise.all(promises).then(responses => {
      const fullDatasets = responses.reduce((acc, response, i) => {
        acc[datasetIds[i]] = response;
        return acc;
      }, {});
      setDatasets(fullDatasets);
    });
  }, []);

  return datasets;
};

export default singletonHook(INITIAL_STATE, useExpedients);
