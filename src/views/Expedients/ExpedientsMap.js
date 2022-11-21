import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {debounce} from 'throttle-debounce';

import {Map} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

import useColorRamp from '@geomatico/geocomponents/hooks/useColorRamp';
import ColorRampLegend from '@geomatico/geocomponents/ColorRampLegend';

import config from '../../config.json';
import useColors from '../../hooks/useColors';
import useFilteredExpedients from '../../hooks/useFilteredExpedients';
import Box from '@mui/material/Box';

const cssStyle = {
  width: '100%',
  height: '100%',
  overflow: 'hidden'
};

const ExpedientsMap = ({
                         mapStyle,
                         visibleCategories,
                         dateRange,
                         onBBOXChanged,
                         isAggregateData,
                         radius
                       }) => {
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


  const COLOR_RANGE = useColorRamp('BrewerRdYlGn5').intColors;

  const deckLayers = useMemo(() => {
    if (!isAggregateData) {
      return new GeoJsonLayer({
        id: 'expedients',
        data: expedientsData ? expedientsData : undefined,
        pointRadiusScale: 6,
        stroked: false,
        getFillColor: d => colors[d.properties.tipus]
      });
    } else {
      return new HexagonLayer({
        type: HexagonLayer,
        id: 'expedients-heatmap',
        data: expedientsData ? expedientsData : undefined,
        radius: radius,
        coverage: 1,
        upperPercentile: 100,
        colorRange: COLOR_RANGE,
        elevationRange: [0, 100],
        elevationScale: 25,
        extruded: true,
        getPosition: d => [Number(d.geometry.coordinates[0]), Number(d.geometry.coordinates[1])],
        opacity: 1,
        pickable: true,
        autoHighlight: true,
      });
    }

  }, [expedientsData, isAggregateData, radius]);

  const getTooltip = ({object}) => {
    if (!object) {
      return null;
    }
    const count = object.points.length;
    return `${count} expedients`;
  };

  return <DeckGL
    layers={deckLayers}
    viewState={viewport}
    onViewStateChange={({viewState}) => setViewport(viewState)}
    controller
    style={cssStyle}
    onResize={handleMapResize}
    getTooltip={getTooltip}
  >
    <Map reuseMaps mapStyle={mapStyle} styleDiffing={false} mapLib={maplibregl} ref={mapRef}/>
    <Box>
      <ColorRampLegend colorScheme={'BrewerRdYlGn5'} domain={[0, 100]}></ColorRampLegend>
    </Box>
  </DeckGL>;
};

ExpedientsMap.propTypes = {
  mapStyle: PropTypes.string.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  visibleCategories: PropTypes.object.isRequired,
  onBBOXChanged: PropTypes.func.isRequired,
  isAggregateData: PropTypes.bool.isRequired,
};

export default ExpedientsMap;
