import {useEffect, useState} from 'react';

import useFetch from '@geomatico/geocomponents/hooks/useFetch';

import config from '../config.json';

const useTotalExpedients = (dateRange, visibleCategories) => {
  const [totalExpedients, setTotalExpedients] = useState(0);

  const [anyMin, anyMax] = dateRange;
  const url = `${config.services.search}?accio=totalsExpedientsAnys&layer=or007exp_expedients&anymin=${anyMin}&anymax=${anyMax}`;
  const {data: expedientsResponse} = useFetch(url);

  useEffect(() => {
    if (expedientsResponse) {
      setTotalExpedients(
        expedientsResponse
          ?.filter(({tipus}) => config.datasets.consell.categories.find(category => visibleCategories.consell.includes(category.id) && category.values.includes(tipus)))
          .reduce((data, {totals}) => data + parseInt(totals), 0)
      );
    }
  }, [expedientsResponse]);

  return totalExpedients;
};

export default useTotalExpedients;
