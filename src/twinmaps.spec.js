import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import App from './twinmaps';
import TwinMaps from './components/TwinMaps';

describe('index', () => {
  describe('<App />', () => {
    it('should render a Twin map to compare Menorca styles', () => {
      // GIVEN

      // WHEN
      const app = mount(<App />);

      // THEN
      expect(app).to.contain(
        <TwinMaps
          initialLon={4.0695}
          initialLat={39.944}
          initialZoom={10}
          leftStyle="menorca_base_vector.json"
          rightStyle="menorca_base_raster.json"
        />,
      );
    });
  });
});
