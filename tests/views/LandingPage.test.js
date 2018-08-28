/* eslint no-undef:off */
import React from 'react';
import { shallow } from 'enzyme';

import Homepage from '../../src/views/Homepage';

describe('Testing LandingPage Component', () => {
  it('should match existing snapshot', () => {
    expect(shallow(<Homepage />)).toMatchSnapshot();
  });
});
