import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import AllCharts from '../../components/AllCharts';
import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';

const maxDate = new Date().getFullYear();

const Expedients = ({onLogout}) => {
  const [mapStyle, setMapStyle] = useState(config.mapStyles[5].id);
  const [dateRange, setDateRange] = useState([config.minDate, maxDate]);
  const [visibleCategories, setVisibleCategories] = useState({
    ciutadella: [],
    consell: []
  }); // TODO initialize properly
  const [renderedFeatures, setRenderedFeatures] = useState([]);
  const [BBOX, setBBOX] = useState();

  const mapComponent = <ExpedientsMap
    mapStyle={mapStyle}
    dateRange={dateRange}
    visibleCategories={visibleCategories}
    onRenderedFeaturesChanged={setRenderedFeatures}
    onBBOXChanged={setBBOX}
  />;

  const chartsComponent = <AllCharts
    dateRange={dateRange}
    BBOX={BBOX}
    visibleCategories={visibleCategories}
    renderedFeatures={renderedFeatures}
  />;

  return <>
    <ExpedientsRight
      mapStyle={mapStyle}
      onMapStyleChanged={setMapStyle}
      dateRange={dateRange}
      onDateRangeChanged={setDateRange}
      visibleCategories={visibleCategories}
      onVisibleCategoriesChanged={setVisibleCategories}
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
