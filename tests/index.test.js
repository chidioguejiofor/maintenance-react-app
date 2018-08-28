import React from 'react';
import { shallow } from 'enzyme';
import App from '../src/App';

describe('Testing index Component', () => {
  it('should match existing snapshot', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
