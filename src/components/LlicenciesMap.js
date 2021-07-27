import React, {useState} from 'react';
import {Map} from '@geomatico/geocomponents';
import {Popup} from 'react-map-gl';

const LlicenciesMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10
  });

  const auth = [{
    urlMatch: 'OR007URB_llicencies',
    user: localStorage.getItem('menorca.expedients.user'),
    password: localStorage.getItem('menorca.expedients.password')
  }];

  const sources = {
    llicencies: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'https://ide.cime.es/geoserver/ordenacio_restringit/wms/?bbox={bbox-epsg-3857}&format=application/vnd.mapbox-vector-tile&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=512&height=512&layers=OR007URB_llicencies'
      ],
      minZoom: 0,
      maxZoom: 22
    }
  };

  const layers = [{
    'id': 'llicencies015_tipus',
    'source': 'llicencies',
    'source-layer': 'or015urb_llicencies',
    'type': 'symbol',
    'layout': {
      'text-field': '\u2022',
      'text-font': ['Arial Bold'],
      'text-size': 30,
      'text-allow-overlap': true
    },
    'paint': {
      'text-color': [
        'case',
        ['==', ['get', 'tipus'], 'EX067'],
        '#A80000',
        ['==', ['get', 'tipus'], 'EX068'],
        '#00A9E6',
        ['==', ['get', 'tipus'], 'EX073'],
        '#38A800',
        ['==', ['get', 'tipus'], 'EX567'],
        '#ff8533',
        ['==', ['get', 'tipus'], 'EX568'],
        '#0000e6',
        ['==', ['get', 'tipus'], 'EX569'],
        '#bf80ff',
        ['==', ['get', 'tipus'], 'EX076'],
        '#f003fc',
        '#ff0000'
      ]
    }
  },
  {
    'id': 'llicencies015_label',
    'source': 'llicencies',
    'source-layer': 'or015urb_llicencies',
    'type': 'symbol',
    'layout': {
      'text-field': ['get', 'idordena'],
      'text-font': ['Arial Bold'],
      'text-size': 10,
      'text-offset': [0, -1.5]
    },
    'paint': {
      'text-color': '#888888'
    }
  }];

  const [hoveringFeature, setHoveringFeature] = useState();

  const handleHover = (event) => {
    setHoveringFeature(event.features && event.features[0]);
  };

  return <Map
    viewport={viewport}
    onViewportChange={setViewport}
    auth={auth}
    mapStyle={'menorca_base_vector.json'}
    sources={sources}
    layers={layers}
    interactiveLayerIds={['llicencies015_tipus']}
    onHover={handleHover}
  >
    {hoveringFeature && <Popup
      longitude={hoveringFeature.geometry.coordinates[0]}
      latitude={hoveringFeature.geometry.coordinates[1]}
    >
      <pre>{JSON.stringify(hoveringFeature.properties, null, 2)}</pre>
    </Popup>}
  </Map>;
};

export default LlicenciesMap;
