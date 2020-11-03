import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Map from './Map';

function TwinMaps(props) {
  const {
    leftStyle, rightStyle, initialLon, initialLat, initialZoom,
  } = props;
  const [lon, setLon] = useState(initialLon);
  const [lat, setLat] = useState(initialLat);
  const [zoom, setZoom] = useState(initialZoom);
  const [bearing, setBearing] = useState(0);
  const [pitch, setPitch] = useState(0);

  const onMapMoved = (pos) => {
    setLon(pos.lon);
    setLat(pos.lat);
    setZoom(pos.zoom);
    setBearing(pos.bearing);
    setPitch(pos.pitch);
  };

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
          lon={lon}
          lat={lat}
          zoom={zoom}
          bearing={bearing}
          pitch={pitch}
          onMapMoved={onMapMoved}
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
          lon={lon}
          lat={lat}
          zoom={zoom}
          bearing={bearing}
          pitch={pitch}
          onMapMoved={onMapMoved}
          hash
        />
      </div>
    </div>
  );
}

TwinMaps.propTypes = {
  leftStyle: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]).isRequired,
  rightStyle: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]).isRequired,
  initialLon: PropTypes.number,
  initialLat: PropTypes.number,
  initialZoom: PropTypes.number,
};

TwinMaps.defaultProps = {
  initialLon: 0,
  initialLat: 0,
  initialZoom: 1,
};

export default TwinMaps;
