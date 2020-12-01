import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Map from './Map';

function TwinMaps({ leftStyle, rightStyle, initialViewport }) {
  const [viewport, setViewport] = useState(initialViewport);

  const onViewportChange = ({ latitude, longitude, zoom, bearing, pitch }) => setViewport({
    latitude,
    longitude,
    zoom,
    bearing,
    pitch,
  });

  return (
    <div style={{
      height: '100%',
      background: 'gray',
    }}
    >
      <div style={{
        width: '50%',
        height: '100%',
        float: 'left',
      }}
      >
        <Map
          mapStyle={leftStyle}
          viewport={viewport}
          onViewportChange={onViewportChange}
          hash
        />
      </div>
      <div style={{
        width: '49.9%',
        height: '100%',
        float: 'right',
      }}
      >
        <Map
          mapStyle={rightStyle}
          viewport={viewport}
          onViewportChange={onViewportChange}
        />
      </div>
    </div>
  );
}

TwinMaps.propTypes = {
  leftStyle: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]).isRequired,
  rightStyle: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]).isRequired,
  initialViewport: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
  })
};

TwinMaps.defaultProps = {
  initialViewport: {
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  }
};

export default TwinMaps;
