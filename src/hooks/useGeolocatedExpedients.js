import {useMemo} from 'react';
import useFetch from '@geomatico/geocomponents/hooks/useFetch';

const useGeolocatedExpedients = (visibleCategories, dateRange) => {

  const url = 'http://ide.cime.es/indicadors/?accio=valor&variable=90';
  const {data: allExpedients} = useFetch(url);

  const allVisibleCategoriesIds = Object.values(visibleCategories).flat();

  //const altresTipusExpdients = Object.values(config.datasets).map(el => el.categories)[0].find(el => el.id === 'altres').values;
  /*  console.log(333, altresTipusExpdients, '----');

  /!*  const filteredExpedients = useMemo(()=> allExpedients?.valor?.filter(el => allVisibleCategoriesIds.includes(el.tipus)) );
    }, [allExpedients?.valor])*!/*/

  return useMemo(() => allExpedients?.valor?.filter(el => {
    /*    if(visibleCategories.consell.includes('Altres')) {
            console.log('hola')
          }*/
    return allVisibleCategoriesIds.includes(el.tipus) && el.exercici >= dateRange[0] && el.exercici <= dateRange[1];
  }),
  [visibleCategories, dateRange, allExpedients]);
};

export default useGeolocatedExpedients;
