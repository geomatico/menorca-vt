import React, {useState} from 'react';
import BaseMapPicker from './BaseMapPicker';
import Map from './Map';

const styles = [
  {
    label: 'IDE Menorca',
    thumbnail: './img/ide-menorca-vector.png',
    url: 'menorca_base_vector.json'
  },{
    label: 'Base IGO',
    thumbnail: './img/mapa-base-igo.png',
    url: 'https://vts.larioja.org/style/mapa-base-igo-v1.json'
  },{
    label: 'Base IGO dark',
    thumbnail: './img/mapa-base-igo-oscuro.png',
    url: 'https://vts.larioja.org/style/mapa-base-igo-oscuro-v1.json'
  },{
    label: 'OSM Bright',
    thumbnail: 'https://openicgc.github.io/img/osm-bright.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/osm-bright.json'
  },{
    label: 'Positron',
    thumbnail: 'https://openicgc.github.io/img/positron.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/positron.json'
  },{
    label: 'Hibrid',
    thumbnail: 'https://openicgc.github.io/img/orto.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/hibrid.json'
  },{
    label: 'Night',
    thumbnail: 'https://openicgc.github.io/img/night.png',
    url: 'https://geoserveis.icgc.cat/contextmaps/night.json'
  }
];

export default {
  title: 'Common/BaseMapPicker',
  component: BaseMapPicker,
  argTypes: {
    selectedStyleUrl: {
      control: {
        type: 'select',
        options: styles.map(({url}) => url)
      }
    }
  }
};

const Template = (args) => (
  <BaseMapPicker {...args} />
);

// eslint-disable-next-line react/prop-types,no-unused-vars
const ManagedTemplate = ({selectedStyleUrl, onStyleChange, ...args}) => {
  const [getSelectedStyleUrl, setSelectedStyleUrl] = useState(selectedStyleUrl);
  return <BaseMapPicker selectedStyleUrl={getSelectedStyleUrl} onStyleChange={setSelectedStyleUrl} {...args} />;
};

// eslint-disable-next-line react/prop-types,no-unused-vars
const IntegrationTemplate = ({selectedStyleUrl, onStyleChange, ...args}) => {
  const [getSelectedStyleUrl, setSelectedStyleUrl] = useState(selectedStyleUrl);
  const [viewport, setViewport] = useState(viewport);
  const onChange = ({latitude, longitude, zoom, bearing, pitch}) => setViewport({
    latitude, longitude, zoom, bearing, pitch
  });
  return (
    <div style={{ width: '800px', height: '600px', position: 'relative' }}>
      <Map mapStyle={getSelectedStyleUrl} onViewportChange={onChange} viewport={viewport} />
      <BaseMapPicker selectedStyleUrl={getSelectedStyleUrl} onStyleChange={setSelectedStyleUrl} {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  styles,
  selectedStyleUrl: 'menorca_base_vector.json',
};

export const Managed = ManagedTemplate.bind({});
Managed.args = Default.args;

export const WithMap = IntegrationTemplate.bind({});
WithMap.args = {
  styles,
  selectedStyleUrl: 'menorca_base_vector.json',
  position: 'bottom-left',
  direction: 'right'
};
