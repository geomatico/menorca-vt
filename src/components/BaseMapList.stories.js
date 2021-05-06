import React from 'react';
import BaseMapList from './BaseMapList';

const styles = [
  {
    label: 'Basic',
    thumbnail: 'https://tileserver.geomatico.es/styles/klokantech-basic/15/16048/12356.png',
    url: 'https://tileserver.geomatico.es/styles/klokantech-basic/style.json'
  },{
    label: 'Bright',
    thumbnail: 'https://tileserver.geomatico.es/styles/osm-bright/15/16048/12356.png',
    url: 'https://tileserver.geomatico.es/styles/osm-bright/style.json'
  },{
    label: 'Positron',
    thumbnail: 'https://tileserver.geomatico.es/styles/positron/15/16048/12356.png',
    url: 'https://tileserver.geomatico.es/styles/positron/style.json'
  }
];

export default {
  title: 'Common/BaseMapList',
  component: BaseMapList,
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
  <BaseMapList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  thumbnailWidth: 60,
  thumbnailHeight: 40,
  styles,
  selectedStyleUrl: 'https://tileserver.geomatico.es/styles/klokantech-basic/style.json',
};
