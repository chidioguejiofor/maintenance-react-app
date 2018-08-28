import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../src/components/Footer';

describe('Testing Footer', () => {
  describe('Testing FooterContainer', () => {
    it('should match the existing snapshot of the app ', () => {
      const wrapper = shallow(<Footer />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
