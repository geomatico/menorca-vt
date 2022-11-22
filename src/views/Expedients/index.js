import React, {useState} from 'react';
import PropTypes from 'prop-types';

import config from '../../config.json';

import ExpedientsMap from './ExpedientsMap';
import ExpedientsRight from './ExpedientsRight';
import ExpedientsLeft from './ExpedientsLeft';
import SidePanelContent from '../../components/SidePanelContent';

const expectedState = [
  {
    label: 'Sense resolució',
    value: 10
  },
  {
    label: 'Concedit',
    value: 10
  },
  {
    label: 'Desistit',
    value: 1
  },
  {
    label: 'Denegat',
    value: 2
  }
];

import fixture from '../../../fixtures/expedientsFixture.json';


const maxDate = new Date().getFullYear();

const Expedients = ({onLogout}) => {

  const getResolutionState = () => {
    return Object.values(fixture.reduce((r, e) => {
      const resolucio = e.resolucio;
      if (resolucio) {
        if (!r[resolucio]) {
          r[resolucio] = {label: resolucio, value: 1};
        } else {
          r[resolucio].value += 1;
        }
      }
      return r;
    }, {}));
  };

  getResolutionState();


  console.log('expected', expectedState)


  const [isAggregateData, setIsAggregateData] = useState(false);
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
