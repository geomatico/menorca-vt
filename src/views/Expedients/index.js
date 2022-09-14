import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import useFetch from '@geomatico/geocomponents/hooks/useFetch';

import config from '../../config.json';
import API from '../../services/api';

import AllCharts from '../../components/AllCharts';
import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';

const maxDate = new Date().getFullYear();

const Expedients = ({onLogout}) => {
  const [mapStyle, setMapStyle] = useState(config.mapStyles[5].id);

  const [dateRange, setDateRange] = useState([config.minDate, maxDate]);

  const [isExpedientsConsellVisible, setExpedientsConsellVisible] = useState(true);
  const [selectedConsellCategories, setSelectedConsellCategories] = useState(config.consellCategories.map(({id}) => id));

  const [isExpedientsCiutadellaVisible, setExpedientsCiutadellaVisible] = useState(true);
  const [selectedCiutadellaCategories, setSelectedCiutadellaCategories] = useState(config.ciutadellaCategories.map(({id}) => id));


  const [stats, setStats] = useState({
    expedients: 0,
    typeCountByYear: [],
    resolutionStateCount: []
  });

  const [bbox, setBbox] = useState();

  // Query total expedients
  const {data: expedientsResponse} = useFetch(API.expedients(...dateRange));
  const [totalExpedients, setTotalExpedients] = useState(0);
  useEffect(() => {
    if (expedientsResponse) {
      setTotalExpedients(
        expedientsResponse
          ?.filter(({tipus}) => config.consellCategories.find(category => selectedConsellCategories.includes(category.id) && category.values.includes(tipus)))
          .reduce((data, {totals}) => data + parseInt(totals), 0)
      );
    }
  },[expedientsResponse]);

  // Query total vivendes
  const {data: vivendesResponse} = useFetch(bbox && API.vivendes(bbox));
  const [totalVivendes, setTotalVivendes] = useState({numberofdwellings: '0', numberofbuildingunits: '0'});
  useEffect(() => {
    if (vivendesResponse) {
      setTotalVivendes(vivendesResponse[0]);
    }
  }, [vivendesResponse]);


  const mapComponent = <ExpedientsMap
    /*
    mapStyle
    visibleCategories
    dateRange
    setRenderedFeatures
    setBBOX
    */
    setStats={setStats}
    mapStyle={mapStyle}
    onBBOXChanged={setBbox}
    isExpedientsConsellVisible={isExpedientsConsellVisible}
    selectedConsellCategories={selectedConsellCategories}
    isExpedientsCiutadellaVisible={isExpedientsCiutadellaVisible}
    selectedCiutadellaCategories={selectedCiutadellaCategories}
    dateRange={dateRange}
  />;

  const chartsComponent = <AllCharts
    /*
    visibleCategories
    dateRange
    renderedFeatures
    BBOX
    */
    stats={stats}
    totalViviendas={totalVivendes}
    totalExpedients={totalExpedients}
    isExpedientsConsellVisible={isExpedientsConsellVisible}
    selectedConsellCategories={selectedConsellCategories}
    isExpedientsCiutadellaVisible={isExpedientsCiutadellaVisible}
    selectedCiutadellaCategories={selectedCiutadellaCategories}
  />;

  return <>
    <ExpedientsRight
      setMapStyle={setMapStyle}
      setExpedientsConsellVisible={setExpedientsConsellVisible}
      setExpedientsCiutadellaVisible={setExpedientsCiutadellaVisible}
      setSelectedConsellCategories={setSelectedConsellCategories}
      setSelectedCiutadellaCategories={setSelectedCiutadellaCategories}
      setDateRange={setDateRange}
      dateRange={dateRange}
      isExpedientsCiutadellaVisible={isExpedientsCiutadellaVisible}
      isExpedientsConsellVisible={isExpedientsConsellVisible}
      mapStyle={mapStyle}
      maxDate={maxDate}
      selectedCiutadellaCategories={selectedCiutadellaCategories}
      selectedConsellCategories={selectedConsellCategories}
    />
    <ExpedientsLeft
      mapComponent={mapComponent}
      chartsComponent={chartsComponent}
      onLogout={onLogout}
    />
  </>;
};

Expedients.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Expedients;
