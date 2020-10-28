import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

function Map(props) {
  const {
    mapStyle, lon, lat, zoom, bearing, pitch, onMapMoved, hash,
  } = props;

  const containerRef = useRef(null);

  const [map, setMap] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  // eslint-disable-next-line no-shadow
  const triggerMapMoved = (map) => onMapMoved({
    lon: map.getCenter().lng,
    lat: map.getCenter().lat,
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  });

  // On mount
  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [lon, lat],
      zoom,
      bearing,
      pitch,
      hash,
    });

    newMap.addControl(new mapboxgl.NavigationControl());

    newMap.on('movestart', (evt) => {
      setIsMoving(true);
      triggerMapMoved(evt.target);
    });

    newMap.on('move', (evt) => {
      triggerMapMoved(evt.target);
    });

    newMap.on('moveend', (evt) => {
      triggerMapMoved(evt.target);
      setIsMoving(false);
    });

    setMap(newMap);

    return () => newMap.remove();
  }, []);

  useEffect(() => map && map.setStyle(mapStyle), [mapStyle]);

  useEffect(() => map && !isMoving && map.jumpTo({
    center: { lon, lat },
    zoom,
    bearing,
    pitch,
  }), [lon, lat, zoom, bearing, pitch]);

  return (
    <div
      ref={containerRef}
      style={{
        margin: 0,
        height: '100%',
      }}
    />
  );
}

Map.propTypes = {
  mapStyle: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]).isRequired,
  lon: PropTypes.number,
  lat: PropTypes.number,
  zoom: PropTypes.number,
  bearing: PropTypes.number,
  pitch: PropTypes.number,
  onMapMoved: PropTypes.func,
  hash: PropTypes.bool,
};

Map.defaultProps = {
  lon: 0,
  lat: 0,
  zoom: 1,
  bearing: 0,
  pitch: 0,
  onMapMoved: () => {},
  hash: false,
};

export default Map;
