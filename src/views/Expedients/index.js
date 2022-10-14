import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import Indicators from '../../components/Indicators';
import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';

const maxDate = new Date().getFullYear();

const Expedients = ({onLogout}) => {
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
    dateRange={dateRange}
    BBOX={BBOX}
    visibleCategories={visibleCategories}
  />;

  const mapComponent = <ExpedientsMap
    mapStyle={mapStyle}
    dateRange={dateRange}
    visibleCategories={visibleCategories}
    onBBOXChanged={setBBOX}
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
      indicatorsComponent={indicatorsComponent}
      onLogout={onLogout}
    />
  </>;
};

Expedients.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Expedients;
