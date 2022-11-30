import {useMemo} from 'react';
import useFetch from '@geomatico/geocomponents/hooks/useFetch';

const useGeolocatedExpedients = (visibleCategories, dateRange) => {

  const url = 'http://ide.cime.es/indicadors/?accio=valor&variable=90';
  const {data: allExpedients} = useFetch(url);

  const allVisibleCategoriesIds = Object.values(visibleCategories).flat();

  return useMemo(() => allExpedients?.valor?.filter(el => {
    return allVisibleCategoriesIds.includes(el.tipus) && el.exercici >= dateRange[0] && el.exercici <= dateRange[1];
  }),
  [visibleCategories, dateRange, allExpedients]);
};

export default useGeolocatedExpedients;
