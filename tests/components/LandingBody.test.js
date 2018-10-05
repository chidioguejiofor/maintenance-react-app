/* eslint no-undef:off */
import React from 'react';
import { shallow } from 'enzyme';

import LandingBody from '../../src/components/LandingBody';

const buttons = [{
  className: 'temp',
  link: 'badlink.com'
}];
describe('Testing LandingBody Component', () => {
  it('should match existing snapshot', () => {
    expect(shallow(<LandingBody buttons={buttons} />)).toMatchSnapshot();
  });
});
