/* eslint no-undef: off */
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../src/components/commons/Header';

describe('Testing the Header Component', () => {
  it('should contain an image of some sort', (done) => {
    const wrapper = shallow(<Header />);
    const text = wrapper.find('h1').text();
    expect(text).toEqual('Header  is Header');
    done();
  });
});
