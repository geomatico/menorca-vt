import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import ReactMapGL from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const setBasicAuthHeader = (auth) => (url, resourceType) => {
  if (resourceType === 'Tile') {
    const match = auth.find((rule) => url.match(rule.urlMatch));
    if (match) {
      return {
        url,
        headers: { 'Authorization': 'Basic ' + btoa(match.user + ':' + match.password) }
      };
    }
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
  mapStyle, auth, onMapSet, sprite, sources, layers, viewport, onViewportChange, hash
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
    transformRequest={setBasicAuthHeader(auth)}
    width="100%"
    height="100%"
  >
    <div style={{position: 'absolute', right: 10, top: 10}}>
    </div>
  </ReactMapGL>;
}

Map.propTypes = {
  mapStyle: PropTypes.string,
  auth: PropTypes.arrayOf(PropTypes.shape({
    urlMatch: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  })),
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
  auth: [],
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
