import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';
import SidePanelContent from '../../components/SidePanelContent';

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
  const [manager, setManager] = useState('quality');

  const handleActionChange = (actionId) => setManager(actionId);

  const sidePanelContent = <SidePanelContent
    manager={manager}
    mapStyle={mapStyle}
    visibleCategories={visibleCategories}
    dateRange={dateRange}
    onBBOXChanged={setBBOX}
    BBOX={BBOX}
  />;

  const mapComponent = <ExpedientsMap
    mapStyle={mapStyle}
    visibleCategories={visibleCategories}
    dateRange={dateRange}
    onBBOXChanged={setBBOX}
  />;

  return <>
    <ExpedientsRight
      mapStyle={mapStyle}
      onMapStyleChanged={setMapStyle}
      visibleCategories={visibleCategories}
      onVisibleCategoriesChanged={setVisibleCategories}
      dateRange={dateRange}
      onDateRangeChanged={setDateRange}
    />
    <ExpedientsLeft
      mapComponent={mapComponent}
      onLogout={onLogout}
      sidePanelContent={sidePanelContent}
      onActionClick={handleActionChange}
      selectedActionId={manager}
    />
  </>;
};

Expedients.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default Expedients;
