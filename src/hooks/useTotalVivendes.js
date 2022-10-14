import {useEffect, useState} from 'react';

import useFetch from '@geomatico/geocomponents/hooks/useFetch';

import config from '../config.json';

const useTotalVivendes = (BBOX) => {
  const [totalVivendes, setTotalVivendes] = useState({
    numberofdwellings: 0,
    numberofbuildingunits: 0
  });

  const url = `${config.services.search}?accio=totalsVivendesLocalsBBOX&bbox=${BBOX?.join(',')}`;
  const {data: vivendesResponse} = useFetch(url);

  useEffect(() => {
    if (vivendesResponse) {
      setTotalVivendes({
        numberofdwellings: parseInt(vivendesResponse[0].numberofdwellings),
        numberofbuildingunits: parseInt(vivendesResponse[0].numberofbuildingunits)
      });
    }
  }, [vivendesResponse]);

  return totalVivendes;
};

export default useTotalVivendes;
