import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import App from './twinmaps';
import TwinMaps from '../../../geomatico/geocomponents/src/components/TwinMaps';

describe('index', () => {
  describe('<App />', () => {
    it('should render a Twin map to compare Menorca styles', () => {
      // GIVEN

      // WHEN
      const app = mount(<App />);

      // THEN
      expect(app).to.contain(
        <TwinMaps
          leftStyle="menorca_base_vector.json"
          rightStyle="menorca_base_raster.json"
        />,
      );
    });
  });
});
