/* eslint no-undef:off */
import React from 'react';
import { shallow } from 'enzyme';

import Main from '../../src/views/Main';

describe('Testing LandingBody Component', () => {
  it('should match existing snapshot', () => {
    expect(shallow(<Main/>)).toMatchSnapshot();
  });
});
