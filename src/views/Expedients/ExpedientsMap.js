import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';

import Map from '@geomatico/geocomponents/Map';

import config from '../../config.json';

import useExpedientsMapStyle from '../../hooks/useExpedientsMapStyle';

const ExpedientsMap = ({mapStyle, dateRange, visibleCategories, onBBOXChanged}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);

  const {sources, layers} = useExpedientsMapStyle(visibleCategories, dateRange);

  const notifyChanges = useCallback(debounce(30, map => onBBOXChanged(map.getBounds().toArray().flatMap(a => a))), []);

  // On mount, notify changes
  const mapRefCallback = useCallback(map => {
    if (map) notifyChanges(map);
    mapRef.current = map;
  }, []);

  // On layer change, notify changes
  useEffect(() => {
    if (mapRef && mapRef.current) notifyChanges(mapRef.current);
  }, [layers]);

  // On viewport change, notify changes, debounced
  useEffect(() => {
    if (mapRef && mapRef.current) notifyChanges(mapRef.current);
  }, [viewport]);

  return <Map
    ref={mapRefCallback}
    mapStyle={mapStyle}
    sources={sources}
    layers={layers}
    viewport={viewport}
    onViewportChange={setViewport}
  />;
};

ExpedientsMap.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onBBOXChanged: PropTypes.func.isRequired
};

export default ExpedientsMap;
