import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import Indicators from '../../components/Indicators';
import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';

const maxDate = new Date().getFullYear();

const Expedients = ({onLogout}) => {
  const [isAggregateData, setIsAggregateData] = useState(true);
  const [radius, setRadius] = useState(100);
  const [mapStyle, setMapStyle] = useState(config.mapStyles[5].id);
  const [dateRange, setDateRange] = useState([config.minDate, maxDate]);
  const [visibleCategories, setVisibleCategories] = useState(
    Object.entries(config.datasets).reduce((obj, [datasetId, {categories}]) => ({
      ...obj,
      [datasetId]: categories.map(category => category.id)
    }), {})
  );
  const [BBOX, setBBOX] = useState();

  const indicatorsComponent = <Indicators
    visibleCategories={visibleCategories}
    dateRange={dateRange}
    BBOX={BBOX}
  />;

  const mapComponent = <ExpedientsMap
    mapStyle={mapStyle}
    visibleCategories={visibleCategories}
    dateRange={dateRange}
    onBBOXChanged={setBBOX}
    isAggregateData={isAggregateData}
    radius={radius}
  />;

  return <>
    <ExpedientsRight
      mapStyle={mapStyle}
      onMapStyleChanged={setMapStyle}
      visibleCategories={visibleCategories}
      onVisibleCategoriesChanged={setVisibleCategories}
      dateRange={dateRange}
      onDateRangeChanged={setDateRange}
      onAggregateDataChange={setIsAggregateData}
      isAggregateData={isAggregateData}
      radius={radius}
      onRadiusChange={setRadius}
    />
    <ExpedientsLeft
      mapComponent={mapComponent}
      indicatorsComponent={indicatorsComponent}
      onLogout={onLogout}
    />
  </>;
};

Expedients.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Expedients;
