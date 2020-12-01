import React, {useState} from 'react';
import Map from './Map';

export default {
  title: 'Common/Map',
  component: Map,
  decorators: [(Story) => <div style={{ width: '800px', height: '600px' }}><Story/></div>],
  argTypes: {
    viewport: {control: 'object'},
  },
};

const Template = (args) => <Map {...args} />;

// eslint-disable-next-line react/prop-types,no-unused-vars
const ManagedViewportTemplate = ({viewport, onViewportChange, ...args}) => {
  const [getViewport, setViewport] = useState(viewport);
  const onChange = ({latitude, longitude, zoom, bearing, pitch}) => setViewport({
    latitude, longitude, zoom, bearing, pitch
  });
  return <Map viewport={getViewport} onViewportChange={onChange} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  viewport: {
    latitude: 39.945,
    longitude: 4.060,
    zoom: 10,
    bearing: 0,
    pitch: 0
  }
};

export const ManagedViewport = ManagedViewportTemplate.bind({});
ManagedViewport.args = Default.args;

export const CustomData = ManagedViewportTemplate.bind({});
CustomData.args = {
  ...Default.args,
  authHeader: 'Basic ' + btoa(process.env.EXPEDIENTS_USER + ':' + process.env.EXPEDIENTS_PASSWORD),
  authUrl: process.env.EXPEDIENTS_HOST,
  sources: {
    'expedients': {
      'type': 'vector',
      'tiles': [
        `https://${process.env.EXPEDIENTS_HOST}/geoserver/ordenacio_restringit/wms?service=WMS&version=1.1.0&request=GetMap&layers=ordenacio_restringit:OR007EXP_expedients&bbox={bbox-epsg-3857}&width=512&height=512&srs=EPSG:3857&styles=&format=application/vnd.mapbox-vector-tile`
      ],
      'minZoom': 0,
      'maxZoom': 22
    }
  },
  layers: [
    {
      'id': 'or007exp_expedients_a',
      'type': 'circle',
      'source': 'expedients',
      'source-layer': 'or007exp_negociat45',
      'paint': {
        'circle-color': ['match', ['get', 'tipus'],
          'CED', '#C9C900',
          'DUP', '#FFFF73',
          '#FF00FF'
        ],
        'circle-opacity': 0.67
      }
    }
  ]
};
