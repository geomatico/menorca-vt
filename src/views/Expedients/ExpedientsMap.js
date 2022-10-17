import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';

import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';

import config from '../../config.json';
import useColors from '../../hooks/useColors';
import useFilteredExpedients from '../../hooks/useFilteredExpedients';

const cssStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

const ExpedientsMap = ({mapStyle, visibleCategories, dateRange, onBBOXChanged}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);
  const colors = Object.values(useColors()).reduce((acc, items) => ({
    ...acc,
    ...items
  }), {});

  const handleMapResize = () => window.setTimeout(() => mapRef?.current?.resize(), 0);

  const expedientsData = useFilteredExpedients(visibleCategories, dateRange);

  useEffect(() => {
    document
      .getElementById('deckgl-wrapper')
      .addEventListener('contextmenu', evt => evt.preventDefault());
  }, []);

  const notifyChanges = useCallback(debounce(30, map => {
    onBBOXChanged(map.getBounds().toArray().flatMap(a => a));
  }), []);

  // On data or viewport change, recalculate data
  useEffect(() => {
    if (mapRef && mapRef.current) notifyChanges(mapRef.current);
  }, [expedientsData, viewport]);

  const deckLayers = useMemo(() =>
    new GeoJsonLayer({
      id: 'expedients',
      data: expedientsData ? expedientsData : undefined,
      pointRadiusScale: 6,
      stroked: false,
      getFillColor: d => colors[d.properties.tipus]
    })
  , [expedientsData]);

  return <DeckGL
    layers={deckLayers}
    viewState={viewport}
    onViewStateChange={({viewState}) => setViewport(viewState)}
    controller
    style={cssStyle}
    onResize={handleMapResize}
  >
    <Map reuseMaps mapStyle={mapStyle} styleDiffing={false} mapLib={maplibregl} ref={mapRef}/>
  </DeckGL>;
};

ExpedientsMap.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onBBOXChanged: PropTypes.func.isRequired
};

export default ExpedientsMap;
