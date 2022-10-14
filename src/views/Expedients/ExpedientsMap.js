import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';

import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';

import config from '../../config.json';
import useExpedients from '../../hooks/useExpedients';
import useColors from '../../hooks/useColors';

const cssStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

const ExpedientsMap = ({mapStyle, dateRange, visibleCategories, onBBOXChanged}) => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState(config.initialViewport);
  const colors = useColors();

  const handleMapResize = () => window.setTimeout(() => mapRef?.current?.resize(), 0);

  // TODO filtrar los datos por las categorías activas y el rango de años
  console.log(dateRange, visibleCategories);
  const expedientsData = useExpedients();

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
    Object.keys(config.datasets).map(datasetId =>
      new GeoJsonLayer({
        id: datasetId,
        data: expedientsData ? expedientsData[datasetId] : undefined,
        getPointRadius: 4,
        pointRadiusUnits: 'pixels',
        getLineWidth: 0,
        stroked: false,
        getFillColor: d => colors[datasetId][d.properties.tipus]
      })
    )
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
