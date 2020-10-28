import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import App from './index';

describe('index', () => {
  describe('<App />', () => {
    it('should render a greeting message', () => {
      // GIVEN

      // WHEN
      const app = mount(<App />);

      // THEN
      expect(app.find('div')).to.have.text('Hola mundo');
    });
  });
});
