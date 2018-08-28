/* eslint no-undef:off */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from '../../src/components/Header';

describe('Testing the Header Component', () => {
  it('should contain an image of some sort', (done) => {
    const wrapper = mount(<Header />);
    const div = wrapper.find('div');

    expect(div.length).toBeGreaterThan(0);
    expect(div.children().length).toEqual(2);
    expect(div.first().find('img').length).toEqual(1);
    done();
  });
  it('should contain an span with text Maintenance Tracker', (done) => {
    const wrapper = mount(<Header />);
    const div = wrapper.find('div');
    expect(div.find('span').first().text())
      .toEqual('Maintenance Tracker');

    done();
  });

  it('should have an image link that is equal to what is passed as props', () => {
    const src = 'tempSrc';
    const wrapper = shallow(<Header imgSrc={src} />);
    expect(wrapper).toMatchSnapshot();
  });
});
