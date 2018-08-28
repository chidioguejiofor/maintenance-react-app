import React from 'react';
import { shallow } from 'enzyme';

import SocialLogoGrid from '../../src/components/SocialLogoGrid';

const socialMedias = [
  {
    name: 'firstSocial',
    link: 'firstLink',
    imgSrc: 'facebook.png',
  },
  {
    name: 'secondSocial',
    link: 'secondLink',
    imgSrc: 'secondSocial.png',
  },
];


describe('Testing social logo grid', () => {
  it('should match snapshot', () => {
    expect(shallow(<SocialLogoGrid />)).toMatchSnapshot();
  });
});
