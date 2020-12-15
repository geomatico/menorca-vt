import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import ReactMapGL from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const addAuthHeader = (authHeader, authUrl) => (url, resourceType) => {
  if (resourceType === 'Tile' && (authUrl ? url.match(authUrl) : true)) {
    return {
      url: url,
      headers: { 'Authorization': authHeader }
    };
  }
};

const buildStyle = (mapStyle, sprite, sources, layers) =>
  fetch(mapStyle)
    .then(response => response.json())
    .then(style => ({
      ...style,
      ...(sprite ? sprite : {}),
      sources: {
        ...style.sources,
        ...sources
      },
      layers: [
        ...style.layers,
        ...layers
      ]
    }));

function Map({
  mapStyle, authHeader, authUrl, onMapSet, sprite, sources, layers, viewport, onViewportChange, hash
}) {

  const mapOptions = {
    hash,
  };

  const [getStyle, setStyle] = useState({
    version: 8,
    sources: {},
    layers: []
  });

  const [map, setMap] = useState(null);

  const setMapAndCallback = (map) => {
    setMap(map);
    onMapSet && onMapSet(map);
  };

  useEffect(() => {
    buildStyle(mapStyle, sprite, sources, layers).then(setStyle);
  }, [mapStyle, sprite, sources, layers]);

  return <ReactMapGL
    ref={ref => ref && !map && setMapAndCallback(ref.getMap())}
    mapStyle={getStyle}
    {...viewport}
    onViewportChange={onViewportChange && onViewportChange}
    mapOptions={mapOptions}
    {...(authHeader ? {transformRequest: addAuthHeader(authHeader, authUrl)} : null) }
    width="100%"
    height="100%"
  >
    <div style={{position: 'absolute', right: 10, top: 10}}>
    </div>
  </ReactMapGL>;
}

Map.propTypes = {
  mapStyle: PropTypes.string,
  authHeader: PropTypes.string,
  authUrl: PropTypes.string,
  sprite: PropTypes.string,
  sources: PropTypes.object,
  layers: PropTypes.array,
  viewport: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
  }),
  onMapSet: PropTypes.func,
  onViewportChange: PropTypes.func,
  hash: PropTypes.bool,
};

Map.defaultProps = {
  mapStyle: 'menorca_base_vector.json',
  authHeader: undefined,
  authUrl: undefined,
  sprite: undefined,
  sources: {},
  layers: [],
  viewport: {
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  },
  onMapSet: undefined,
  onViewportChange: undefined,
  hash: true,
};

export default Map;
