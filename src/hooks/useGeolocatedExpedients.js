import {useMemo} from 'react';
//import useFetch from '@geomatico/geocomponents/hooks/useFetch';
import testData from './../calculations/testData.json';
//import config from '../config.json';

const useGeolocatedExpedients = (visibleCategories, dateRange) => {

  //const url = 'http://ide.cime.es/indicadors/?accio=valor&variable=90';
  //const {data: allExpedients} = useFetch(url);
  const allExpedients = testData;

  const allVisibleCategoriesIds = Object.values(visibleCategories).flat();
  //Object.values(config.datasets).map(el => el.categories)[0].find(el => el.id === 'altres').values;
  const altresTipusExpdients = ['INU', 'LIA', 'LIC', 'NUH', 'PRCED', 'SAN'];

  /* const pepe = allExpedients?.valor.filter(el => altresTipusExpdients.includes(el.tipus)).map(el => ({...el, tipus: 'altres'}) );
  console.log('pepe', pepe)*/


  //console.log(111, altresTipusExpdients)
  const filteredExpedients = useMemo(() => {
    const res = allExpedients?.valor?.filter(el => {
      if( visibleCategories.consell.includes('altres')) {
        const cosa = allVisibleCategoriesIds.concat(altresTipusExpdients).includes(el.tipus);
        return cosa;
      } else {
        return allVisibleCategoriesIds.includes(el.tipus);
      }
    });

    const convertirenaltres = res.filter(el => altresTipusExpdients.includes(el.tipus)).map(el => ({...el, tipus: 'altres'}) );

    console.log(1111111111111, convertirenaltres)
    return convertirenaltres;
  }, [visibleCategories, allExpedients]);

  //console.log('filtered, expedients', filteredExpedients)


  return useMemo(() => {
    const result = filteredExpedients?.filter(el => {
      return el.exercici >= dateRange[0] && el.exercici <= dateRange[1];
    });

    const altres = result.filter(el => altresTipusExpdients.includes(el.tipus));

    console.log(1111, altres);
    console.log('result', result);
    return result;
  },
  [dateRange, filteredExpedients]);
}
;

export default useGeolocatedExpedients;
