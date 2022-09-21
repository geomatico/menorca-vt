import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';

import Map from '@geomatico/geocomponents/Map';

import config from '../../config.json';

import useExpedientsMapStyle from '../../hooks/useExpedientsMapStyle';

const ExpedientsMap = ({mapStyle, dateRange, visibleCategories, onRenderedFeaturesChanged, onBBOXChanged}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);

  const {sources, layers} = useExpedientsMapStyle(visibleCategories, dateRange);

  const auth = [{
    urlMatch: 'ordenacio_restringit',
    user: localStorage.getItem('menorca.expedients.user'),
    password: localStorage.getItem('menorca.expedients.password')
  }];

  const notifyChanges = useCallback(debounce(60, map => {
    map.once('idle', () => {
      if (map) {
        onRenderedFeaturesChanged(map.queryRenderedFeatures({
          layers: Object.keys(config.datasets)
        }));
      }
    });
    onBBOXChanged(map.getBounds().toArray().flatMap(a => a).join(','));
  }), []);

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
    auth={auth}
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
  onRenderedFeaturesChanged: PropTypes.func.isRequired,
  onBBOXChanged: PropTypes.func.isRequired
};

export default ExpedientsMap;
